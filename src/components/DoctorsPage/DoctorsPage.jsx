import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Card, CardContent } from '@mui/material';
import './doctorspage.css';

const Doctors = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <Card sx={{ maxWidth: 1000 }} style={{ marginBottom: '40px' }}>
          <CardContent>
            <Link
              to={`/doctordetails/${post.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="">
                <div className="">
                  <div className="image_text_container">
                    <div className="showcase">
                      <img
                        src={post.image_path}
                        alt=""
                        style={{
                          borderRadius: '50%',
                          width: '150px',
                          height: '150px',
                        }}
                      />
                    </div>
                    <Divider
                      orientation="vertical"
                      style={{
                        color: 'black',
                        height: '200px',
                        marginRight: '20px',
                      }}
                    />
                    <div className="content">
                      <h3>{post.doctor_name}</h3>
                      <p>
                        <b>Doctor Speciality:</b>
                      </p>
                      <h6>{post.speciality}</h6>
                      {/* <h6>{post.biography}</h6> */}
                      <p>
                        <b>Location practice:</b>
                      </p>
                      <h6>{post.location_practice}</h6>
                      <p>
                        <b>Consultation Price starting from:</b>
                      </p>
                      <h6>Rp. {post.price_rate}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
};

export default Doctors;

// const renderDoctor = () => {
//   const rawData = [...doctors.doctorData];

//   return rawData.map((doctor) => {
//     return (
//       <Card sx={{ maxWidth: 1000 }} style={{ marginBottom: '40px' }}>
//         <CardContent>
//           <Link
//             to={`/doctordetails/${doctor.id}`}
//             style={{ textDecoration: 'none', color: 'inherit' }}
//           >
//             <div className="container ">
//               <div className="">
//                 <div className="image_text_container">
//                   <div className="showcase">
//                     <img
//                       src={doctor.image_path}
//                       alt=""
//                       style={{
//                         borderRadius: '50%',
//                         width: '150px',
//                         height: '150px',
//                       }}
//                     />
//                   </div>
//                   <Divider
//                     orientation="vertical"
//                     style={{ color: 'black', height: '200px' }}
//                   />
//                   <div className="content">
//                     <h3>{doctor.doctor_name}</h3>
//                     <h6>
//                       <b>{doctor.speciality}</b>
//                     </h6>
//                     <p>Location practice:</p>
//                     <h6>{doctor.location_practice}</h6>
//                     <br />
//                     <br />
//                     <p>Consultation Price starting from:</p>
//                     <h6>Rp. {doctor.price_rate}</h6>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </CardContent>
//       </Card>
//     );
//   });
// };
