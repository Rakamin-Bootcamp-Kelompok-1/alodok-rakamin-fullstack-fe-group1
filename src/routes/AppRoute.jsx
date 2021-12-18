import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// NAVBAR
import Layout from '../components/Layout';

// Footer
import Footer from '../components/Footer/Footer';

// PAGES
import {
  AdminDashboard,
  AdminArticles,
  AdminArticlesDetail,
  Articles,
  ArticleDetail,
  Doctors,
  DoctorDetails,
  Home,
  Login,
  Register,
  Profile,
  ForgotPassword,
  EditProfile,
} from '../pages';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/doctordetails/:id" component={DoctorDetails} />
          <Route path="/articles" component={Articles} />
          <Route path="/articledetail/:id" component={ArticleDetail} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/admin-articles" component={AdminArticles} />
          <Route path="/profile/edit/:id" component={EditProfile} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route
            path="admin-articles-detail/:id_articles"
            component={AdminArticlesDetail}
          />
          <Route path="/profile/:email" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoute;
