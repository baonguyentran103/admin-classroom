import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Popup from './popup';
import AccountForm from '../account/accountForm';
import { EditText } from 'react-edit-text';
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
import {getUrlUpdateUser} from '../../services/app.service';
import axios from 'axios';

export const UserListResults = ({ users}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(()=>{

  }, [users]);
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
const handleSave = (e, user) => {
    const { UserID } = user;
    const ID= e.value;
    const url = getUrlUpdateUser(UserID);
    const postData = {
        userID: ID
    }

    axios.put(url, postData).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
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
                FullName
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Baned
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page*limit, limit*(page + 1)).map((user) => (
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
                       <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                          <EditText
                          style={{height: 20}}
                          defaultValue={user.UserID}
                          onSave={(e) => handleSave(e, user)}
                          />
                        
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
                        src={user.Avatar}
                        sx={{ mr: 2 }}
                        onClick={() => { openInPopup(user) }}
                      >
                        {getInitials(user.FullName)}
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
                        {user.FullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.Email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
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
