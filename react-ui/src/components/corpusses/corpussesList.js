import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { GetRole } from '../Auth';
import {useLocation} from 'react-router-dom';

export const DeleteCorpuss = (event) =>{
  const token = localStorage.getItem("token");
  const data = new FormData(event.currentTarget);
  const hotelId = data.get('hotelId');
  const corpussId = data.get('corpussId');
  const temp = axios.delete("https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses/4" + corpussId,
  {headers: {"Authorization": 'Bearer ' + token}});
  window.location.href="/hotels";
}
export default function CorpussList(){
  const thisParam = useLocation().pathname.split('/');
  let hotelId = thisParam[2];
  const [corpussData, setCorpusses] = useState([]);
  useEffect(()=>{
    const fetchCorpuss = async () =>{
      const token = localStorage.getItem("token");
      let corpussD = [];
      if(token === null){
        corpussD = await axios.get("https://squid-app-w4t8k.ondigitalocean.app/api/hotels");
      }
      else {corpussD = await axios.get(
        "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses", {headers: {"Authorization": 'Bearer ' + token}}
      );
      }
      const temp = corpussD.data;
      setCorpusses(temp);
    }
    fetchCorpuss();
  },[]);
  if(corpussData.length === 0){
    return(<h2>None corpusses found</h2>);
  }
  const role = GetRole();
  return(
    <div className="col-md-12">
      <Table className="mt-4" striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>CorpussID</th>
            <th>Name</th>
            <th>Type</th>
            <th colSpan={4}>Options</th>
          </tr>
        </thead>
        <tbody>
          {corpussData.map((corpuss) => (
            <tr key={corpuss['corpussId']}>
              <td>{corpuss['corpussId']}</td>
              <td>{corpuss['name']}</td>
              <td>{corpuss['type']}</td>
              {(role.includes("RegisterUser") || role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotelId + "/corpusses/1"+ corpuss["corpussId"]+"/rooms"}>
                    <Button variant="grey">List of rooms</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotelId + "/corpusses/1"+ corpuss["corpussId"]+"/rooms/create"}>
                    <Button variant="grey">Add room</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                <Link to={"/hotels/" + hotelId + "/corpusses/1" + corpuss["corpussId"]}>
                    <Button variant="grey">Update corpuss</Button>
                </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <form onSubmit={DeleteCorpuss}>
                    <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                    <input type="hidden" id="corpussId" name="corpussId" value={1}/>
                    <Button type="submit" variant="grey">Delete corpuss</Button>
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