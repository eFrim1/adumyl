import React, {useEffect, useState} from "react";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/NavBar";
import LastOrders from "../components/LastOrders";
import {Box, Center, Flex, Grid, Spinner, Text, useToast, VStack} from "@chakra-ui/react";
import FoodCategorySelector from "../components/FoodCategories";
import {orders} from "../utils/demos"
import Pagination from "../components/Pagination";
import {getRestaurantsAll} from "../services/restaurant";
import {useNavigate} from "react-router-dom";


const RestaurantsPage = () => {
    const [pageItems, setPageItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();

    const onRestaurantClick = async (selectedRestaurant) => {
        navigate('/restaurant', {
            state: {
                restaurant: selectedRestaurant,
            }
        });
    }

    const handlePageItemsChange = (currentItems) => {
        setPageItems(currentItems);
    };

    useEffect(() => {
        // Fetch restaurant details on component mount
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurantsAll();
                setRestaurants(data);
            } catch (error) {
                if (error.response?.status !== 404) {
                    toast({
                        title: "Error",
                        description: error.message || "An error occurred. Please try again.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchRestaurant();
    }, [toast]);

    if(loading){
        return (
            <Center h="50vh">
                <Spinner size="xl" />
                <Text m={4}>  Loading Restaurants...</Text>
            </Center>
        );
    }

    return (

        <Flex direction="column" m="50px">
            <Navbar/>
            <Flex justify="space-between" mt="50px">
                <Flex justify="start" direction="row">
                    <FoodCategorySelector/>
                </Flex>


                <VStack>
                    <Box w="67.7vw" h="12vh" bg="red.500" borderRadius="20px" justifyItems="center"
                         alignContent="center">
                        <Text fontSize="3xl" fontWeight="bold">Enjoy our selection of 137 Restaurants</Text>
                    </Box>

                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)'
                        }}
                        gap="40px"
                        p={4}
                        justifyContent="space-between"
                        mx="5"
                        mt="40px"
                        h="28.889vw"
                    >
                        {pageItems.map((restaurant) => (
                            <RestaurantCard restaurant={restaurant} onClick={onRestaurantClick}/>
                        ))}
                    </Grid>
                    <Pagination
                        items={restaurants}
                        itemsPerPage={8}
                        onPageItemsChange={handlePageItemsChange}
                    />
                </VStack>


                <LastOrders orders={orders}/>
            </Flex>
        </Flex>

    );
};

export default RestaurantsPage;
