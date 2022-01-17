import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react'
import withAuth from '../services/withAuth';
import axios from 'axios'
import {getUrlGetAllAdmin} from '../services/app.service'
const Customers = () => { 
  const [customers, setCustomers] = useState([]);
  const fetchData = async () => {
    const url = getUrlGetAllAdmin();
    let listAdmin;
    await axios.get(url).then((reponse) =>{
      listAdmin = reponse.data;
    })
    console.log('res', listAdmin);
    setCustomers(listAdmin);
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
        Admins | Cloud9
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
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Customers;
