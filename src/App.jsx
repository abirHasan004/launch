import { Suspense, lazy, useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';
import HomePage from './Screens/HomePage.jsx';
import {PaymentCancel,PaymentSuccess} from './components/StripePaymentInfro.jsx'
const LazyBusinessForm = lazy(() => import('./Screens/BusinessForm.jsx'));
import Footer from './components/Footer.jsx'
import { CircularProgress, Box } from '@mui/material';
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
    </>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
