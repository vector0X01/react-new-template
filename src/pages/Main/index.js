import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { selectAuth, authenticate } from '../../redux/slice/authSlice';
import { selectLoader } from '../../redux/slice/loaderSlice';
import Layout from './Layout';
import AuthLayout from '../Auth/AuthLayout';
import Loader from '../../components/Loader/Loader';
import { getUser, selectUser, getUserMenu } from '../../redux/slice/userSlice';

const Login = lazy(() => import('../Auth/Login'));
const ForgotPassword = lazy(() => import('../Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../Auth/ResetPassword'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));
const ClientsList = lazy(() => import('../Clients/ClientsList'));
const LocationsList = lazy(() => import('../Locations/LocationsList'));
const ProjectsList = lazy(() => import('../Projects/ProjectsList'));

const Main = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(selectAuth);
  const { loading } = useSelector(selectLoader);
  const token = localStorage.getItem('pd-token');

  useEffect(() => {
    const token = localStorage.getItem('pd-token');
    if (token) {
      // dispatch(getUser());
      dispatch(authenticate(true));
    }
  }, []);

  if (!token)
    return (
      <Router>
        <AuthLayout>
          {loading ? (
            <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Loader />
            </Backdrop>
          ) : null}
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route path="/forgot-password" exact element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Suspense>
        </AuthLayout>
      </Router>
    );

  return (
    <Router>
      <Layout>
        {loading ? (
          <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Loader />
          </Backdrop>
        ) : null}
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/clients" exact element={<ClientsList />} />
            <Route path="/locations" exact element={<LocationsList />} />
            <Route path="/projects" exact element={<ProjectsList />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default Main;
