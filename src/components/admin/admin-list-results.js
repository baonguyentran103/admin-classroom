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

export const AdminListResults = ({ admins}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(()=>{

  }, [admins]);
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
                  Avatar
                </TableCell>
                <TableCell>
                Fullname
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.slice(page*limit, limit*(page + 1)).map((admin) => (
                <TableRow
                  hover
                  key = {admin.AdminID}
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
                        {admin.AdminID}
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
                      <Avatar
                        src={admin.Avatar}
                        sx={{ mr: 2 }}
                        onClick={() => { openInPopup(admin) }}
                      >
                        {getInitials(admin.Fullname)}
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
                        {admin.Fullname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {admin.Email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={admins.length}
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
                    />
            </Popup>
    </>
  );
};
