import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AdminListToolbar } from '../components/admin/admin-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react'
import withAuth from '../services/withAuth';
import axios from 'axios'
import {getUrlGetAllAdmin} from '../services/app.service'
const Admins = () => { 
  const [admins, setAdmins] = useState([]);
  const fetchData = async () => {
    const url = getUrlGetAllAdmin();
    let listAdmin;
    await axios.get(url).then((reponse) =>{
      listAdmin = reponse.data;
    })
    console.log('res', listAdmin);
    setAdmins(listAdmin);
  }
  useEffect(() =>{
      if(admins.length ==0){
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
        <AdminListToolbar admins = {admins}/>
      </Container>
    </Box>
  </>
)};
Admins.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Admins;
