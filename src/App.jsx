import Login from '../components/login'
import Signup from '../components/signup'
import Dashboard from '../components/dashboard';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
