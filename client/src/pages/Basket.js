import React, {useContext, useEffect} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import {Container} from "react-bootstrap";
import {getFromBasket} from "../http/deviceAPI";
import {Context} from "../index";

const Basket = () => {
    const { user } = useContext(Context);
    const { device } = useContext(Context);
    
    useEffect(() => {
        getFromBasket(user._user.id).then(data => device.setDevices(data.data));
    }, [])
    
    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <h2>Избранные</h2>
                </Col>
                <Col md={9}>
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    );
};

export default Basket;
