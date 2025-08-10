import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayouts from "../layouts/HomeLayouts/HomeLayouts";
import Home from "../pages/Home/Home";
import LoginLayouts from "../layouts/LoginLayouts/LoginLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AllArtifacts from "../pages/AllArtifacts/AllArtifacts";
import PrivateRoute from "../provider/PrivateRoute";
import AddArtifacts from "../pages/AddArtifacts/AddArtifacts";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import MyArtifactsRoute from "../pages/MyArtifactsRoute/MyArtifactsRoute";
import LikedArtifactsRoute from "../pages/LikedArtifactsRoute/LikedArtifactsRoute";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import UpdateMyArtifact from "../pages/MyArtifactsRoute/UpdateMyArtifact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Loading from "../components/Loading/Loading";
import AboutUs from "../pages/AddArtifacts/AboutUs/AboutUs";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayouts,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                Component: Home,
                errorElement: <ErrorPage />,
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch(`https://artileaf-server.vercel.app/artifacts/top-liked`)
            },
            {
                path: '/allArtifacts',
                Component: AllArtifacts,
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch(`https://artileaf-server.vercel.app/artifacts`)
            },
            {
                path: '/artifactDetails/:id',
                element: <PrivateRoute><ArtifactDetails></ArtifactDetails></PrivateRoute>,
                hydrateFallbackElement: <Loading></Loading>,
                loader: ({ params }) => fetch(`https://artileaf-server.vercel.app/artifacts/${params.id}`)
            },
            {
                path: '/addArtifacts',
                element: <PrivateRoute><AddArtifacts></AddArtifacts></PrivateRoute>
            },
            {
                path: '/myArtifactsRoute',
                element: <PrivateRoute><MyArtifactsRoute></MyArtifactsRoute></PrivateRoute>
            },
            {
                path: '/updateMyArtifact/:id',
                element: <PrivateRoute><UpdateMyArtifact></UpdateMyArtifact></PrivateRoute>,
                hydrateFallbackElement: <Loading></Loading>,
                loader: ({ params }) => fetch(`https://artileaf-server.vercel.app/artifacts/${params.id}`)
            },
            {
                path: '/likedArtifactsRoute',
                element: <PrivateRoute><LikedArtifactsRoute></LikedArtifactsRoute></PrivateRoute>
            },
            {
                path: '/editProfile',
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            }
        ]
    },
    {
        path: "login",
        Component: LoginLayouts,
        children: [
            {
                index: true,
                Component: Login
            },
            {
                path: "/login/register",
                Component: Register
            },
            {
                path: "/login/forgotPassword",
                Component: ForgotPassword
            }
        ]
    },
    {
        path: "/*",
        hydrateFallbackElement: <Loading></Loading>,
        element: <ErrorPage />
    }
]);