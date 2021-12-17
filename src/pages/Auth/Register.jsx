// import { yupResolver } from '@hookform/resolvers/yup';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Card, CardContent, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../helper';
// import * as yup from 'yup';
// import ButtonPrimary from '../../components/Buttons/ButtonPrimary.js';
// import { registerUser } from '../../redux/actions/auth.js';
// import { useStyles } from './styles.js';

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup
//     .string()
//     .required()
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
//       'Must Contain 8 Characters and One Number'
//     ),
//   passwordConfirm: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'password must match'),
// });

export default function Register(props) {
  // Redux
  const dispatch = useDispatch();
  // const registerUsers = (data) => dispatch(registerUser(data));
  const userGlobal = useSelector((state) => state.userGlobal);

  const [register, setRegister] = useState({
    dataUser: [],
    fullName: '',
    email: '',
    password: '',
  });

  // console.log(register.email);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setRegister({ ...register, [name]: value });
  };

  const registerBtnHandler = () => {
    fetch(`${API}/user/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: register.fullName,
        password: register.password,
        age: null,
        email: register.email,
        gender: null,
        birth_date: null,
        phone_number: null,
        image_path: null,
        is_admin: false,
        is_active: false,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        setRegister({ ...register, dataUser: data.user });
        dispatch({
          type: 'USER_LOGIN',
          payload: data.user,
        });
      });
  };

  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card variant="elevation" elevation={0} sx={{ borderRadius: 6 }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 4, bgcolor: '#3e9c99', width: 75, height: 75 }}>
              <SupervisorAccountOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register new account
            </Typography>
            <Box
              p={5}
              component="form"
              noValidate
              sx={{ width: 500 }}
              // onSubmit={handleSubmit(onRegister)}
            >
              <Typography fontWeight={400}>Full Name</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                size="small"
                name="fullName"
                onChange={inputHandler}
              />
              <Typography fontWeight={400}>Email</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                size="small"
                name="email"
                onChange={inputHandler}
              />
              <Typography>Password</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                size="small"
                name="password"
                type="password"
                onChange={inputHandler}
              />

              <Button
                variant="contained"
                color="success"
                className="mt-2 d-flex justify-content-center"
                onClick={registerBtnHandler}
              >
                Sign up
              </Button>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mt={4}
              >
                <Typography fontWeight={400}>
                  Already have an account?
                </Typography>
                <Link to="/login">
                  <Button className="text-decoration-none">Sign in</Button>
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
