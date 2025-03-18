import React, { useState } from 'react';
import { Box, Flex, IconButton, Heading, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FaPizzaSlice, FaHamburger, FaGlassCheers, FaIceCream } from 'react-icons/fa';

const categories = [
    { id: 1, name: 'Pizza', icon: FaPizzaSlice },
    { id: 2, name: 'Burgers', icon: FaHamburger },
    { id: 3, name: 'Drinks', icon: FaGlassCheers },
    { id: 4, name: 'Desserts', icon: FaIceCream },
];

const FoodCategorySelector = ({ onSelect }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (categoryName) => {
        const isSelected = selectedCategories.includes(categoryName);
        const updatedSelection = isSelected
            ? selectedCategories.filter((name) => name !== categoryName) // Remove category
            : [...selectedCategories, categoryName]; // Add category

        setSelectedCategories(updatedSelection);

        if (onSelect) {
            onSelect(updatedSelection);
        }
    };

    return (
        <Flex
            p={2}
            maxW="md"
            mx="auto"
            h="300px"
            borderRadius="lg"
            bg={useColorModeValue('gray.50', 'gray.900')}
            justify="space-evenly"
        >
            <Flex direction="column" justify="space-around"  gap={4}>
                {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.name);
                    return (
                        <Tooltip key={category.id} label={category.name} hasArrow>
                            <IconButton
                                icon={<category.icon />}
                                colorScheme={isSelected ? 'green' : 'gray'}
                                variant={isSelected ? 'solid' : 'shadow'}
                                size="lg"
                                onClick={() => toggleCategory(category.name)}
                                aria-label={category.name}
                            />
                        </Tooltip>
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default FoodCategorySelector;
