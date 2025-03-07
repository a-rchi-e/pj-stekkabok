import { useState } from 'react';
import { toOrdinal } from '../../helper_funcs';
import './Form.css';

function Form ({checkAvailRooms, warning}) {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);

  function handleSubmit (event) {
    event.preventDefault();

    // creating the 'days' property of the booking request
    const arrayOfDays= [];
    const start = toOrdinal(startDate);
    const end = toOrdinal(endDate);
    for (let i=start; i<end; i++) {
      arrayOfDays.push(i);
    }
    
    // building the booking request
    const bookingRequest = {
      sleeps: parseInt(guests),
      days: arrayOfDays,
    }

    // passing the request and the number of nights to the top level
    checkAvailRooms(bookingRequest);
  }

  return (
    <div className='form-container'>
      <h2>Book a room</h2>
      <form onSubmit={handleSubmit}>

        { warning && <p className='warning'>Please select stay dates!</p> }
        <div className='inputs'>

          <div className='labels'>
            <label>Arrival</label>
            <label>Departure</label>
            <label>Guests</label>
          </div>

          <div className='fields'>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)}/>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>
            <input type="number" value={guests} onChange={(event) => setGuests(event.target.value)} placeholder='2' />
          </div>

        </div>

        <button type='submit' className='sub-btn'>Submit</button>

      </form>
    </div>
  )
}

export default Form