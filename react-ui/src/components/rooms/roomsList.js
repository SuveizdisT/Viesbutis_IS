import axios from 'axios';
import React, {useState, useEffect, Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Hotell from '../../api/hotels';
import { GetRole } from '../Auth';

export default function HotelList(){
  const [hotelData, setHotels] = useState([]);
  const fetchHotels = async () =>{
    const token = localStorage.getItem("token");
    const hotelD = await axios.get(
      "https://squid-app-w4t8k.ondigitalocean.app/api/hotels", {headers: {"Authorization": 'Bearer ' + token}}
    );
    const temp = hotelD.data;
    setHotels(temp);
  }
  useEffect(() => {fetchHotels();});
  if(hotelData == []){
    console.log("Kažkas");
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
              <td>
                <Link to={"/hotels/" + hotel['hotelId'] + "/corpusses"}>
                    <Button variant="grey">List of corpusses</Button>
                </Link>
              </td>
              <td>
                <Link to={"/hotels/" + hotel['hotelId'] + "/corpusses"}>
                    <Button variant="grey">Add corpuss</Button>
                </Link>
              </td>
              <td>
                <Link to={"/hotels/" + hotel['hotelId']}>
                    <Button variant="grey">Update hotel</Button>
                </Link>
              </td>
              <td>
                <Button variant="grey">Delete hotel</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}