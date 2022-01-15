import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Popup from './popup';
import AccountForm from '../account/accountForm';
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

export const CustomerListResults = ({ customers, departs}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(()=>{

  }, [customers]);
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
                  Avatar
                </TableCell>
                <TableCell>
                Employee Name
                </TableCell>
                <TableCell>
                  Department
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Tel
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page*limit, limit*(page + 1)).map((customer) => (
                <TableRow
                  hover
                >
                  <TableCell>
                  <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.Avatar}
                        sx={{ mr: 2 }}
                        onClick={() => { openInPopup(customer) }}
                      >
                        {getInitials(customer.Fullname)}
                      </Avatar>
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
                        {customer.FullName} ({customer.EmployeeCode})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.DepartmentName}
                  </TableCell>
                  <TableCell>
                    {customer.Email}
                  </TableCell>
                  <TableCell>
                    {customer.Tel}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AccountForm
                    profile={recordForEdit}
                    departs ={departs}/>
            </Popup>
    </>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
