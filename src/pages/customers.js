import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react'
import withAuth from '../services/withAuth';
import axios from 'axios'
import env from '../config/env.config'
import { getListCustomer } from '../services/api/customers';
const Customers = () => { 
  const [customers, setCustomers] = useState([]);
  const fetchData = async () => {
    const listCustomer = await getListCustomer();
    console.log('res', listCustomer.data);
    setCustomers(listCustomer.data);
  }
  useEffect(() =>{
      if(customers.length ==0){
        fetchData();
      }
    
  }, []);

  return(
  <>
    <Head>
      <title>
        Customers | Cloud9
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar customers = {customers}/>
      </Container>
    </Box>
  </>
)};

export default withAuth(Customers);
