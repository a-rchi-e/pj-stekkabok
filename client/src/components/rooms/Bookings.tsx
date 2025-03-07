import { useState, useEffect } from 'react'
import { getAllRooms, getAvailableRooms } from '../../helper_funcs'
import Form from './rooms/Form';
import List from './rooms/List';
import './Bookings.css';

function Bookings () {

  const [availableRooms, setAvailableRooms] = useState([]);
  const [days, setDays] = useState(0);
  const [warning, setWarning] = useState(false);

  // loading all rooms on first render
  useEffect( () => {
    getAllRooms().then( all => setAvailableRooms(all));
  }, []);

  // check available rooms on form submission
  async function checkAvailRooms (request) {
    getAvailableRooms(request).then( available => {
      setAvailableRooms(available);
      setDays(request.days);
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