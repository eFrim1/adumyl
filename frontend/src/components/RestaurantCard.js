import React from 'react';
import { Box, Flex, Image, Text,HStack, useColorModeValue } from '@chakra-ui/react';

const RestaurantCard = ({restaurant, onClick }) => {

    const getRestaurant = () => {
        onClick(restaurant);
    }

    return (
        <Flex
            borderRadius="lg"
            overflow="hidden"
            direction="column"
            w="295px"
            bg={useColorModeValue('white', 'gray.800')}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)'}}
            position="relative"
            onClick={getRestaurant}
        >
            {/* Restaurant Image */}
            {/* Image Section */}
            <Box position="relative" width="100%" height="150px" overflow="hidden" borderRadius="10px">
                <Image
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                />

                {/* Text Overlay */}
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="rgba(0, 0, 0, 0.0)"
                    color="white"
                    px={4}
                    py={0}
                    justifyItems="end"
                    alignContent="center"
                    alignItems="center"
                >
                    <Text fontSize="0.9em" fontWeight="bold">
                        ⭐ {restaurant.rating}
                    </Text>
                </Box>
            </Box>

            {/* Restaurant Details */}
            <HStack px="10px" justifyContent="space-between" pt="5px">
                <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                    {restaurant.name}
                </Text>
            </HStack>
        </Flex>
    );
};

export default RestaurantCard;
