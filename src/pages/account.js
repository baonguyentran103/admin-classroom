import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import withAuth from 'src/services/withAuth';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Account = () => {
  console.log("################ out useEffect");
  const [data, setData] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem('adminData');
    axios.get(`http://localhost:3000/admin/${id}`).then((response) => {
      setData({ ...response.data[0] });
      console.log("###########", response.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <Head>
        <title>
          Account | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile info={data} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails info={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );

}

export default withAuth(Account);
