import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export default class NewHotel extends Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_API+'hotels',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        HotelId: null,
        Name: event.target.Name.value
      })
    })
    .then(res => res.json())
    .then((result)=>{
      alert(result);
    },
    (error)=>{
      alert("Failed");
    })
  }
  render(){
    return(
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header closeButton>
              <Modal.Title id="conatianed-modal-title-vcenter">
                Add Hotel
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={7}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' name='Name' required
                      placeholder='Name'/>
                    </Form.Group>
                    <Form.Group>
                      <Button variant="primary" type="submit">
                        Add Hotel
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}