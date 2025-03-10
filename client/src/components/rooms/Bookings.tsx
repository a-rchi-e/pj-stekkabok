import { useState, useEffect } from 'react'
import { getAllRooms, getAvailableRooms } from '../../helper_funcs'
import { Booking, RoomProps } from '../../interfaces';
import Form from './Form';
import List from './List';
import './Bookings.css';

function Bookings () {

  const [availableRooms, setAvailableRooms] = useState<RoomProps[]>([]);
  const [days, setDays] = useState(0);
  const [warning, setWarning] = useState(false);

  // loading all rooms on first render
  useEffect( () => {
    getAllRooms().then( all => setAvailableRooms(all || []));
  }, []);

  // check available rooms on form submission
  function checkAvailRooms (request: Booking) { // ToDo add async and refactor here
    getAvailableRooms(request).then( available => {
      setAvailableRooms(available || []);
      setDays(request.days.length);
    if (warning && request.days.length) setWarning(false);
    });
  }

  function triggerWarning () {
    setWarning(true);
  }

  return (
    <div className="bookings">
      <Form checkAvailRooms={checkAvailRooms} warning={warning}/>
      <List availableRooms={availableRooms} days={days} triggerWarning={triggerWarning}/>
    </div>
  )
}

export default Bookings