import React, { useState } from "react";
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
    Button, Flex,
} from "@chakra-ui/react";

const OrdersTab = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            status: "processing",
            items: [
                { name: "Burger", quantity: 2, prepTime: 60 },
                { name: "Fries", quantity: 1, prepTime: 20 },
                { name: "Pizza", quantity: 1, prepTime: 50 },
                { name: "Soda", quantity: 2, prepTime: 50 },
            ],
        },
        {
            id: 2,
            status: "delivery",
            items: [
                { name: "Pizza", quantity: 1, prepTime: 50 },
                { name: "Soda", quantity: 2, prepTime: 50 },
            ],
        },
    ]);

    const moveToDelivery = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: "delivery" } : order
            )
        );
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
                                .filter((order) => order.status === "processing")
                                .map((order) => (
                                    <Tr key={order.id} >
                                        <Td>{order.id}</Td>
                                        <Td>
                                            {order.items.map((item, index) => (
                                                <Box key={index}>
                                                    {item.quantity} x {item.name}
                                                </Box>
                                            ))}
                                        </Td>
                                        <Td>
                                            {order.items.reduce((accumulator, currentValue)=>accumulator + currentValue.prepTime * currentValue.quantity, 0)} min
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
                                .filter((order) => order.status === "delivery")
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
