import axios from 'axios';
import React, {useState, useEffect, Component, useParams} from 'react';
import {Table, Button} from 'react-bootstrap';
import { RiContactsBookLine } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import Hotell from '../../api/hotels';
import { GetRole } from '../Auth';
import {useLocation} from 'react-router-dom';

export default function CorpussList(){
  const thisParam = useLocation().pathname.split('/');
  let hotelId = thisParam[2];
  const [corpussData, setCorpusses] = useState([]);
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
  useEffect(() => {fetchCorpuss();});
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
            <th colSpan={5}>Options</th>
          </tr>
        </thead>
        <tbody>
          {corpussData.map((corpuss) => (
            <tr key={corpuss['corpussId']}>
              <td>{corpuss['corpussId']}</td>
              <td>{corpuss['name']}</td>
              <td>{corpuss['type']}</td>
              <td>
                <Link to={"/hotels/" + hotelId + "/corpusses/" + corpuss['corpussId']}>
                    <Button variant="grey">Corpuss data</Button>
                </Link>
              </td>
              {(role.includes("RegisterUser") || role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotelId + "/corpusses/"+ corpuss["corpussId"]}>
                    <Button variant="grey">List of rooms</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <Link to={"/hotels/" + hotelId + "/corpusses/"+ corpuss["corpussId"]}>
                    <Button variant="grey">Add room</Button>
                  </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                <Link to={"/hotels/" + hotelId + "/corpusses/" + corpuss["corpussId"]}>
                    <Button variant="grey">Update corpuss</Button>
                </Link>
                </td>
              }
              {(role.includes("Admin")) &&
                <td>
                  <Button variant="grey">Delete corpuss</Button>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}