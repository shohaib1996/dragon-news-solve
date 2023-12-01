import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Career from "../Pages/Career/Career";
// import AllNews from "../News/AllNews/AllNews";
import NewsDetails from "../components/NewsDetails/NewsDetails";
import Login from "../Login/Login";
import Register from "../Login/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/career",
                element: <Career></Career>
            },
            {
                path: "/category/:id",
                element: <Home></Home>,
                loader: ()=> fetch('/data/news.json')

            },
            {
                path: "/news/:_id",
                element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                loader: ()=> fetch('/data/news.json')
            },
            {
                path: "/category/:id/news/:_id",
                element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
                loader: ()=> fetch('/data/news.json')
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    }

])

export default router;