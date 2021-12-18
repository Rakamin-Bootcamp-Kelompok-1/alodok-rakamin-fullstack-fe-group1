import React, { useState, useEffect } from 'react';
import { API } from '../../helper';
import './articles.css';
import { Paper, IconButton, InputBase, Grid, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import axios from 'axios';
import Posts from '../../components/Posts/Posts';
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

const Articles = () => {
  const [posts, setPosts] = useState({
    filteredArticles: [],
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // const [productsFilter, setProductsFilter] = useState({
  //   filteredProducts: [],
  // });

  const [search, setSearch] = useState({
    searchArticles: '',
  });

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/articles?per_page=100`);
    setPosts({ filteredArticles: res.data.data });
    setLoading(false);
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSearch({ ...search, [name]: value });
  };
  console.log(search);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.filteredArticles.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change Page Handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const searchBtnHandler = () => {
  //   const filteredArticles = posts.filteredArticles.filter((val) => {
  //     return val.article_title.includes(search.searchArticles);
  //   });
  //   setPosts({ ...posts, filteredArticles });
  // };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Nav>
        <SidebarNav>
          <label htmlFor="searchProductCategory" className="text-white mb-2">
            Article Category
          </label>
          <select name="searchProductCategory" className="form-control">
            <option value="">All Items</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Kecantikan">Kecantikan</option>
            <option value="Hidup Sehat">Hidup Sehat</option>
          </select>
          <button className="btn btn-primary my-3 button-search col-12">
            Search
          </button>
          <div className="mt-3">
            <div className="d-flex justify-content-center">
              <Pagination
                name="pagination"
                postsPerPage={postsPerPage}
                totalPosts={posts.filteredArticles.length}
                paginate={paginate}
              />
            </div>
          </div>
        </SidebarNav>
      </Nav>
      <div className="">
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
            <IconButton
              // onClick={searchBtnHandler}
              sx={{ p: '10px' }}
              aria-label="menu"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search article title"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={inputHandler}
              name="searchArticles"
            />
          </Paper>
        </div>
        <div className="">
          <Grid
            justifyContent="center"
            style={{
              marginLeft: 'auto',
              width: '100%',
              marginTop: '5%',
              height: '95vh',
              paddingRight: '40%',
              overflow: 'scroll',
              scrollBehavior: 'smooth',
            }}
          >
            <Container
              className="mb-4 d-flex justify-content-center"
              style={{ marginLeft: '30%' }}
            >
              <Posts posts={currentPost} loading={loading} />
            </Container>
            <div></div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Articles;
