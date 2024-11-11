import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getData from '../utils/getData';


/**
 * Helper function to generate a table row with a popup
 * @param {JSON} course course json data
 * @param {String} isOpen handler to display more info about a course
 * @param {String} onRowClick displays more info about a course 
 * @returns 
 */
function CourseRow({ course, isOpen, onRowClick }) {
    return (
      <>
        <TableRow hover onClick={onRowClick} style={{ cursor: "pointer" }}>
          <TableCell>{course.courseID}</TableCell>
          <TableCell>{course.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="body2">{course.description}</Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

function Courses() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState({ by: "courseID", direction: "asc" });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [openRow, setOpenRow] = useState(null);
    
    // Fetch courses data from the API
    useEffect(() => {
        getData('course/').then((json) => {
          setData(json);
        });
      }, []);
      
    /**
     * Update filtered data based on search term
     */
    useEffect(() => {
      const term = searchTerm.toLowerCase();
      const filtered = data.filter((course) => {
        return (
          course.courseID.toLowerCase().includes(term) ||
          course.title.toLowerCase().includes(term)
        );
      });
      setFilteredData(filtered);
    }, [searchTerm, data]);
  
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
        <Typography variant="h5">
          <b>Courses</b>
        </Typography>
  
        {/* Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, my: 2 }}>
          <TextField
            label="Search Courses"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
  
        {/* Course Table */}
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={order.by === "courseID"}
                    direction={order.direction}
                    onClick={() => handleSort("courseID")}
                  >
                    Course ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order.by === "title"}
                    direction={order.direction}
                    onClick={() => handleSort("title")}
                  >
                    Course Name
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((course, index) => (
                <CourseRow
                  key={course.courseID}
                  course={course}
                  isOpen={openRow === index}
                  onRowClick={() => setOpenRow(openRow === index ? null : index)}
                />
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
  
export default Courses;