import {Button, Flex, Image, Spacer, Stack, Text, Grid, VStack, useToast, Center, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {RepeatIcon} from "@chakra-ui/icons";
import Pagination from "../../components/Pagination";
import {getCourier} from "../../services/delivery";
import {fetchOrderHistory, fetchOrders} from "../../services/orders";

const OrderHistory = () => {

    const [pageItems, setPageItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([]);
    const toast = useToast()

    useEffect(() => {
        // Fetch restaurant details on component mount
        const getOrders = async () => {
            try {
                const data = await fetchOrderHistory();
                setOrders(data); // Populate state with fetched data
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "An error occurred. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        getOrders();
    }, [toast]);

    const handlePageItemsChange = (currentItems) => {
        setPageItems(currentItems);
    };

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
        <VStack justifyContent="space-between" h="750px">
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }}
                templateRows="1"
                gap="40px"

                justifyContent="space-between"

                mt="40px"
                h="520px"
            >
                {pageItems.map((order) => (
                    <Flex
                        direction="column"
                        key={order.id}
                        p={4}
                        borderRadius="lg"
                        bg="gray.700"
                        w = "280px"
                        h="500px"
                        justifyContent="space-between"
                        overflowY="auto"
                    >
                        {/* Order Items */}
                        <Stack spacing={2}>
                            {order.items.map((item, index) => (
                                <Flex key={index}>
                                    {/* Image Button */}
                                    <Image
                                        src={item.image_url}
                                        alt={item.name}
                                        boxSize="70px"
                                        borderRadius="full"
                                    />
                                    <Stack ml="10px" justify="center">
                                        <Text fontWeight="bold">{item.name}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {item.weight}
                                        </Text>
                                    </Stack>
                                    <Spacer/>
                                    <Text>{item.price}</Text>
                                </Flex>
                            ))}
                        </Stack>
                        <Flex></Flex>


                        {/* Footer */}
                        <Stack>
                            <Flex align="center" gap={2} justify="end">
                                <Text fontWeight="bold">Total: {order.total_price}</Text>

                            </Flex>
                            <Flex justify="space-between">
                                <Text fontSize="sm" color="gray.500">
                                    {order.created_at}
                                </Text>
                                {/*<Button size="xs" leftIcon={<RepeatIcon/>}>*/}
                                {/*    Repeat*/}
                                {/*</Button>*/}
                            </Flex>
                        </Stack>
                    </Flex>
                ))}
            </Grid>
            <Pagination
                items={orders}
                itemsPerPage={4}
                onPageItemsChange={handlePageItemsChange}
            />
        </VStack>
    )
}

export default OrderHistory;