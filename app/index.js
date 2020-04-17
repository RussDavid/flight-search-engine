import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Search from './components/Search.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'


/*
* The App component defines the layout of the page
*/
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Container className="extra-top-margin">
                    <Row>
                        <Col md={{ span: 12}} className="border border-secondary">
                            <h1>NZ Domestic Flight Search Engine</h1>
                        </Col>
                    </Row>
                    <Search />
                </Container>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)