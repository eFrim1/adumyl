import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading, HStack,
    Icon,
    Stack,
    Text,
    Image, Spacer, IconButton,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6"; // Repeat icon from Chakra

const LastOrders = ({orders}) => {
    // Mock data for orders

    return (
        <Box
            p={4}
            w="350px"
            borderRadius="lg"
            boxShadow="lg"
            bg="gray.900"
        >
            {/* Header */}
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Last Orders</Heading>
            </Flex>

            {/* Orders List */}
            <Flex direction="column">
                <Stack spacing={4} overflowY="auto" h="700px">
                    {orders.map((order) => (
                        <Flex
                            direction="column"
                            key={order.id}
                            p={4}
                            borderRadius="lg"
                            bg="gray.700"
                        >
                            {/* Order Items */}
                            <Stack spacing={2}>
                                {order.items.map((item, index) => (
                                    <Flex key={index}  >
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


                            {/* Footer */}
                            <Stack>
                                <Flex align="center" gap={2} justify="end">
                                    <Text fontWeight="bold">Total: {order.total_price}</Text>

                                </Flex>
                                <Flex justify="space-between">
                                    <Text fontSize="sm" color="gray.500">
                                        {order.create_at}
                                    </Text>
                                    <Button size="xs" leftIcon={<RepeatIcon />} >
                                        Repeat
                                    </Button>
                                </Flex>
                            </Stack>
                        </Flex>
                    ))}
                </Stack>

            </Flex>
        </Box>
    );
};

export default LastOrders;
