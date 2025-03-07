import { NavLink, useLocation } from 'react-router'
import './NavBar.css'

function NavBar () {

  const isThanks = useLocation().pathname === '/thanks';
  
  return (
    <nav className= {isThanks ? 'navbar-thanks' : 'navbar'}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/facilities">Facilities</NavLink>
      <NavLink to="/bookings">Rooms & Booking</NavLink>
      <NavLink to="/info">Practical Info</NavLink>
      <NavLink to="/owners">Fanney & Óskar</NavLink>
      <NavLink to="/patro">Patró & The Westfjords</NavLink>
    </nav>
  )
}

export default NavBar