import React, {useState} from "react";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/NavBar";
import LastOrders from "../components/LastOrders";
import {Box, Button, Flex, Grid, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import FoodCategorySelector from "../components/FoodCategories";

const orders = [
    {
        id: 1,
        items: [
            {
                name: 'Burger',
                weight: '250g',
                price: '$5.99',
                image: 'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?t=st=1732714294~exp=1732717894~hmac=96bc5ea62795e4f849bce3ead8ace86ab65d0afccf21eefbb2cc774453eb1f04&w=1800', // Replace with your image path
            },
            {
                name: 'Burger',
                weight: '250g',
                price: '$5.99',
                image: 'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?t=st=1732714294~exp=1732717894~hmac=96bc5ea62795e4f849bce3ead8ace86ab65d0afccf21eefbb2cc774453eb1f04&w=1800', // Replace with your image path
            },
            {
                name: 'Burger',
                weight: '250g',
                price: '$5.99',
                image: 'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?t=st=1732714294~exp=1732717894~hmac=96bc5ea62795e4f849bce3ead8ace86ab65d0afccf21eefbb2cc774453eb1f04&w=1800', // Replace with your image path
            },
            {
                name: 'Fries',
                weight: '150g',
                price: '$2.99',
                image: 'https://img.freepik.com/free-photo/freshly-cooked-gourmet-french-fries-wooden-table-generated-by-artificial-intelligence_188544-129515.jpg?t=st=1732714404~exp=1732718004~hmac=cd955e12925623ee906ecd078868ec17b45cccef3d0141120391f66d6ec11cbe&w=2000',
            },
        ],
        date: 'Nov 17, 2024',
        totalPrice: '$8.98',
    },
    {
        id: 2,
        items: [
            {
                name: 'Pizza',
                weight: '500g',
                price: '$12.99',
                image: 'https://img.freepik.com/free-photo/delicious-pizza-studio_23-2151846492.jpg?t=st=1732714463~exp=1732718063~hmac=dd11b0ecdb9bc62ac76672a810e3581d643856526a7469f7913f966dac6de0dc&w=996',
            },
            {
                name: 'Soda',
                weight: '330ml',
                price: '$1.99',
                image: 'https://img.freepik.com/free-photo/delicious-coffee-cup-indoors_23-2150691355.jpg?t=st=1732714566~exp=1732718166~hmac=98620ba4aaf1abde23ad7250182de0942621326ac57979494a2209dca62c0cdd&w=2000',
            },
        ],
        date: 'Nov 16, 2024',
        totalPrice: '$14.98',
    },
];

const restaurants = [
    { id: 1, name: 'Pasta Palace', rating: 4.5, image: "https://eatstreet.imgix.net/restaurant_highlight_images/adee6689683e118ebc723d385e79c7563dae1.jpg"},
    { id: 2, name: 'Burger Bistro', rating: 4.2, image: "https://www.honestburgers.co.uk/wp-content/uploads/2024/11/CHRISTMAS-BURGER-TRIO-WEB.png"},
    { id: 3, name: 'Sushi World', rating: 4.8, image: "https://www.bigbelly-cluj.ro/file/product/sushi-platter-1376.jpg?v=637926311290039478"},
    { id: 4, name: 'Taco Town', rating: 4.0, image: "https://tb-static.uber.com/prod/image-proc/processed_images/58d10c7ec95b90cfae600404409eef16/fb86662148be855d931b37d6c1e5fcbe.jpeg"},
    { id: 5, name: 'Pizza Paradise', rating: 4.3, image: "https://tazzcdn.akamaized.net/uploads/cover/Italian-pizza-1_3.jpg"},
    { id: 7, name: 'Pasta Palace', rating: 4.5, image: "https://eatstreet.imgix.net/restaurant_highlight_images/adee6689683e118ebc723d385e79c7563dae1.jpg"},
    { id: 8, name: 'Burger Bistro', rating: 4.2, image: "https://www.honestburgers.co.uk/wp-content/uploads/2024/11/CHRISTMAS-BURGER-TRIO-WEB.png"},
    { id: 9, name: 'Sushi World', rating: 4.8, image: "https://www.bigbelly-cluj.ro/file/product/sushi-platter-1376.jpg?v=637926311290039478"},
    { id: 10, name: 'Taco Town', rating: 4.0, image: "https://tb-static.uber.com/prod/image-proc/processed_images/58d10c7ec95b90cfae600404409eef16/fb86662148be855d931b37d6c1e5fcbe.jpeg"},
    { id: 11, name: 'Pizza Paradise', rating: 4.3, image: "https://tazzcdn.akamaized.net/uploads/cover/Italian-pizza-1_3.jpg"},
];


const RestaurantsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(restaurants.length / itemsPerPage);

    // Get current page's items
    const currentItems = restaurants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Pagination Handlers
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <Flex direction="column" m="50px">
                <Navbar/>
                <Flex justify="space-between" mt="50px">
                    <Flex justify="start" direction="row">
                        <FoodCategorySelector/>
                    </Flex>


                        <VStack>
                            <Box w="1300px" h="130px" bg="red.500" borderRadius="20px" justifyItems="center" alignContent="center">
                                <Text fontSize="3xl" fontWeight="bold">Enjoy our selection of 137 Restaurants</Text>
                            </Box>

                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
                                gap="40px"
                                p={4}
                                justifyContent="space-between"
                                mx="5"
                                mt="40px"
                                h="520px"
                            >
                                {currentItems.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} name={restaurant.name} rating={restaurant.rating} image={restaurant.image} />
                                ))}
                            </Grid>
                            <HStack mt={6} justify="center" spacing={2}>
                                <IconButton
                                    aria-label="back"
                                    variant="ghost"
                                    onClick={handlePrevious}
                                    isDisabled={currentPage === 1}
                                    colorScheme="green"
                                    icon={<FaAngleLeft/>}
                                />

                                {[...Array(totalPages)].map((_, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handlePageSelect(index + 1)}
                                        colorScheme={currentPage === index + 1 ? 'green' : 'gray'}
                                        variant="ghost"
                                    >
                                        {index + 1}
                                    </Button>
                                ))}

                                <IconButton
                                    aria-label="next"
                                    variant="ghost"
                                    onClick={handleNext}
                                    isDisabled={currentPage === totalPages}
                                    colorScheme="green"
                                    icon={<FaAngleRight/>}
                                />


                            </HStack>
                        </VStack>


                    <LastOrders orders ={orders}/>
                </Flex>
            </Flex>

        </div>
    );
};

export default RestaurantsPage;
