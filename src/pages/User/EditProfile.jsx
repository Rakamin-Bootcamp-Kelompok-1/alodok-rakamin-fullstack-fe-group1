import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { Button, Box, Card, TextField, Container } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../../helper';

function EditProfile() {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [editUser, setEditUser] = useState({
    editid: userGlobal.id,
    editUserEmail: userGlobal.email,
    editUserFullname: userGlobal.full_name,
    editUserGender: userGlobal.gender,
    editUserAge: userGlobal.age,
    editUserPhoneNumber: userGlobal.phone_number,
  });

  const saveBtnHandler = () => {
    Axios.patch(`${API}/user/update/${userGlobal.id}`, {
      email: editUser.editUserEmail,
      full_name: editUser.editUserFullname,
      birth_date: editUser.editUserBirthDate,
      phone_number: editUser.editUserPhoneNumber,
      gender: editUser.editUserGender,
      age: editUser.editUserAge,
    })
      .then((res) => {
        alert('Your Profile has successfully been updated');
        // getSession();
      })
      .catch(() => {
        alert(`Terjadi Kesalahan`);
      });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  useEffect(() => {
    // getSession();
  }, []);

  if (!userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <div className="m-5">
        <div>
          <div className="m-2">
            <h2>Edit Profile</h2>
            <hr />
          </div>
          <div className="d-flex flex-row">
            <div className="m-4">
              <img
                id="imgpreview"
                src={userGlobal.image_data}
                alt=""
                width="150px"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="editUserFullname" className="text-xl-left mb-2">
                  Full Name
                </label>
                <TextField
                  variant="standard"
                  defaultValue={userGlobal.full_name}
                  onChange={inputHandler}
                  name="editUserFullname"
                  type="text"
                  id="editUserFullname"
                  placeholder="Fullname"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <label htmlFor="editUserEmail" className="text-xl-left mb-2">
                  Email
                </label>
                <TextField
                  variant="standard"
                  defaultValue={userGlobal.email}
                  onChange={inputHandler}
                  name="editUserEmail"
                  type="email"
                  id="editUserEmail"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <label htmlFor="editUserEmail" className="text-xl-left mb-2">
                  Birth Date
                </label>
                <TextField
                  variant="standard"
                  defaultValue={userGlobal.birth_date}
                  onChange={inputHandler}
                  name="editUserBirthDate"
                  type="email"
                  id="editUserBirthDate"
                  placeholder="29, December 1997"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <label
                  htmlFor="editUserPhoneNumber"
                  className="text-xl-left mb-2"
                >
                  Phone Number
                </label>
                <TextField
                  variant="standard"
                  defaultValue={userGlobal.phone_number}
                  onChange={inputHandler}
                  name="editUserPhoneNumber"
                  type="text"
                  id="editUserPhoneNumber"
                  placeholder="Phone Number"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <label htmlFor="editUserGender" className="text-xl-left mb-2">
                  Gender
                </label>
                <select
                  defaultValue={userGlobal.gender}
                  onChange={inputHandler}
                  name="editUserGender"
                  type="text"
                  id="gender"
                  className="form-control"
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                </select>
              </div>
              <br />
              <div>
                <label htmlFor="editUserAge" className="text-xl-left mb-2">
                  Age
                </label>
                <TextField
                  variant="standard"
                  defaultValue={userGlobal.age}
                  onChange={inputHandler}
                  name="editUserAge"
                  type="number"
                  id="age"
                  placeholder="Age"
                  className="form-control"
                />
              </div>
              <br />
              <div></div>
            </div>
          </div>
          <div className="modal-footer">
            <Box type="button" onClick={saveBtnHandler}>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
            <Box
              component={Link}
              to={`/profile/${userGlobal.email}`}
              sx={{ textDecoration: 'none' }}
            >
              <Button variant="contained">Back</Button>
            </Box>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
