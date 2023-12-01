import { useLoaderData, useParams } from "react-router-dom";
import AllNews from "../../News/AllNews/AllNews";
import LeftNavbar from "../../components/LeftNavbar/LeftNavbar";
import RightNavbar from "../../components/RightNavbar/RightNavbar";
import AllNewsCard from "../../components/AllNewsCard/AllNewsCard";
import ErrorPage from "../../components/ErrorPage/ErrorPage";


const Home = () => {
    const newsItems = useLoaderData();
    const { id } = useParams();
    // console.log(newsItems, id);
    // const news = newsItems.filter(newsItem => newsItem.category_id == id)
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
                <div>
                    <h1 className="text-xl text-[#403F3F] font-bold">All Category</h1>
                    <LeftNavbar></LeftNavbar>
                </div>
                <div className="col-span-2 mb-12">
                    <h1 className="text-xl text-[#403F3F] font-bold ">Dragon News Home</h1>
                    {
                        id === "6" ? <ErrorPage></ErrorPage> : <>
                        {id === undefined || id === "0" ? (
                        <AllNews></AllNews>
                    ) : (
                        newsItems
                            .filter((newsItem) => newsItem.category_id == id)
                            .map((news) => (
                                <AllNewsCard key={news.id} news={news}></AllNewsCard>
                            ))
                    )}
                        </>
                    }
                    
                </div>
                <div>
                    <h1 className="text-xl text-[#403F3F] font-bold ">Login with</h1>
                    <RightNavbar></RightNavbar>
                </div>
            </div>
        </div>
    );
};

export default Home;