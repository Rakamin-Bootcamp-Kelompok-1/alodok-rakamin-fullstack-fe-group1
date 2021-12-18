import React, { useState, useEffect } from 'react';
import { Container, Card, Grid, Button } from '@material-ui/core';
import styled from 'styled-components';
import doctor_one from '../../assets/images/doctors.jpeg';
import { Link } from 'react-router-dom';
import { API } from '../../helper';
import './homestyles.css';

// const Nav = styled.div`
//   align-items: center;
// `;

const MainContainer = styled.nav`
  background: #80cee1;
  width: 100%;
  height: 56vh;
  top: 50px;
  transition: 350ms;
  box-shadow: 5px #888888;
`;
const Home = () => {
  const [articles, setArticles] = useState({
    articlesData: [],
  });

  const loadArticles = () => {
    fetch(`${API}/articles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setArticles({ ...articles, articlesData: data.data });
      });
  };

  const renderMainArticle = () => {
    const rawData = [...articles.articlesData];

    return rawData.map((article) => {
      if (article.main_article === true) {
        return (
          <Card
            className="list-group mb-4 p-4"
            style={{
              width: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}
          >
            <Link
              to={`/articledetail/${article.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="">
                <div className="">
                  {/* <div className="mb-4">
                    <h3>{article.article_title}</h3>
                  </div> */}
                  <div className="">
                    <div className="">
                      <img
                        src={article.image_data}
                        alt=""
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div className="">
                      <div className="">
                        <h3>{article.article_title}</h3>
                      </div>
                      <h6>
                        <b>{article.article_category}</b>
                      </h6>
                      <h6>{article.content_desc}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        );
      }
    });
  };

  const renderArticles = () => {
    const rawData = [...articles.articlesData];

    return rawData.map((article) => {
      if (article.main_article === false) {
        return (
          <Card className="list-group mb-4 p-4">
            <Link
              to={`/articledetail/${article.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="">
                <div className="">
                  <div className="image_text_container">
                    <div className="showcase">
                      <img
                        src={article.image_data}
                        alt=""
                        style={{ width: '400px', height: '300px' }}
                      />
                    </div>
                    <div className="content">
                      <div className="showcase-header">
                        <h3>{article.article_title}</h3>
                      </div>
                      <h6>
                        <b>{article.article_category}</b>
                      </h6>
                      <h6>{article.content_desc}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        );
      }
    });
  };

  // const loadDoctors = () => {
  //   fetch(`${API}/doctors`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setDoctors({ ...doctors, doctorData: data.data });
  //     });
  // };

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
  //             <div className="">
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
  //                     style={{
  //                       color: 'black',
  //                       height: '200px',
  //                       marginRight: '20px',
  //                     }}
  //                   />
  //                   <div className="content">
  //                     <h3>{doctor.doctor_name}</h3>
  //                     <p>
  //                       <b>Doctor Speciality:</b>
  //                     </p>
  //                     <h6>{doctor.speciality}</h6>
  //                     {/* <h6>{post.biography}</h6> */}
  //                     <p>
  //                       <b>Location practice:</b>
  //                     </p>
  //                     <h6>{doctor.location_practice}</h6>
  //                     <p>
  //                       <b>Consultation Price starting from:</b>
  //                     </p>
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

  useEffect(() => {
    loadArticles();
    // loadDoctors();
  }, []);

  return (
    <>
      <MainContainer>
        <div className="p-4">
          <img className="earth_img" src={doctor_one} alt="" />
        </div>
        <Container className="h1_main">
          <h1 className="h1_yoyo ">MEDIKUY</h1>
          <Button
            className="text-white m-2"
            variant="contained"
            component={Link}
            color="primary"
            to="/articles"
          >
            Search Articles
          </Button>
          <Button
            component={Link}
            className="text-white"
            variant="outline"
            style={{ background: 'green' }}
            to="/doctors"
          >
            Search Doctors
          </Button>
        </Container>
      </MainContainer>

      <div className="main_article_container">
        <div className="mt-4">
          <h1 className="mb-4">Artikel Kesehatan terkini untuk anda</h1>
          <hr />
          <Container
            component={Link}
            to="/articles"
            className="d-flex flex-row article_category"
          >
            <Button component={Link} to="/articles" className="h6_main">
              Hidup Sehat
            </Button>
            <Button component={Link} to="/articles" className="h6_main">
              Kesehatan
            </Button>
            <Button component={Link} to="/articles" className="h6_main">
              Kecantikan
            </Button>
            <Button component={Link} to="/articles" className="h6_main">
              Hidup Sehat
            </Button>
          </Container>
          <hr />
        </div>

        <Grid>
          {renderMainArticle()}
          <Grid>
            <div className="article_container">{renderArticles()}</div>
            {/* <div className="second_container"> */}

            {/* <Container>{renderDoctor()}</Container> */}
            {/* </div> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
