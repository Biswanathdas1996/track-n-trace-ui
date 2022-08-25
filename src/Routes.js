import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
// import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import CategoryDetails from "./AddCategory/Category-Details";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import AddTokenData from "./Admin/AddTokenData";
import AddProductData  from "./Admin/AddProductData";
import EditProductData  from "./Admin/EditProductData";
import PublishArt from "./Admin/PublishArt";
import PublishBulkArt from "./Admin/PublishBulkArt";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { 
          path: 'user', 
          element: <User />,
          // children: [] 
        },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    { path: "/category", element: <CategoryDetails /> },
    { path: "/publishArt", element: <PublishArt /> },
    { path: "/publishBulkArt", element: <PublishBulkArt /> },
    { path: "/EditProductData", element: <EditProductData /> },
    { path: "/AddProductData", element: <AddProductData /> },
    { path: "/add-tracking-data/:token", element: <AddTracking /> },
    { path: "/transctions/:token", element: <Transction /> },
    { path: "/add-token-data/:token", element: <AddTokenData /> },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        // { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}
