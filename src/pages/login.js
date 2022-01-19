import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
const Login = () => {
  const router = useRouter();
  const parseJwt = (token) =>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      userID: Yup
        .string()
        .max(255)
        .required(
          'UserID is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: async (values) => {
      const postData = {
        username: values.userID,
        password: values.password,
      };
      axios.post("http://localhost:3000/login", postData).then((response) =>{
        console.log(response);
        localStorage.setItem('adminToken', response.data.token);

        router.push('/');

      }).catch((error) => {
        alert("Please check your credentials and try again");
      });
    }
  });

  return (
    <>
      <Head>
        <title>Login | Cloud9</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              
            
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Sign in to start your session
              </Typography>
            </Box>
            <TextField
              required
              fullWidth
              label="UserID"
              margin="normal"
              name="userID"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              variant="outlined"
            />
            <TextField
              required
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
              align = "center"
            >
              <p class="small">
	              Version 0.4.0
		            Copyright &copy; 2016-2021 <a target="_blank" href="https://www.cloud9-solutions.com">Cloud Nine Solutions Company</a>		</p>

            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
