import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ClassListToolbar } from '../components/class/class-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react'
import withAuth from '../services/withAuth';
import axios from 'axios'
import {getUrlGetAllClasses} from '../services/app.service'
const Classs = () => { 
  const [classs, setClasss] = useState([]);
  const fetchData = async () => {
    const url = getUrlGetAllClasses();
    let listClass;
    await axios.get(url).then((reponse) =>{
      listClass = reponse.data;
    })
    console.log('res', listClass);
    setClasss(listClass);
  }
  useEffect(() =>{
      if(classs.length ==0){
        fetchData();
      }
    
  }, []);

  return(
  <>
    <Head>
      <title>
        Classs | Cloud9
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
        <ClassListToolbar classs = {classs}/>
      </Container>
    </Box>
  </>
)};
Classs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Classs;
