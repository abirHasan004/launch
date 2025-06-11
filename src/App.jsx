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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<HomePage />}>
    
    </Route>   
    <Route
        path="/business-form"
        element={
          <Suspense fallback={<div>Loading form...</div>}>
            <LazyBusinessForm />
          </Suspense>
        }
      />
       <Route
        path="/success"
        element={
          <Suspense fallback={<div>Loading form...</div>}>
            <PaymentSuccess />
            <Footer/>
          </Suspense>
        }
      />
        <Route
        path="/cancel"
        element={
          <Suspense fallback={<div>Loading form...</div>}>
            <PaymentCancel />
            <Footer/>
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
