import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Tokens from './pages/Tokens';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import Login from './pages/Login';
// import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Distributer from './pages/Distributer';
import Retailer from './pages/Retailer';

import CategoryDetails from "./AddCategory/Category-Details";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import AddTokenData from "./components/AddTokenData";
import AddProductData  from "./components/AddProductData";
import EditProductData  from "./components/EditProductData";
import PublishArt from "./components/PublishArt";
import PublishBulkArt from "./components/PublishBulkArt";
import TokensTable from "./components/TokensTable";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { 
          path: 'tokens', 
          element: <Tokens />,
          children: [
            { path: "TokensTable", element: <TokensTable /> },
            { path: "PublishArt", element: <PublishArt /> },
            { path: "PublishBulkArt", element: <PublishBulkArt /> },
            { path: "add-token-data/:token", element: <AddTokenData /> },
            { path: 'Distributer', element: <Distributer />  },
            { path: 'Retailer', element: <Retailer />  },
          ]
         },
        { 
          path: 'products', 
          element: <Products />,
          children: [
            { path: "AddProductData", element: <AddProductData /> },
            { path: "EditProductData", element: <EditProductData /> },
          ]
        },
        { path: 'Category', element: <Category /> },
        { path: 'SubCategory', element: <SubCategory /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    { path: "/category", element: <CategoryDetails /> },
    { path: "/add-tracking-data/:token", element: <AddTracking /> },
    { path: "/transctions/:token", element: <Transction /> },
    // { path: "/add-token-data/:token", element: <AddTokenData /> },
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
