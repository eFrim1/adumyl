import {Box, Flex, Heading, Spacer, Stack, Image, Text, IconButton, HStack} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useCart} from "../pages/OrderContext";

const ShoppingCart = () => {
    const {cart, setCart} = useCart()
    const total = cart?.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);


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

    const handleIncrease = (itemId) => {
        handleQuantityChange(itemId, 1); // Increment quantity
    };

    const handleDecrease = (itemId) => {
        handleQuantityChange(itemId, -1); // Decrement quantity
    };

    return (
        <Box p={4} w="350px" borderRadius="lg" boxShadow="lg" bg="gray.900">
            {/* Header */}
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color="white">
                    Shopping Cart
                </Heading>
            </Flex>

            {/* Items */}
            <Stack spacing={4} overflowY="auto" h="700px">
                {cart?.map((item, index) => (
                    <Flex
                        key={index}
                        p={4}
                        borderRadius="lg"
                        bg="gray.700"
                        alignItems="center"
                        justify="space-between"
                    >
                        <Image
                            src={item.image_url}
                            alt={item.name}
                            boxSize="80px"
                            borderRadius="full"
                        />
                        {/* Image and Item Info */}
                        <Flex alignItems="center">
                            <Flex flexDirection="column" ml="5px">
                                <Text fontWeight="bold" color="white">
                                    {item.name}
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    {item.weight} g
                                </Text>
                                <Flex flexDirection="row" alignItems="center" alignContent="center" justifyContent="center">
                                    <IconButton
                                        aria-label="reduce"
                                        size="sm"
                                        variant="ghost"
                                        icon={<MinusIcon />}
                                        onClick={() => handleDecrease(item.id)}
                                        colorScheme="red"
                                    />
                                    <Text mx="2"alignContent="center" alignSelf="center">{item.quantity}</Text>
                                    <IconButton
                                        aria-label="add"
                                        size="sm"
                                        variant="ghost"
                                        icon={<AddIcon />}
                                        onClick={() => handleIncrease(item.id)}
                                        colorScheme="green"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>

                        {/* Quantity Controls and Price */}
                        <Flex alignItems="center">
                            <Spacer />
                            <Text ml={4} fontWeight="bold" color="white">
                                ${item.price}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </Stack>

            {/* Total */}
            <Flex justify="space-between" mt={4}>
                <Text fontWeight="bold" fontSize="lg" color="white">
                    Total:
                </Text>
                <Text fontWeight="bold" fontSize="lg" color="white">
                    ${total}
                </Text>
            </Flex>
        </Box>
    );
};

export default ShoppingCart;