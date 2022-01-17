import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import Select from '@mui/material/Select';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import axios from 'axios';
import { Search as SearchIcon } from '../../icons/search';
import {getUrlGetAllAdmin} from '../../services/app.service'
import {AdminListResults} from './admin-list-results';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';


export const AdminListToolbar = ({admins}) => {
  const [rows, setRows] = useState(admins);
  const [searchedVal, setSearchedVal] = useState("");
  const [depart, setDepart] = useState("All");
  const [departs, setDeparts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFil, setSearchFil] = useState(0);

  const fetchData = async () => {
    
  };

  useEffect(()=>{  
    setRows(admins);
  }, [admins]);
  useEffect(()=>{
    fetchData();
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchedVal(event.target.value);
    let tmp = event.target.value;
    if(tmp!==''){
      
      const filteredRows = admins.filter((row) => {
        if(searchFil ===0){
          return row.Fullname.toLowerCase().includes(tmp.toLowerCase());
        }
        else return row.Email.toLowerCase().includes(tmp.toLowerCase());
      });
      setRows(filteredRows);
    }
    else{
      setRows(admins);
    }
  };
  const handleClose = () => { setAnchorEl(null); }
  const searchName = ()=>{
    setSearchFil(0);
    handleClose();
  }
  const searchMail = ()=>{
    setSearchFil(1);
    handleClose();
  }
  const handleClickFilter = (event) => setAnchorEl(event.currentTarget);
  return(
    <Box>
      <Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            Admins
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent sx={{display: 'flex', flexWrap: 'wrap'}}>
              <Box sx={{ }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search admin"
                  variant="outlined"
                  onChange= {handleSearch}
                />
                
              </Box>
              <Box sx={{ mt:0}}>
                <IconButton onClick={handleClickFilter}><FilterAltIcon fontSize= 'large'/></IconButton>
                <Menu
                    // id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }} // left of add button
                    sx ={{ml:15, mt: -3}}
                >
                    <MenuItem selected= {searchFil === 0} onClick={searchName}>Fullname</MenuItem>
                    <MenuItem selected= {searchFil === 1} onClick={searchMail}>Email</MenuItem>
                </Menu>
                {/* <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                <Select
                  sx={{width:250}}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Department"
                > 
                  
                </Select> */}
                  
                
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{mt:3}}>
        <AdminListResults admins={rows}/>
      </Box>
      
    </Box>
  );
  
  
};
