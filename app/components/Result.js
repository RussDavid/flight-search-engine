import React from 'react';
import FlightData from '../flight-data.json'
import { Col, Row, Card, Button, Image } from 'react-bootstrap'

function formatFlightDetails(originFlight, returnFlight, passengerCount) {
    return (
        returnFlight === null ?
            <React.Fragment key={originFlight.flightID}>
                <Card className="extra-top-margin">
                    <Card.Header>
                        Total Flight Cost for <strong>{passengerCount} </strong> 
                        Passengers: <strong>${originFlight.price * passengerCount} </strong>
                        Price per Passenger: <strong>${originFlight.price}</strong>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col><Card.Text>Flight Number: <strong>{originFlight.flightID}</strong></Card.Text></Col>
                            <Col>
                                <Card.Text>
                                    <strong>{originFlight.origin_short} > {originFlight.dest_short}</strong><br />
                                    Depart: <strong>{originFlight.departure_time}</strong><br />
                                    Arrive: <strong>{originFlight.arrival_time}</strong><br />
                                </Card.Text>
                            </Col>
                            <Col className="text-center">
                                <Image src="../app/components/img/plane.jpg" rounded style={{ width: 200 }} /><br />
                                <Button className="extra-top-margin" variant="primary">Book Flight</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </React.Fragment>
            : <React.Fragment key={returnFlight.flightID}>
                <Card className="extra-top-margin">
                    <Card.Header>
                        Total Flight Cost for <strong>{passengerCount} </strong> 
                        Passengers: <strong>${(originFlight.price * passengerCount) + (returnFlight.price * passengerCount)} </strong>
                        Price per Passenger: <strong>${(originFlight.price + returnFlight.price)}</strong>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Text>
                                    Origin Flight Number: <strong>{originFlight.flightID}</strong><br/>
                                    Return Flight Number: <strong>{returnFlight.flightID}</strong>
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>
                                    <strong>{originFlight.origin_short} > {originFlight.dest_short}</strong><br />
                                    Depart: <strong>{originFlight.departure_time}</strong><br />
                                    Arrive: <strong>{originFlight.arrival_time}</strong><br />
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>
                                    <strong>{returnFlight.origin_short} > {returnFlight.dest_short}</strong><br />
                                    Depart: <strong>{returnFlight.departure_time}</strong><br />
                                    Arrive: <strong>{returnFlight.arrival_time}</strong><br />
                                </Card.Text>
                            </Col>
                            <Col className="text-center">
                                <Image src="../app/components/img/plane.jpg" rounded style={{ width: 200 }} /><br />
                                <Button className="extra-top-margin" variant="primary">Book Flight</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </React.Fragment> 
    )
}

class Result extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col className="border-bottom border-right border-secondary">
                        {
                            this.props.formData.origin !== '' ? 
                                this.props.formData.returnDate === '' ?
                                    <div>
                                        <h2>{this.props.formData.origin} > {this.props.formData.destination}</h2>
                                        <p>Depart Date: <strong>{this.props.formData.departureDate}</strong></p>
                                    </div>
                                    : <div>
                                        <h2>{this.props.formData.origin} > {this.props.formData.destination} > {this.props.formData.origin}</h2>
                                        <Row>
                                            <Col><p className="text-left">Depart Date: <strong>{this.props.formData.departureDate}</strong></p></Col>
                                            <Col><p className="text-right">Return Date: <strong>{this.props.formData.returnDate}</strong></p></Col>
                                        </Row>
                                    </div> 
                            : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* 
                        * This part of the code could be improved as it is difficult to read
                        * I've added extra comments to explain each step
                        */}
                        {
                            this.props.formData.priceMax === 0 ?
                            this.props.formData.priceMax = Number.MAX_SAFE_INTEGER
                            : null
                        } 
                        {FlightData.map((originFlight) => { // First map function is used to look for flight from origin to destination
                            return (
                                originFlight.origin.toLowerCase() === this.props.formData.origin.toLowerCase() && // Check that the form Origin input matches the JSON Origin for the flight
                                    originFlight.destination.toLowerCase() === this.props.formData.destination.toLowerCase() && // Check that the form Destination input matches the JSON destination for the flight
                                        originFlight.price < this.props.formData.priceMax &&
                                        originFlight.departure_date === this.props.formData.departureDate ? // Check that the dates are matching from form and JSON
                                            this.props.formData.returnDate === '' ? // If there is no return date this is a one way flight, so call the formatFlightDetails() function to display the result
                                                formatFlightDetails(originFlight, null, this.props.formData.passengers)
                                                : FlightData.map((returnFlight) => { // Else if there is a return date a return flight needs to be found so a second map function is used to search for a return flight
                                                    return (
                                                        returnFlight.destination.toLowerCase() === this.props.formData.origin.toLowerCase() && // Check that the destination of this flight matches the Origin from the form
                                                            returnFlight.origin.toLowerCase() === this.props.formData.destination.toLowerCase() && // Check that the Origin of this flight is beginning from the destination from the first flight
                                                                returnFlight.departure_date === this.props.formData.returnDate && // Check that the depature date matches
                                                                    (returnFlight.price + originFlight.price) < this.props.formData.priceMax ? 
                                                                    formatFlightDetails(originFlight, returnFlight, this.props.formData.passengers) // Call the format function with the details of both Origin and Return flights
                                                                    : null
                                                    )
                                                })
                                        : null
                            )
                        })}
                    </Col>
                </Row>
            </React.Fragment>

        )
    }
}

export default Result;