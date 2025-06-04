import { Suspense, lazy, useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';
import HomePage from './Screens/HomePage.jsx';

const LazyBusinessForm = lazy(() => import('./Screens/BusinessForm.jsx'));

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
      /></>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
