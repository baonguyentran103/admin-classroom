import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
import { CustomerListResults } from './customer-list-results';

import { getListDepartment } from '../../services/api/departments';


export const CustomerListToolbar = ({customers}) => {
  const [rows, setRows] = useState(customers);
  const [searchedVal, setSearchedVal] = useState("");
  const [depart, setDepart] = useState("All");
  const [departs, setDeparts] = useState([]);

  const fetchData = async () => {
    const listDepartment = await getListDepartment();
    setDeparts(listDepartment.data);
    console.log(listDepartment.data)
  };

  useEffect(()=>{  
    setRows(customers);
  }, [customers]);
  useEffect(()=>{
    fetchData();
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchedVal(event.target.value);
    let tmp = event.target.value;
    if(tmp!==''){
      const filteredRows = customers.filter((row) => {
        return row.FullName.toLowerCase().includes(tmp.toLowerCase());
      });
      setRows(filteredRows);
    }
    else{
      setRows(customers);
    }
  };
  const handleSelect = (event) => {
    setDepart(event.target.value);
    let tmp = event.target.value;
    if(tmp!=='All'){
      const filteredRows = customers.filter((row) => {
        return row.DepartmentID === tmp;
      });
      setRows(filteredRows);
    }
    else{
      setRows(customers);
    }
  };
  
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
            Customers
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent sx={{display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'}}>
              <Box sx={{ maxWidth: 500 }}>
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
                  placeholder="Search customer"
                  variant="outlined"
                  onChange= {handleSearch}
                />
                
              </Box>
              <Box sx={{ maxWidth: 500, mt:-3}}>
                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                <Select
                  sx={{width:250}}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={depart}
                  label="Department"
                  onChange={handleSelect}
                >
                  <MenuItem value='All'>All</MenuItem>
                  {departs.map((depa) => (
                  <MenuItem value={depa.DepartmentID}>{depa.DepartmentName}</MenuItem>
                  ))}
                  
                </Select> 
                  
                
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{mt:3}}>
        <CustomerListResults customers={rows} departs = {departs}/>
      </Box>
      
    </Box>
  );
  
  
};
