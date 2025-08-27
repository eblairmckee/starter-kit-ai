import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { PageDemo } from './page-demo';
import { RedPandaSignup } from './red-panda-signup';

export const demoRouter = createBrowserRouter([
  {
    path: '/',
    element: <DemoLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/red-panda-signup" replace />,
      },
      {
        path: 'page-demo',
        element: <PageDemo />,
      },
      {
        path: 'red-panda-signup',
        element: <RedPandaSignup />,
      },
    ],
  },
]);

function DemoLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
