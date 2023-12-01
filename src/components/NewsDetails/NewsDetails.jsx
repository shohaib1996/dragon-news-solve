import { Link, useLoaderData, useParams } from "react-router-dom";
import RightNavbar from "../RightNavbar/RightNavbar";
import { FaArrowLeft } from 'react-icons/fa';
import LeftSportsCard from "../LeftSportsCard/LeftSportsCard";




const NewsDetails = () => {
    
    
    const newsItems = useLoaderData();
    const sportsNews = newsItems.filter(newsItem => newsItem.category_id === "4")
    const { _id } = useParams()
    const news = newsItems.find(news => news._id === _id)
    const { title, image_url, details } = news
    return (
        <div className="max-w-screen-xl mx-auto font-poppins">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
                <div className="col-span-3 mb-12">
                    <h1 className="text-xl text-[#403F3F] font-bold ">Dragon News Home</h1>
                    <div className="mt-5 p-7">
                        <img className="w-full" src={image_url} alt="" />
                        <h1 className="text-3xl font-bold text-[#403F3F] mt-5 mb-5">{title}</h1>
                        <p className="text-[#706F6F]">{details}</p>
                        <Link to="/"><button className="btn bg-[#D72050] text-white mt-8"><span><FaArrowLeft></FaArrowLeft></span>All news in this category</button></Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#403F3F] mt-5 mb-5">Editors Insight</h1>
                        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-3">
                            {
                                sportsNews.map(news => <LeftSportsCard key={news.id} news={news}></LeftSportsCard>)
                            }

                        </div>

                    </div>

                </div>
                <div>
                    <h1 className="text-xl text-[#403F3F] font-bold ">Login with</h1>
                    <RightNavbar></RightNavbar>

                </div>
            </div>
        </div>
    );
};

export default NewsDetails;