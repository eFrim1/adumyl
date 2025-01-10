import React, {useEffect, useState} from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button, Flex, useToast,
} from "@chakra-ui/react";
import {fetchOrders, updateOrderStatus} from "../../services/orders";

const OrdersTab = () => {
    const [orders, setOrders] = useState([]);
    const toast = useToast();

    useEffect(() => {
        // Fetch orders on component mount
        const getOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to fetch orders.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        getOrders();
    }, [toast]);

    const moveToDelivery = async (id) => {
        try {
            const updatedOrder = await updateOrderStatus(id, "delivery");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? updatedOrder : order
                )
            );
            toast({
                title: "Success",
                description: "Order moved to delivery.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to update order.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Tabs>
            <TabList>
                <Tab>In Processing</Tab>
                <Tab>To Be Delivered</Tab>
            </TabList>

            <TabPanels>
                {/* In Processing Orders */}
                <TabPanel>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Order ID</Th>
                                <Th>Items</Th>
                                <Th>Preparation Time</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders
                                .filter((order) => ["pending", "accepted", "preparing"].includes(order.status))
                                .map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>
                                            {order.items.map((item, index) => (
                                                <Box key={index}>
                                                    {item.quantity} x {item.name}
                                                </Box>
                                            ))}
                                        </Td>
                                        <Td>
                                            {order.items.reduce(
                                                (acc, item) =>
                                                    acc + item.prepTime * item.quantity,
                                                0
                                            )}{" "}
                                            min
                                        </Td>
                                        <Td>
                                            <Button
                                                colorScheme="green"
                                                size="sm"
                                                onClick={() => moveToDelivery(order.id)}
                                            >
                                                To delivery
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TabPanel>

                {/* Delivered Orders */}
                <TabPanel>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Order ID</Th>
                                <Th>Items</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders
                                .filter((order) => order.status === "out_for_delivery")
                                .map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>
                                            {order.items.map((item, index) => (
                                                <Box key={index}>
                                                    {item.quantity} x {item.name}
                                                </Box>
                                            ))}
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default OrdersTab;
