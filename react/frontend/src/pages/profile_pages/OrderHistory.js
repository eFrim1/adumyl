import {Button, Flex, Image, Spacer, Stack, Text, Grid, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {RepeatIcon} from "@chakra-ui/icons";
import Pagination from "../../components/Pagination";

const OrderHistory = ({orders}) => {

    const [pageItems, setPageItems] = useState([]);

    const handlePageItemsChange = (currentItems) => {
        setPageItems(currentItems);
    };

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
                                        src={item.image}
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
                                <Text fontWeight="bold">Total: {order.totalPrice}</Text>

                            </Flex>
                            <Flex justify="space-between">
                                <Text fontSize="sm" color="gray.500">
                                    {order.date}
                                </Text>
                                <Button size="xs" leftIcon={<RepeatIcon/>}>
                                    Repeat
                                </Button>
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