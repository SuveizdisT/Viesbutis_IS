import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { GetRole } from '../Auth';


export const DeleteHotel = (event) =>{
  const token = localStorage.getItem("token");
  const data = new FormData(event.currentTarget);
  const hotelId = data.get('hotelId');
  const temp = axios.delete("https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId,
  {headers: {"Authorization": 'Bearer ' + token}});
  window.location.href="/hotels";
}
export default function HotelList(){
  let [hotelData, setHotels] = useState([]);
  useEffect(()=>{
    async function fetchData(){
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
  };
  fetchData();
  },[]);
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
                  <Link to={"/hotels/" + hotel['hotelId'] + "/corpusses/create"}>
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
                    <input type="hidden" name="hotelId" id="hotelId" value={hotel['hotelId']}/>
                    <Button type="submit" variant="grey">Delete hotel</Button>
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