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
import { getUrlUpdateUser } from '../../services/app.service';
import axios from 'axios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import IconButton from '@mui/material/IconButton';

export const UserListResults = ({ users }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [listBanned, setListBanned] = useState([]);
  useEffect(() => {
    const newListBanned = users.map(user => user.Baned);
    setListBanned(newListBanned);
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
    const ID = e.value;
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

  const handleClickBanner = (index, user) => {
    listBanned[index] = !listBanned[index];
    setListBanned([...listBanned])


    const { UserID } = user;
    const url = getUrlUpdateUser(UserID);
    const postData = {
      baned: listBanned[index] ? 1 : 0
    }

    axios.put(url, postData).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })

    console.log(listBanned);
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
                {users.slice(page * limit, limit * (page + 1)).map((user, index) => (
                  <TableRow
                    hover
                  >
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >

                        <EditText
                          style={{ height: 20 }}
                          defaultValue={user.UserID}
                          onSave={(e) => handleSave(e, user)}
                          style={{
                            fontSize: "1rem", padding: 5, width: "500px",
                            fontFamily: " Inter, -apple-system, BlinkMacSystemFont, Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
                          }}
                        />

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
                    <TableCell>
                      {listBanned[page * limit + index] ?
                        <IconButton aria-label="delete" sx={{ color: "red" }} onClick={() => handleClickBanner(page * limit + index, user)}>
                          <IndeterminateCheckBoxIcon />
                        </IconButton>
                        :
                        <IconButton aria-label="delete" sx={{ color: "grey" }} onClick={() => handleClickBanner(page * limit + index, user)}>
                          <CheckBoxOutlineBlankIcon />
                        </IconButton>}
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
