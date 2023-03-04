import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { UserContextProvider } from './components/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Create from './components/Create';
import Home from './components/Home';
import SingleStory from './pages/SingleStory';
import Login from './pages/Login';
import Register from './pages/Register';
import Stories from './components/Stories';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/create', element: <Create /> },
      { path: '/story/:id', element: <SingleStory /> },
      { path: '/stories', element: <Stories /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
