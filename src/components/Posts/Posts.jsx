import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container } from '@material-ui/core';
import './posts.css';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container>
      <div
        className="list-group d-flex justify-content-center mb-4"
        style={{ marginBottom: '10%' }}
      >
        {posts.map((post) => (
          <div className="mb-4">
            <Link
              to={`/articledetail/${post.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="">
                {/* <div className="showcase-header">
                    <h3>{post.article_title}</h3>
                  </div> */}
                <div className="image_text_container">
                  <div className="showcase">
                    <img
                      src={post.image_data}
                      alt=""
                      style={{ width: '300px', height: '200px' }}
                    />
                  </div>
                  <div className="content_container">
                    <div className="showcase-header">
                      <h3>{post.article_title}</h3>
                    </div>
                    <h6>
                      <b>{post.article_category}</b>
                    </h6>
                    <h6>{post.content_desc}</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Posts;

// const fetchArticlesData = () => {
//   fetch(`${API}/articles?page=${pagination}`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       setArticles({ ...articles, articlesData: data.data });
//       setLoading(false);
//     });
// };

// const mainArticle = () => {
//   if (isLoading) {
//     return (
//       <div>
//         <h2>Loading</h2>
//       </div>
//     );
//   } else if (!isLoading) {
//     return articles.articlesData.map((article) => {
//       if (article.main_article === true) {
//         return (
//           <div className="container">
//             <div className="content">
//               <div className="showcase-header">
//                 <img
//                   className="showcase_main"
//                   src={article.image_data}
//                   alt=""
//                 />
//               </div>
//               <div className="showcase_header">
//                 <h2>{article.article_title}</h2>
//               </div>
//             </div>
//           </div>
//         );
//       }
//     });
//   }
// };

// const renderArticles = () => {
//   if (isLoading) {
//     return (
//       <div>
//         <h2>Loading...</h2>
//       </div>
//     );
//   } else if (!isLoading) {
//     return articles.articlesData.map((article) => {
//       if (
//         (article.main_article === null) |
//         (article.main_article === false)
//       ) {
//         return (
//           <div>
//             <Link
//               to={`/articledetail/${article.id}`}
//               style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <div className="container">
//                 <div className="content">
//                   <div className="showcase-header">
//                     <h3>{article.article_title}</h3>
//                   </div>
//                   <div className="image_text_container">
//                     <div className="showcase">
//                       <img
//                         src={article.image_data}
//                         alt=""
//                         style={{ width: '300px', height: '200px' }}
//                       />
//                     </div>
//                     <div className="content">
//                       <h6>
//                         <b>{article.article_category}</b>
//                       </h6>
//                       <h6>{article.content_desc}</h6>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       }
//     });
//   }
// };
