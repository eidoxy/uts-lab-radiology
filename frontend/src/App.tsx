import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import Login from './pages/Authentication/Login';
import Loader from './common/Loader';
import { routes } from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login user={'admin'} />} />
        <Route index element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login user="admin" />} />
        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route element={<DefaultLayout />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        {/* </Route> */}
        {/* End Protected Routes */}
        {/* End Admin Routes */}
      </Routes>
    </>
  );
}

export default App;
