import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Avatar, CardContent, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import React, { useEffect } from 'react';

function Profile() {
  const userGlobal = useSelector((state) => state.userGlobal);

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    // window.location.reload();
  }, []);

  if (!userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Box display="flex">
        <Card
          variant="elevation"
          elevation={0}
          sx={{ width: 300, py: 4, borderRadius: 6, mt: 4 }}
        >
          <Avatar
            alt="Remy Sharp"
            src={userGlobal.image_data}
            sx={{ width: 150, height: 150, ml: 10 }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="center"
            >
              {userGlobal.full_name}
            </Typography>
            <Typography textAlign="center" color="GrayText">
              {userGlobal.email}
            </Typography>
            <Box px={4} mt={2}>
              <Box display="flex" justifyContent="space-between"></Box>
              <Box>
                <Typography color="GrayText">Birth Date:</Typography>
              </Box>
              <Box mb={2}>
                <Typography fontSize={14}>{userGlobal.birth_date}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Box>
                    <Typography color="GrayText">Gender</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography fontSize={14}>{userGlobal.gender}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography color="GrayText">Age</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography fontSize={14}>{userGlobal.age}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box px={4}>
              <Box
                component={Link}
                to={`/profile/edit/${userGlobal.id}`}
                sx={{ textDecoration: 'none' }}
              >
                <Button size="small" fullWidth>
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card
          variant="elevation"
          elevation={0}
          sx={{ width: 800, py: 4, borderRadius: 6, mt: 4, ml: 4 }}
        >
          <Box display="flex" p={4} px={8}>
            <Box sx={{ borderRadius: 6, width: 400 }}>
              <Box display="flex">
                <Avatar sx={{ bgcolor: '#3E9C99', width: 50, height: 55 }}>
                  <ReceiptOutlinedIcon />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  ml={2}
                >
                  <Typography>Joined from:</Typography>
                  <Typography fontWeight={500}>
                    {moment(userGlobal.created_at).format('MM/DD/YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ borderRadius: 6, width: 400 }}>
              <Box display="flex">
                <Avatar sx={{ bgcolor: '#3E9C99', width: 55, height: 55 }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  ml={2}
                >
                  <Typography>Contact Number:</Typography>
                  <Typography fontWeight={500}>
                    {userGlobal.phone_number}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box p={4} px={8}>
            <Typography variant="h5">Recent Bookings:</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            style={{ maxHeight: 450, overflow: 'auto' }}
            p={4}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  px={4}
                  pb={14}
                >
                  <Box p={4}>
                    <ShoppingCartOutlinedIcon
                      fontSize="large"
                      color="disabled"
                    />
                  </Box>
                  <Box
                    component={Link}
                    // to={`/transaction`}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button>View more</Button>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;
