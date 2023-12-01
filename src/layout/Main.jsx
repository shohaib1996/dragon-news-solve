import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import MarqueeBox from "../components/Marquee/MarqueeBox";
import { Toaster } from "react-hot-toast";



const Main = () => {
    const location = useLocation()
    const isNewsDetailsRoute = location.pathname.startsWith("/news/")
    const isNewsDetailsLocation = location.pathname.match(/^\/category\/[^/]+\/news\/[^/]+$/)
    const loginLocation = location.pathname.match("/login")
    const registerLocation = location.pathname.match("/register")
    // location.pathname.match(/^\/category\/[^/]+\/news\/[^/]+$/);

    return (
        <div>
            <div><Toaster/></div>
            {loginLocation || registerLocation ? <Navbar></Navbar> : null}
            {!loginLocation && !registerLocation  && (
                <>
                    <Header></Header>
                    {isNewsDetailsRoute || isNewsDetailsLocation ? null : <MarqueeBox></MarqueeBox>}
                    {isNewsDetailsRoute || isNewsDetailsLocation ? null : <Navbar></Navbar>}
                </>
            )}
            <Outlet></Outlet>
        </div>

    );
};

export default Main;