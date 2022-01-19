import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useEffect, useState} from 'react'
import withAuth from '../services/withAuth';
import axios from 'axios'
import {getUrlGetAllUser} from '../services/app.service'
const Users = () => { 
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    const url = getUrlGetAllUser();
    let listUser;
    await axios.get(url).then((reponse) =>{
      listUser = reponse.data;
    })
    console.log('res', listUser);
    setUsers(listUser);
  }
  useEffect(() =>{
      if(users.length ==0){
        fetchData();
      }
    
  }, []);

  return(
  <>
    <Head>
      <title>
        User
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
        <UserListToolbar users = {users}/>
      </Container>
    </Box>
  </>
)};
export default withAuth(Users);
