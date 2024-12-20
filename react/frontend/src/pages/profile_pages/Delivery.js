import React, {useState} from "react";
import {Box, Button, VStack, Text, IconButton, HStack, Flex,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {IconBike, IconCar} from "@tabler/icons-react";
import RegisterRestaurantForm from "../../components/profile_components/RegisterRestaurantForm";
import RestaurantTabs from "../../components/profile_components/RestaurantTabs";
import RegisterDelivery from "../../components/profile_components/RegisterDelivery";
import DeliveryManagement from "../../components/profile_components/DeliveryManagement";

export default function Delivery() {
    const [courier, setCourier] = useState(null);

    const handleRegisterCourier = (registeredCourier) =>{
        setCourier(registeredCourier)
    }

    return (
        <Box p={6}>
            {!courier ? (
                <RegisterDelivery onRegister={handleRegisterCourier} />
            ) : (
                <DeliveryManagement />
            )}
        </Box>
    );
}
