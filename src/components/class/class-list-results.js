import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const ClassListResults = ({ classs}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(()=>{

  }, [classs]);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}

  return (
    <>
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                  ID
                </TableCell>
              <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Part
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Room
                </TableCell>
                <TableCell>
                  Author
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classs.slice(page*limit, limit*(page + 1)).map((clasws) => (
                <TableRow
                  hover
                  key ={clasws.ClassID}
                >
                <TableCell>
                  <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                       <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {clasws.ClassID}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                     <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {clasws.Name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {clasws.Part}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {clasws.Title}
                  </TableCell>
                  <TableCell>
                    {clasws.Room}
                  </TableCell>
                  <TableCell>
                    {clasws.Auther}
                  </TableCell>
                  <TableCell>
                    {clasws.CreatedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={classs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
  );
};
