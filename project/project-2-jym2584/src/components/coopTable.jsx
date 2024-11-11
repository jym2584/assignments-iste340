import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TableSortLabel,
    TablePagination,
} from "@mui/material";

function CoopTable({ coopData }) {
    const [filteredData, setFilteredData] = useState(coopData);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState({ by: "employer", direction: "asc" });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    /**
     * Update filtered data based on search term
     */
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = coopData.filter((item) =>
            item.employer.toLowerCase().includes(term) ||
            item.degree.toLowerCase().includes(term) ||
            item.city.toLowerCase().includes(term) ||
            item.term.includes(term)
        );
        setFilteredData(filtered);
    }, [searchTerm, coopData]);

    /**
     * Sets sorting mechanism
     * @param {String} attribute - Sorting by column 
     */
    const handleSort = (attribute) => {
        const isAsc = order.by === attribute && order.direction === "asc";
        setOrder({ by: attribute, direction: isAsc ? "desc" : "asc" });
    };

    /**
     * Populates sorted data based on handleSort
     */
    const sortedData = filteredData.sort((a, b) => {
        const aVal = a[order.by] || "";
        const bVal = b[order.by] || "";
        if (aVal < bVal) return order.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return order.direction === "asc" ? 1 : -1;
        return 0;
    });

    /**
     * Pagination
     */
    const paginatedData = sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ boxShadow: 3, p: 3, borderRadius: 1 }}>
            {/* Search Bar */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            {/* Coop Table */}
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={order.by === "employer"}
                                    direction={order.direction}
                                    onClick={() => handleSort("employer")}
                                >
                                    Employer
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={order.by === "degree"}
                                    direction={order.direction}
                                    onClick={() => handleSort("degree")}
                                >
                                    Degree
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={order.by === "city"}
                                    direction={order.direction}
                                    onClick={() => handleSort("city")}
                                >
                                    City
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={order.by === "term"}
                                    direction={order.direction}
                                    onClick={() => handleSort("term")}
                                >
                                    Term
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow hover>
                                <TableCell>{row.employer}</TableCell>
                                <TableCell>{row.degree}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.term}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                rowsPerPageOptions={[10, 20, 50]}
            />
        </Box>
    );
}

export default CoopTable;
