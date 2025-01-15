import React, {useEffect, useState} from "react";
import {Box, Center, Flex, Grid, Spinner, useToast, VStack, Text} from "@chakra-ui/react";
import Navbar from "../components/NavBar";
import Pagination from "../components/Pagination";
import MenuItemCard from "../components/MenuItemCard";
import ShoppingCart from "../components/ShoppingCart";
import {getMenuItemsAll} from "../services/menuItem";
import {useLocation} from "react-router-dom";
import FoodCategorySelector from "../components/FoodCategories";
import {useCart, useRestaurant} from "./OrderContext";


const MenuPage = () => {
    const [pageItems, setPageItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const {cart, setCart} = useCart([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const params = useLocation();
    const selectedRestaurant = params.state.restaurant;
    const {restaurant, setRestaurant} = useRestaurant();

    const handleAddToCart = (item) => {
        if(!restaurant){
            setRestaurant(selectedRestaurant);
        }else if(restaurant !== selectedRestaurant){
            setCart([]);
            setRestaurant(selectedRestaurant);
        }
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });

        toast({
            title: "Item added to cart",
            description: `${item.name} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleQuantityChange = (itemId, change) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === itemId
                        ? { ...item, quantity: Math.max(item.quantity + change, 0) } // Prevent quantity < 0
                        : item
                )
                .filter((item) => item.quantity > 0) // Remove items with 0 quantity
        );
    };

    const handlePageItemsChange = (currentItems) => {
        setPageItems(currentItems);
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await getMenuItemsAll(selectedRestaurant);
                if (data) {
                    setMenuItems(data);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to fetch menu items.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [toast, selectedRestaurant]);

    if (loading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" />
                <Text m={4}>Loading Menu Items...</Text>
            </Center>
        );
    }

    return (
        <Flex direction="column" m="50px">
            <Navbar />
            <Flex justify="space-between" mt="50px">
                <Flex justify="start" direction="row">
                    <FoodCategorySelector />
                </Flex>
                <VStack>
                    <Box
                        w="67.7vw"
                        h="12vh"
                        bg="red.500"
                        borderRadius="20px"
                        justifyItems="center"
                        alignContent="center"
                    >
                        <Text fontSize="3xl" fontWeight="bold">Explore our selection of Menu Items</Text>
                    </Box>

                    <Grid
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        }}
                        gap="40px"
                        p={4}
                        justifyContent="space-between"
                        mx="5"
                        mt="40px"
                        h="28.889vw"
                    >
                        {pageItems.map((item) => (
                            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                        ))}
                    </Grid>
                    <Pagination
                        items={menuItems}
                        itemsPerPage={8}
                        onPageItemsChange={handlePageItemsChange}
                    />
                </VStack>

                <ShoppingCart cart={cart} onQuantityChange={handleQuantityChange} />
            </Flex>
        </Flex>
    );
};

export default MenuPage;