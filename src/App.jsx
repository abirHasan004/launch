import { Suspense, lazy, useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import HomePage from './Screens/HomePage.jsx';
import {PaymentCancel,PaymentSuccess} from './components/StripePaymentInfro.jsx'
const LazyBusinessForm = lazy(() => import('./Screens/BusinessForm.jsx'));
import Footer from './components/Footer.jsx'
import { CircularProgress, Box } from '@mui/material';
import AdminRoute from './lib/AdminRoute.jsx';
import AdminLogin from '../src/components/AdminLoginPage.jsx'
import AdminPanle from './components/AdminPanel.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Loader = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/business-form"
        element={
          <Suspense fallback={<Loader />}>
            <LazyBusinessForm />
          </Suspense>
        }
      />

      <Route
        path="/success"
        element={
          <Suspense fallback={<Loader />}>
            <>
              <PaymentSuccess />
              <Footer />
            </>
          </Suspense>
        }
      />

      <Route
        path="/cancel"
        element={
          <Suspense fallback={<Loader />}>
            <>
              <PaymentCancel />
              <Footer />
            </>
          </Suspense>
        }
      />

      
      <Route path="/admin-login" element={<AdminLogin />} />

     
      <Route element={<AdminRoute />}>
        <Route path="/admin-panel" element={<AdminPanle />} />
      </Route>
    </>
  )
);

function App() {
  const [count, setCount] = useState(0);
  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  ) 
}

export default App;
