import React, {useEffect, useState} from "react";
import {Box, Text, useToast, Center, Spinner,} from "@chakra-ui/react";
import RegisterDelivery from "../../components/profile_components/RegisterDelivery";
import DeliveryManagement from "../../components/profile_components/DeliveryManagement";
import {getCourier} from "../../services/delivery";

export default function Delivery() {
    const [courier, setCourier] = useState(null);
    const [loading, setLoading] = useState(true);

    const toast = useToast();

    useEffect(() => {
        // Fetch restaurant details on component mount
        const fetchCourier = async () => {
            try {
                const data = await getCourier();
                setCourier(data); // Populate state with fetched data
            } catch (error) {
                // toast({
                //     title: "Error",
                //     description: error.message || "An error occurred. Please try again.",
                //     status: "error",
                //     duration: 3000,
                //     isClosable: true,
                // });
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchCourier();
    }, [toast]);

    const handleRegisterCourier = (registeredCourier) =>{
        setCourier(registeredCourier)
    }

    if (loading) {
        // Display a loading spinner while data is being fetched
        return (
            <Center h="50vh">
                <Spinner size="xl" />
                <Text m={4}>  Loading your restaurant...</Text>
            </Center>
        );
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
