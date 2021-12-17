import React, { useState, useEffect } from 'react';
import { API } from '../../helper';
import './doctors.css';
import { Paper, IconButton, InputBase, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import axios from 'axios';
import DoctorsPage from '../../components/DoctorsPage/DoctorsPage';
import Pagination from '../../components/Pagination/Pagination';

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #80cee1;
  width: 336px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  padding: 5% 1% 30%;
  border-radius: 5%;
  opacity: 0.9;
  top: 200px;
  left: 0;
  transition: 350ms;
  z-index: 1;
`;

const Doctors = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`${API}/doctors?per_page=100`);
      setPosts(res.data.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page Handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Nav>
        <SidebarNav>
          <label htmlFor="searchProductCategory" className="text-white mb-2">
            Article Category
          </label>
          <select
            // onChange={inputHandler}
            name="searchProductCategory"
            className="form-control"
          >
            <option value="">All Items</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Kecantikan">Kecantikan</option>
            <option value="Diet">Diet</option>
            <option value="Bayi">Bayi</option>
            <option value="Mata">Mata</option>
          </select>
          <button
            // onClick={searchBtnHandler}
            className="btn btn-primary my-3 button-search col-12"
          >
            Search
          </button>
          <div className="mt-3">
            <div className="d-flex justify-content-center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
              />
            </div>
          </div>
        </SidebarNav>
      </Nav>
      <div className="search_container">
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '80%',
            height: '70px',
            borderRadius: '25px',
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search doctor, speciality, or hospital"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </Paper>
      </div>
      <div className="">
        <Grid
          justifyContent="center"
          style={{
            width: '100%',
            margin: '20px',
            marginTop: '20px',
            marginLeft: '30%',
            height: '95vh',
            overflow: 'scroll',
            scrollBehavior: 'smooth',
          }}
        >
          <div>
            <DoctorsPage posts={currentPost} loading={loading} />
          </div>
        </Grid>
        ;
      </div>
    </>
  );
};

export default Doctors;
