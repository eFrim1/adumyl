import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardImg,
    Button,
} from "reactstrap";
import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
    {
        name: "Restaurant Example",
        rating: 4.6,
        image: "restaurant1.jpeg",
    },

    // Add more restaurants as needed
];

const RestaurantsPage = () => {
    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Enjoy our selection of 134 restaurants</h1>
                </Col>
            </Row>
            <Row>
                {restaurants.map((restaurant, index) => (
                    RestaurantCard(restaurant)
                ))}
            </Row>
        </Container>
    );
};

export default RestaurantsPage;
