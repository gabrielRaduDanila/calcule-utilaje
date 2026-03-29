import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LungimeCadaPage from './pages/LungimeCadaPage';
import LatimeCadaPage from './pages/LatimeCadaPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import InaltimeCadaPage from './pages/InaltimeCadaPage';
import BilantTermicPage from './pages/BilantTermicPage';
import FulardLungimePage from './pages/FulardLungimePage';
import FulardInaltimePage from './pages/FulardInaltimePage';
import FulardLatimePage from './pages/FulardLatimePage';
import FulardPuterePage from './pages/FulardPuterePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'lungime-cada',
        element: <LungimeCadaPage />,
      },
      {
        path: 'latime-cada',
        element: <LatimeCadaPage />,
      },
      {
        path: 'inaltime-cada',
        element: <InaltimeCadaPage />,
      },
      {
        path: 'bilant-termic',
        element: <BilantTermicPage />,
      },
      {
        path: 'fulard-lungime-cada',
        element: <FulardLungimePage />,
      },
      {
        path: 'fulard-inaltime-cada',
        element: <FulardInaltimePage />,
      },
      {
        path: 'fulard-latime-cada',
        element: <FulardLatimePage />,
      },
      {
        path: 'fulard-putere-motor',
        element: <FulardPuterePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
