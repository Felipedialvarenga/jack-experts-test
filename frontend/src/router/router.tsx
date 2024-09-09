import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import Layout from "../layout";
import ProtectedRoute from "./ProtectedRoute";
import TasksPage from "../pages/TasksPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><LoginPage/></Layout>
    },
    {
        path: '/create-account',
        element: <Layout><CreateAccountPage/></Layout>
    },
    {
        path: '/tasks',
        element: <ProtectedRoute><Layout><TasksPage/></Layout></ProtectedRoute>
    }
])
