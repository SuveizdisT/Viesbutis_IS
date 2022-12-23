import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Hotell from '../../api/hotels';
import {THotel, ThotelList} from './hotelType.ts';

type State ={
  deps : ThotelList;
}
export default class Hotel extends Component<State> {
  
  constructor(props){
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state={deps:[]}

    this.hotell = new Hotell();
  }

  async refreshList(){
    /*fetch(process.env.REACT_API+'hotels')
    .then(response=>response.json())
    .then(data=>{
      this.setState({deps:data});)}*/
    let [responseHotels] = await this.hotell.list();
    this.setState({deps: responseHotels});
  }
  componentDidMount(){
    this.refreshList();
  }
  componentDidUpdate(){
    this.refreshList();
  }

  render(){
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
}