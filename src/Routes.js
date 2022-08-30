import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import Login from './pages/Login';
// import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import CategoryDetails from "./AddCategory/Category-Details";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import AddTokenData from "./Admin/AddTokenData";
import AddProductData  from "./components/AddProductData";
import EditProductData  from "./components/EditProductData";
import PublishArt from "./components/PublishArt";
import PublishBulkArt from "./components/PublishBulkArt";

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
          children: [
            { path: "publishArt", element: <PublishArt /> },
            { path: "publishBulkArt", element: <PublishBulkArt /> },
            { path: "AddProductData", element: <AddProductData /> },
            { path: "EditProductData", element: <EditProductData /> },
          ]
         },
        { path: 'products', element: <Products /> },
        { path: 'Category', element: <Category /> },
        { path: 'SubCategory', element: <SubCategory /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    { path: "/category", element: <CategoryDetails /> },
    { path: "/EditProductData", element: <EditProductData /> },
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
