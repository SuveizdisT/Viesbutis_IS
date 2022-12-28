import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hotel from './components/hotels/hotelsList';
import NewHotel from './components/hotels/hotelsCreate';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

/*export default function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route exact path='/hotels/list' element={<Hotels/>}/>
        <Route exact path='/hotels/create' element={<NewHotel/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Register' element={<Register/>}/> 
      </Routes>
    </Router>
  );
}*/
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
          </Routes>
        </Router>
      </div>
    )
  }
}
export default App;