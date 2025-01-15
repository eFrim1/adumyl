import React, {useEffect, useState} from "react";
import {Box, Center, Heading, Spinner, Text, useToast} from "@chakra-ui/react";
import RegisterRestaurantForm from "../../components/profile_components/RegisterRestaurantForm";
import RestaurantTabs from "../../components/profile_components/RestaurantTabs";
import {createRestaurant, getRestaurant, updateRestaurant} from "../../services/restaurant";

const MyRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        // Fetch restaurant details on component mount
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurant();
                setRestaurant(data); // Populate state with fetched data
            } catch (error) {
                // if (error.response?.status !== 404) {
                //     toast({
                //         title: "Error",
                //         description: error.message || "An error occurred. Please try again.",
                //         status: "error",
                //         duration: 3000,
                //         isClosable: true,
                //     });
                // }
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchRestaurant();
    }, [toast]);

    const handleRegisterRestaurant = async (restaurantData) => {
        try {
            const createdRestaurant = await createRestaurant(restaurantData);
            toast({
                title: "Success",
                description: "Restaurant successfully created!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setRestaurant(createdRestaurant);
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "An error occurred. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdate = async (restaurantData) => {
        setRestaurant(restaurantData);
        try {
            await updateRestaurant(restaurantData);
            toast({
                title: "Success",
                description: "Restaurant updated successfuly!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "An error occurred. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
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
            {!restaurant ? (
                <RegisterRestaurantForm onRegister={handleRegisterRestaurant} />
            ) : (
                <RestaurantTabs restaurant={restaurant} onUpdate={handleUpdate} />
            )}
        </Box>
    );
};

export default MyRestaurant;
