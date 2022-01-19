import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AccountProfileDetails = ({ info }) => {
  const [values, setValues] = useState(null);
  const router = useRouter();


  if (!values && info && info.Fullname) {
    setValues({ ...info });
    console.log("#### info", info);

  }



  const handleChange = (event) => {
    setValues({
      ...values,
      Fullname: event.target.value
    });
    // tmp.Fullname = event.target.value;
    console.log("####", event);
  };


  const handleSaveDetails = () => {

    const postData = {
      Fullname: values.Fullname
    };

    axios.put(`http://localhost:3000/admin/${values.AdminID}`, postData).then((response) => {
      console.log("########", response);
      window.location.href = "./account";
    }).catch((error) => {
      console.log(error);
    })
  }
  return (

    <>
      {info ? <>
        <form
          autoComplete="off"
          noValidate
          {...info}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Full name"
                    name="fullName"
                    onChange={handleChange}
                    required
                    value={values ? values.Fullname : ""}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    required
                    value={values ? values.Email : ""}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleSaveDetails}
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>

      </> : <></>}
    </>

  );
};
