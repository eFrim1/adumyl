import React, {useState} from "react";
import {Box, Button, VStack, Text, Heading, IconButton, HStack, Flex,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {IconBike, IconCar} from "@tabler/icons-react";
import RegisterRestaurantForm from "../../components/profile_components/RegisterRestaurantForm";
import RestaurantTabs from "../../components/profile_components/RestaurantTabs";
import RegisterDelivery from "../../components/profile_components/RegisterDelivery";
import DeliveryManagement from "../../components/profile_components/DeliveryManagement";

export default function Delivery() {
    const [courier, setCourier] = useState(null);

    const handleRegisterCourier = (registeredCourier) =>{
        // Simulate saving the courier to the database or global state
        setCourier(registeredCourier);
    }

    const handleLogout = () => {
        setCourier(null); // Clear the courier state to return to the registration screen
    };
    
    return (
        <Box p={6}>
            <VStack spacing={6} align="center">
                <Heading>Delivery System</Heading>
                {!courier ? (
                    <>
                        <Text>Welcome! Please register as a courier to start managing deliveries.</Text>
                        <RegisterDelivery onRegister={handleRegisterCourier} />
                    </>
                ) : (
                    <>
                        <Text>Welcome back, {courier.name}!</Text>
                        <Button onClick={handleLogout} colorScheme="red" variant="outline">
                            Logout
                        </Button>
                        <DeliveryManagement courier={courier} />
                    </>
                )}
            </VStack>
        </Box>
    );
}
