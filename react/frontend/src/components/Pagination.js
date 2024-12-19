import React, { useState } from "react";
import { HStack, IconButton, Button } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ items, itemsPerPage = 4, onPageItemsChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Update parent with current items
    React.useEffect(() => {
        onPageItemsChange(currentItems);
    }, [currentPage, currentItems, onPageItemsChange]);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <HStack mt={6} justify="center" spacing={2}>
                <IconButton
                    aria-label="back"
                    variant="ghost"
                    onClick={handlePrevious}
                    isDisabled={currentPage === 1}
                    colorScheme="green"
                    icon={<FaAngleLeft />}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageSelect(index + 1)}
                        colorScheme={currentPage === index + 1 ? "green" : "gray"}
                        variant="ghost"
                    >
                        {index + 1}
                    </Button>
                ))}
                <IconButton
                    aria-label="next"
                    variant="ghost"
                    onClick={handleNext}
                    isDisabled={currentPage === totalPages}
                    colorScheme="green"
                    icon={<FaAngleRight />}
                />
            </HStack>
        </>
    );
};

export default Pagination;
