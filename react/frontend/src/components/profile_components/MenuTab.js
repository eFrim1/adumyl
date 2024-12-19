import React, {useState} from "react";
import {
    Box,
    Button,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, Grid, InputAddon, InputGroup, InputLeftElement, InputRightElement,
} from "@chakra-ui/react";

const MenuTab = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: "",
        ingredients: "",
        price: "",
        weight: "",
        prepTime: "",
    });

    const handleAddItem = () => {
        setMenuItems([...menuItems, {...newItem, id: Date.now()}]);
        setNewItem({
            name: "",
            ingredients: "",
            price: "",
            weight: "",
            prepTime: "",
        });
    };

    const handleDeleteItem = (id) => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
    };

    return (
        <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        value={newItem.name}
                        onChange={(e) =>
                            setNewItem((prev) => ({...prev, name: e.target.value}))
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Ingredients</FormLabel>
                    <Input
                        value={newItem.ingredients}
                        onChange={(e) =>
                            setNewItem((prev) => ({...prev, ingredients: e.target.value}))
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.price}
                            onChange={(e) =>
                                setNewItem((prev) => ({...prev, price: e.target.value}))
                            }
                        />
                        <InputLeftElement>$</InputLeftElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Weight</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.weight}
                            onChange={(e) =>
                                setNewItem((prev) => ({...prev, weight: e.target.value}))
                            }
                        />
                        <InputRightElement>g</InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Preparation time</FormLabel>
                    <InputGroup>
                        <Input
                            value={newItem.prepTime}
                            onChange={(e) =>
                                setNewItem((prev) => ({...prev, prepTime: e.target.value}))
                            }
                        />
                        <InputRightElement>min</InputRightElement>
                    </InputGroup>
                </FormControl>
            </Grid>
            <Button colorScheme="green" onClick={handleAddItem} w="200px">
                Add Item
            </Button>

            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Ingredients</Th>
                        <Th>Price</Th>
                        <Th>Weight</Th>
                        <Th>Preparation time</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {menuItems.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.name}</Td>
                            <Td overflowX="auto">{item.ingredients}</Td>
                            <Td>${item.price}</Td>
                            <Td>{item.weight} g</Td>
                            <Td>{item.prepTime} min</Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDeleteItem(item.id)}
                                    textColor="white"
                                >
                                    X
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};

export default MenuTab;
