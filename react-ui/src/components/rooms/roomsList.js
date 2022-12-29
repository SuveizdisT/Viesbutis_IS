import axios from 'axios';
import React, {useState, useEffect, Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import { GetRole } from '../Auth';

export const DeleteRoom = (event) =>{
  const token = localStorage.getItem("token");
  const data = new FormData(event.currentTarget);
  const hotelId = data.get('hotelId');
  const corpussId = data.get('corpussId');
  const roomId = data.get('Id');
  const temp = axios.delete("https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses/1/rooms/2" +roomId,
  {headers: {"Authorization": 'Bearer ' + token}});
  window.location.href="/hotels";
}

export default function HotelList(){
  const [roomData, setRooms] = useState([]);
  const thisParam = useLocation().pathname.split('/');
  let hotelId = thisParam[2];
  let corpussId = thisParam[4];
  useEffect(() => {
      const fetchRooms = async () =>{
      const token = localStorage.getItem("token");
      const roomD = await axios.get(
        "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/"+hotelId+"/corpusses/1/rooms", {headers: {"Authorization": 'Bearer ' + token}}
      );
      const temp = roomD.data;
      setRooms(temp);
    }
    fetchRooms();
  },[]);
  if(roomData == []){
    return(<h2>None rooms found</h2>);
  }
  const role = GetRole();
  return(
    <div className="col-md-12">
      <Table className="mt-4" striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>RoomID</th>
            <th>Floor</th>
            <th>Rating</th>
            <th>Capacity</th>
            <th>Price</th>
            <th colSpan={3}>Options</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((room) => (
            <tr key={room['Id']}>
              <td>{room['Id']}</td>
              <td>{room['roomId']}</td>
              <td>{room['floor']}</td>
              <td>{room['rating']}</td>
              <td>{room['capacity']}</td>
              <td>{room['price']}</td>
              {(role.includes("Admin")) &&
              <td>
                <Link to={"/hotels/" + hotelId + "/corpusses/1/rooms/"+room['Id']}>
                    <Button variant="grey">Update room</Button>
                </Link>
              </td>}
              {(role.includes("Admin")) &&
              <td>
                <form onSubmit={DeleteRoom}>
                    <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                    <input type="hidden" id="corpussId" name="corpussId" value={corpussId}/>
                    <input type="hidden" id="Id" name="Id" value={room['Id']}/>
                    <Button type="submit" variant="grey">Delete room</Button>
                </form>
              </td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}