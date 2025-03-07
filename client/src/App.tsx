import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './components/homepage/Home'
import Facilities from './components/navpages/Facilities'
import Bookings from './components/rooms/Bookings'
import Info from './components/navpages/Info'
import Owners from './components/navpages/Owners'
import Patro from './components/navpages/Patro'
import Payment from './components/payment/Payment'
import Thanks from './components/payment/Thanks'
import NavBar from './components/homepage/NavBar'
import './App.css'

function App () {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/facilities' element={<Facilities/>}/>
          <Route path='/bookings' element={<Bookings/>}/>
          <Route path='/info' element={<Info/>}/>
          <Route path='/owners' element={<Owners/>}/>
          <Route path='/patro' element={<Patro/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/thanks' element={<Thanks/>}/>
        </Routes>
        <NavBar className="navbar"/>
      </Router>
    </>
  )
}

export default App