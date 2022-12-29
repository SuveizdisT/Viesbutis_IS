import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hotel from './components/hotels/hotelsList';
import NewHotel from './components/hotels/hotelsCreate';
import Login from './components/Login';
import Register from './components/Register';
import UpdateHotel from './components/hotels/hotelsUpdate';
import Corpusses from './components/corpusses/corpussesList';
import NewCorpuss from './components/corpusses/corpussesCreate';
import UpdateCorpuss from './components/corpusses/corpussesUpdate';
import Rooms from './components/rooms/roomsList';
import NewRoom from './components/rooms/roomsCreate';
import UpdateRoom from './components/rooms/roomsUpdate';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {isLogginActive: true,}
  }
  render(){
    const {isLogginActive} = this.state;
    return(
      <div className='App'>
        <Router>
          <Sidebar />
          <Routes>
            <Route exact path='/hotels' element={<Hotel/>}/>
            <Route exact path='/hotels/create' element={<NewHotel/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/hotels/:hotelId' element={<UpdateHotel/>}/>
            <Route exact path='/hotels/:hotelId/corpusses' element={<Corpusses/>}/> 
            <Route exact path='/hotels/:hotelId/corpusses/create' element={<NewCorpuss/>}/>
            <Route exact path='/hotels/:hotelId/corpusses/:corpussId' element={<UpdateCorpuss/>}/>
            <Route exact path='/hotels/:hotelId/corpusses/:corpussId/rooms' element={<Rooms/>}/>
            <Route exact path='/hotels/:hotelId/corpusses/:corpussId/rooms/create' element={<NewRoom/>}/>
            <Route exact path='/hotels/:hotelId/corpusses/:corpussId/rooms/:roomId' element={<UpdateRoom/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
export default App;