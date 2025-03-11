import { NavLink } from 'react-router'
import { RoomProps } from '../../interfaces';
import './Room.css'

function Room ({name, prod_id, imgPath, price, desc, sleeps, days, triggerWarning}: RoomProps) {

  const nights = days;
  const roomData = {name, prod_id, price, days, nights};

  return (
    <div className='room'>

      <div className="image">
        <img src={imgPath}></img>
      </div>

      <div className="room-info">

        <p>{name}</p>
        <p>{desc}</p>

        <div className='icon-container'>
          <div className="sleeps">
            <p>{sleeps}</p>
            <img className='icons' src='/icons/bed.png'></img>
          </div>
          <img className='icons' src='/icons/wifi.png'></img>
        </div>

        <div className='book-now'>
          { !nights ?
          <>
            <p className='price'>Price / night: {price/100} ISK</p>
            <button className='book-btn' onClick={triggerWarning}>Book now</button>
          </> : nights === 1 ?
            <>
              <p className='price'>Price / 1 night: {price/100} ISK</p>
              <NavLink to="/payment" state={{from: roomData}}><button className='book-btn'>Book now</button></NavLink>
            </> :
            <>
              <p className='price'>Price / {nights} nights: {nights * price/100} ISK</p>
              <NavLink to="/payment" state={{from: roomData}}><button className='book-btn'>Book now</button></NavLink>
            </>
          } 
        </div>

      </div>
    </div>
  )
}

export default Room