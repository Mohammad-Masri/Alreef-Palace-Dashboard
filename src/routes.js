import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import NotFound from './pages/Page404';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

import LoginPage from './views/Auth/LoginPage/LoginPage';
// Employee
import AllEmployeesPage from './views/Employee/AllEmployeesPage';
import CreateNewEmployeePage from './views/Employee/CreateNewEmployeePage';
import EditEmployeePage from './views/Employee/EditEmployeePage';
import ShowEmployeeDetails from './views/Employee/ShowEmployeeDetails';
// // Employee Payment
import AllEmployeePayments from './views/Employee/EmployeePayment/AllEmployeePayments';
import CreateNewEmployeePayment from './views/Employee/EmployeePayment/CreateNewEmployeePayment';
import EditEmployeePaymentPage from './views/Employee/EmployeePayment/EditEmployeePaymentPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Dashboard /> },
        { path: 'employee', element: <AllEmployeesPage /> },
        { path: 'employee/create', element: <CreateNewEmployeePage /> },
        { path: 'employee/edit/:id', element: <EditEmployeePage /> },
        { path: 'employee/show/:id', element: <ShowEmployeeDetails /> },
        { path: 'employee/:employee_id/employee-payment', element: <AllEmployeePayments /> },
        { path: 'employee/:employee_id/employee-payment/create', element: <CreateNewEmployeePayment /> },
        {
          path: 'employee/:employee_id/employee-payment/edit/:employee_payment_id',
          element: <EditEmployeePaymentPage />,
        },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <LoginPage /> },

        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
