import { useState } from 'react';
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

export const AccountProfileDetails = ({profile, departs, props}) => {
  const [values, setValues] = useState(profile);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can not be edited"
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
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Fullname"
                name="FullName"
                onChange={handleChange}
                required
                value={values.FullName}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Employee Code"
                name="EmployeeCode"
                onChange={handleChange}
                required
                value={values.EmployeeCode}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            
            <Grid
              item
              md={7}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="Email"
                onChange={handleChange}
                required
                value={values.Email}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="Tel"
                onChange={handleChange}
                required
                type="number"
                value={values.Tel}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Entry Date"
                name="EntryDate"
                onChange={handleChange}
                required
                value={values.EntryDate}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Department"
                name="DepartmentID"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.DepartmentID}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              >
                {departs.map((dep) => (
                  <option
                    key={dep.DepartmentID}
                    value={dep.DepartmentID}
                  >
                    {dep.DepartmentName}
                  </option>
                ))}
              </TextField>
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
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
