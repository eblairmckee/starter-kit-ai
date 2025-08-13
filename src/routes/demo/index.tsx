import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import CreateDedicatedCluster from './create-dedicated-cluster';
import { PageDemo } from './page-demo';

export const demoRouter = createBrowserRouter([
  {
    path: '/',
    element: <DemoLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/page-demo" replace />,
      },
      {
        path: 'page-demo',
        element: <PageDemo />,
      },
    ],
  },
  {
    path: 'create-dedicated-cluster',
    element: <CreateDedicatedCluster />,
  },
]);

function DemoLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
