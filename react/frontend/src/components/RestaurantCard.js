import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardImg, Button } from "reactstrap";

const RestaurantCard = ({ name, rating, image }) => {
    return (
        <Card>
            <CardImg  src={require("../assets/" + image)} alt={`${name} image`} />
            <CardBody>
                <CardTitle tag="h5">{name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Rating: {rating}
                </CardSubtitle>
                <Button color="primary">View Menu</Button>
            </CardBody>
        </Card>
    );
};

export default RestaurantCard;