import axios from 'axios';
import React, {useState, useEffect, Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import { RiContactsBookLine } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import Hotell from '../../api/hotels';
import { GetRole } from '../Auth';


export const DeleteHotel = (event) =>{
  const token = localStorage.getItem("token");
  const data = new FormData(event.currentTarget);
  console.log(data);
  //const hoteld = axios.delete("https://squid-app-w4t8k.ondigitalocean.app/api/hotels/",
  //{headers: {"Authorization": 'Bearer ' + token}});
  window.location.href="/hotels";
}
export default function HotelList(){
  const [hotelData, setHotels] = useState([]);
  const fetchHotels = async () =>{
    const token = localStorage.getItem("token");
    let hotelD = [];
    if(token === null){
      hotelD = await axios.get("https://squid-app-w4t8k.ondigitalocean.app/api/hotels");
    }
    else {hotelD = await axios.get(
      "https://squid-app-w4t8k.ondigitalocean.app/api/hotels", {headers: {"Authorization": 'Bearer ' + token}}
    );
    }
    const temp = hotelD.data;
    setHotels(temp);
  }
  useEffect(() => {fetchHotels();});
  if(hotelData.length === 0){
    return(<h2>None hotels found</h2>);
  }
  const role = GetRole();
  return(
    <div className="col-md-12">
      <Table className="mt-4" striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>HotelID</th>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
            <th>PhoneNumber</th>
            <th colSpan={5}>Options</th>
          </tr>
        </thead>
        <tbody>
          {hotelData.map((hotel) => (
            <tr key={hotel['hotelId']}>
              <td>{hotel['hotelId']}</td>
              <td>{hotel['name']}</td>
              <td>{hotel['city']}</td>
              <td>{hotel['address']}</td>
              <td>{hotel['phoneNumber']}</td>
              <td>
                <Link to={"/hotels/" + hotel['hotelId']}>
                    <Button variant="grey">Hotel data</Button>
                </Link>
              </td>
              {(role.includes("RegisterUser") || role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotel['hotelId']+ "/corpusses"}>
                    <Button variant="grey">List of corpusses</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotel['hotelId'] + "/corpusses"}>
                    <Button variant="grey">Add corpuss</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                <Link to={"/hotels/" + hotel['hotelId']}>
                    <Button variant="grey">Update hotel</Button>
                </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <form onSubmit={DeleteHotel}>
                    <Button type="submit" variant="grey" value={hotel['hotelId']}>Delete hotel</Button>
                  </form>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}


/*export default class Hotel {
  
  /*constructor(props){
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state={deps:[]}

    this.hotell = new Hotell();
  }

  async refreshList(){
    /*fetch(process.env.REACT_API+'hotels')
    .then(response=>response.json())
    .then(data=>{
      this.setState({deps:data});)}
    let [responseHotels] = await this.hotell.list();
    this.setState({deps: responseHotels});
  }
  componentDidMount(){
    this.refreshList();
  }
  componentDidUpdate(){
    this.refreshList();
  }

  /*render(){
    const {deps}=this.state;
    return(
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>HotelID</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th colSpan={5}>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep : THotel)=>
              <tr key={dep.HotelId}>
                <td>{dep.HotelId}</td>
                <td>{dep.Name}</td>
                <td>{dep.City}</td>
                <td>{dep.Address}</td>
                <td>{dep.PhoneNumber}</td>
                <td>
                  <Link to={"/hotels/" + dep.HotelId + "/corpusses"}>
                    <Button variant="grey">List of corpusses</Button>
                  </Link>
                </td>
                {this.props.flag && (
                  <td>
                    <Link to={"/hotels/" + dep.HotelId + "/corpusses"}>
                      <Button variant="grey">Add corpuss</Button>
                    </Link>
                  </td>)}
                {this.props.flag && (
                  <td>
                    <Link to={"/hotels/" + dep.HotelId}>
                      <Button variant="grey">Update hotel</Button>
                    </Link>
                  </td>)}
                {this.props.flag && (
                  <td>
                    <Link to={"/hotels/" + dep.HotelId}>
                      <Button variant="grey">Remove hotel</Button>
                    </Link>
                  </td>)}
              </tr>
              )}
          </tbody>
        </Table>
      </div>
    )
  }
}*/