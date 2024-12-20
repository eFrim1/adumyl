import React, {useState} from "react";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/NavBar";
import LastOrders from "../components/LastOrders";
import {Box, Flex, Grid, Text, VStack} from "@chakra-ui/react";
import FoodCategorySelector from "../components/FoodCategories";
import {orders, restaurants} from "../utils/demos"
import Pagination from "../components/Pagination";


const RestaurantsPage = () => {
    const [pageItems, setPageItems] = useState([]);

    const handlePageItemsChange = (currentItems) => {
        setPageItems(currentItems);
    };
    return (

        <Flex direction="column" m="50px">
            <Navbar/>
            <Flex justify="space-between" mt="50px">
                <Flex justify="start" direction="row">
                    <FoodCategorySelector/>
                </Flex>


                <VStack>
                    <Box w="1300px" h="130px" bg="red.500" borderRadius="20px" justifyItems="center"
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
                        h="520px"
                    >
                        {pageItems.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} name={restaurant.name} rating={restaurant.rating}
                                            image={restaurant.image}/>
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
