import { API } from '../../helper';
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import './articledetail.css';

const ArticleDetail = (props) => {
  const [article, setArticle] = useState({
    articleData: {},
  });
  console.log(article.articleData);

  const fetchArticle = () => {
    const articleId = props.match.params.id;
    axios
      .get(`${API}/article/${articleId}`)
      .then((response) => {
        setArticle({ articleData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="product_detail_container">
      <Grid>
        <div className="d-flex justify-content-center">
          <h2 className="mt-4 mx-4">{article.articleData.article_title}</h2>
        </div>

        <Container>
          <img
            className="image_container"
            src={article.articleData.image_data}
            alt=""
          />
        </Container>
        <br />
        <br />
      </Grid>
      <Grid>
        <Container>
          <div className="product_container">
            <Container>
              <p>
                <b>Category: </b>
              </p>
              <h3 className="">{article.articleData.article_category}</h3>
            </Container>
            <hr />
            <Container>
              <h6 style={{ textAlign: 'justify' }}>
                <strong>Product Description</strong>:<br></br>
                <br></br>
                {article.articleData.content_desc}
              </h6>
              <br></br>
              <hr />
            </Container>
          </div>
        </Container>
      </Grid>
    </div>
  );
};

export default ArticleDetail;
