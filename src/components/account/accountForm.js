import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';

const AccountForm = ({profile, departs}) => (
  <>
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
          <AccountProfile profile = {profile}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <AccountProfileDetails profile = {profile} departs ={departs}/>
        </Grid>
      </Grid>
    </Container>
  </>
);


export default AccountForm;
