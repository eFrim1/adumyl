import {Box, Button, Flex, HStack, IconButton, Image, Text} from "@chakra-ui/react";
import {IconAd, IconPlus} from "@tabler/icons-react";

const MenuItemCard = ({ item, onAddToCart }) => {
    return (
        <Flex
            borderRadius="lg"
            overflow="hidden"
            direction="column"
            w="295px"
            // bg={useColorModeValue("white", "gray.800")}
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            position="relative"
        >
            <Box position="relative" width="100%" height="150px" overflow="hidden" borderRadius="10px">
                <Image src={item.image_url} alt={item.name} objectFit="cover" width="100%" height="100%" />

                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="rgba(0, 0, 0, 0.5)"
                    color="white"
                    px={4}
                    py={1}
                    textAlign="center"
                >
                    <Text fontSize="0.9em" fontWeight="bold">
                        ${item.price}
                    </Text>
                </Box>
            </Box>

            <HStack px="10px" justifyContent="space-between" pt="5px" alignContent="center">
                <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                    {item.name}
                </Text>
                <IconButton aria-label="Add" size="sm" colorScheme="green" variant="ghost" icon={<IconPlus />} onClick={() => onAddToCart(item)}/>
            </HStack>
        </Flex>
    );
};

export default MenuItemCard;