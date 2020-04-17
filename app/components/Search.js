import React from 'react'
import '../index.css'
import Result from '../components/Result.js'
import { Tabs, Tab, Form, Col, Row, Button } from 'react-bootstrap'

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false,
            origin: '',
            destination: '',
            departureDate: '',
            returnDate: '',
            passengers: '',
            priceMax: Number.MAX_SAFE_INTEGER,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabSelect = this.handleTabSelect.bind(this);
    }

    handleChange(event) {
        this.setState({
            formSubmitted: false,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.returnDate !== '' && this.state.departureDate > this.state.returnDate) {
            alert("You can't travel back in time! Check your depature date is before your return date.")
            return
        }
        this.setState({
            formSubmitted: true,
        })
    }

    // Reset the form every time a tab is clicked
    // Ensures that the returnDate is reset when switching from a Return flight to a One-Way flight
    handleTabSelect() {
        this.setState({
            origin: '',
            destination: '',
            departureDate: '',
            returnDate: '',
            passengers: '',
            priceMax: Number.MAX_SAFE_INTEGER,
        })
    }


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={{ span: 4 }} className="border-left border-right border-bottom border-secondary">
                        <Tabs defaultActiveKey="one-way" className="extra-top-margin" onSelect={this.handleTabSelect}>
                            <Tab eventKey="one-way" title="One-Way">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="one-way-origin">
                                        <Form.Label>Origin Location</Form.Label>
                                        <Form.Control type="text" name="origin" onChange={this.handleChange} placeholder="Origin" size="sm" value={this.state.origin} required/>
                                    </Form.Group>
                                    <Form.Group controlId="one-way-destination">
                                        <Form.Label>Destination Location</Form.Label>
                                        <Form.Control type="text" name="destination" onChange={this.handleChange} placeholder="Destination" size="sm" value={this.state.destination} required/>
                                    </Form.Group>
                                    <Form.Group controlId="one-way-dept-date">
                                        <Form.Label>Departure Date</Form.Label>
                                        <Form.Control type="date" name="departureDate" onChange={this.handleChange} size="sm" value={this.state.departureDate} required />
                                    </Form.Group>
                                    <Form.Group controlId="one-way-passengers">
                                        <Form.Label>Number of Passengers</Form.Label>
                                        <Form.Control type="number" name="passengers" onChange={this.handleChange} placeholder="Passengers" size="sm" value={this.state.passengers} required/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicRangeCustom">
                                        <Form.Label>Maximum Cost Per Passenger: {this.state.priceMax === 0 || this.state.priceMax === Number.MAX_SAFE_INTEGER ? "No Budget" : this.state.priceMax} </Form.Label>
                                        <Form.Control type="range" name="priceMax" min={100} max={1000} value={this.state.priceMax} onChange={this.handleChange} custom required/>
                                    </Form.Group>
                                    <Button className="btn-block" type="submit">Search for Flights</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="return" title="Return">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="return-origin">
                                        <Form.Label>Origin Location</Form.Label>
                                        <Form.Control type="text" name="origin" onChange={this.handleChange} placeholder="Origin" size="sm" value={this.state.origin} required/>
                                    </Form.Group>
                                    <Form.Group controlId="return-destination">
                                        <Form.Label>Destination Location</Form.Label>
                                        <Form.Control type="text" name="destination" onChange={this.handleChange} placeholder="Destination" size="sm" value={this.state.destination} required/>
                                    </Form.Group>
                                    <Form.Group controlId="return-dept-date">
                                        <Form.Label>Departure Date</Form.Label>
                                        <Form.Control type="date" name="departureDate" onChange={this.handleChange} size="sm" value={this.state.departureDate} required/>
                                    </Form.Group>
                                    <Form.Group controlId="return-dept-date">
                                        <Form.Label>Return Date</Form.Label>
                                        <Form.Control type="date" name="returnDate" onChange={this.handleChange} size="sm" value={this.state.returnDate} required />
                                    </Form.Group>
                                    <Form.Group controlId="return-passengers">
                                        <Form.Label>Number of Passengers</Form.Label>
                                        <Form.Control type="number" name="passengers" onChange={this.handleChange} placeholder="Passengers" size="sm" value={this.state.passengers}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicRangeCustom">
                                        <Form.Label>Maximum Cost Per Passenger: {this.state.priceMax === 0 || this.state.priceMax === Number.MAX_SAFE_INTEGER ? "No Budget" : this.state.priceMax} </Form.Label>
                                        <Form.Control type="range" name="priceMax" min={100} max={1000} value={this.state.priceMax} onChange={this.handleChange} custom required/>
                                    </Form.Group>
                                    <Button className="btn-block" type="submit">Search for Flights</Button>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Col>


                    <Col md="8">
                        {   // Check that the form has been submitted, display the search results if it has
                            this.state.formSubmitted ?
                                <Result formData={this.state} /> : null
                        }
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Search; 