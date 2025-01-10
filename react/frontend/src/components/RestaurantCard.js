import React from 'react';
import { Box, Flex, Image, Text, Badge, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import {getRestaurant} from "../services/restaurant";

const RestaurantCard = ({id ,name, rating, image, onClick }) => {

    const fetchRestaurant = async () => {
        try {
            const data = await getRestaurant();
            onClick(data); // Populate state with fetched data
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

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
            onClick={fetchRestaurant}
        >
            {/* Restaurant Image */}
            {/* Image Section */}
            <Box position="relative" width="100%" height="150px" overflow="hidden" borderRadius="10px">
                <Image
                    src={image}
                    alt={name}
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
                        ⭐ {rating}
                    </Text>
                </Box>
            </Box>

            {/* Restaurant Details */}
            <HStack px="10px" justifyContent="space-between" pt="5px">
                <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                    {name}
                </Text>
            </HStack>
        </Flex>
    );
};

export default RestaurantCard;
