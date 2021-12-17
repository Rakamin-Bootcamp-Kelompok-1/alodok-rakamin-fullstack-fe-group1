import { API } from '../../helper';
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Divider } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './doctordetail.css';

const DoctorDetail = (props) => {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [doctor, setDoctor] = useState({
    doctorData: {},
  });

  const [doctorSchedule, setDoctorSchedule] = useState({
    doctorSchedules: [],
  });
  console.log(doctorSchedule.doctorSchedules);

  const renderSchedule = () => {
    const schedule = [...doctorSchedule.doctorSchedules];

    return schedule.map((sche) => {
      return (
        <Card style={{ marginBottom: '40px' }}>
          <CardContent>
            <div className="">
              <div className="image_text_container">
                <Divider
                  orientation="vertical"
                  style={{ color: 'black', height: '20px' }}
                />
                <div className="content">
                  <p>
                    <b>Day:</b>
                  </p>
                  <h6>{sche.day}</h6>
                  <p>
                    <b>Date:</b>
                  </p>
                  <h6>
                    {sche.date}, {sche.month}, {sche.year}
                  </h6>
                  <p>
                    <b>Time:</b>
                  </p>
                  <h6>{sche.time_practice}</h6>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorId = props.match.params.id;
      const response = await axios.get(`${API}/doctor/${doctorId}`);
      setDoctor({ doctorData: response.data });
    };

    const fetchDoctorSchedule = async () => {
      const doctorId = props.match.params.id;
      const res = await axios.post(`${API}/schedule/doctor`, {
        doctor_id: doctorId,
      });
      setDoctorSchedule({
        ...doctorSchedule,
        doctorSchedules: res.data.data,
      });
    };

    fetchDoctorSchedule();

    fetchDoctor();
  }, []);

  if (!userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="product_detail_container">
        <Grid xs={5}>
          <Container>
            <img
              className="image_container"
              src={doctor.doctorData.image_path}
              alt=""
              style={{ borderRadius: '50%' }}
            />
          </Container>
          <br />
          <br />
        </Grid>
        <Grid>
          <Container>
            <div className="product_container">
              <div className="mt-4">
                <h2>
                  <strong>About Doctors:</strong>
                </h2>
                <br></br>
                <p>
                  <strong>Doctor's Name: </strong>
                </p>
                <h4>{doctor.doctorData.doctor_name}</h4>
                <hr />
                <p>
                  <strong>Speciality: </strong>
                </p>
                <h3>{doctor.doctorData.speciality}</h3>
                <br></br>
                <hr />
                <p>
                  <strong>Biography: </strong>
                </p>
                {doctor.doctorData.biography}
                <br></br>
                <br></br>
                <p>
                  <strong>Location practice: </strong>
                </p>
                {doctor.doctorData.location_practice}
                <br></br>
                <br></br>
                <hr />
                <p>
                  <strong>Education: </strong>
                </p>
                {doctor.doctorData.education}
                <br></br>
                <br></br>
                <hr />
                <p>
                  <strong>Consultation starting from: </strong>
                </p>
                Rp. {doctor.doctorData.price_rate}
                <br></br>
                <hr />
              </div>
            </div>
          </Container>
          <div className="schedule_container" style={{ marginTop: '10px' }}>
            <div>
              <h3>Doctor Schedules: </h3>
            </div>
            <div>{renderSchedule()}</div>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default DoctorDetail;
