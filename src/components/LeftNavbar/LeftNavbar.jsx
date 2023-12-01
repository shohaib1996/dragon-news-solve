import { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import LeftSportsCard from "../LeftSportsCard/LeftSportsCard";

const LeftNavbar = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('/data/categories.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    const [news, setNews] = useState([])
    useEffect(() => {
        fetch('/data/news.json')
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])
    // console.log(news);
    const sportsNews = news.filter(newsItem => newsItem.category_id === "4")
    // console.log(sportsNews);
    
        

    return (
        <div>
            <div className="text-[#9F9F9F] text-center mt-5 text-xl space-y-7">

                {
                    categories.map(category => <NavLink
                        to={`${category.id == 0 ? "/" : `/category/${category.id}`}`}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending"
                            : isActive
                            ? "bg-[#E7E7E7] text-[#403F3F] font-bold block py-2"
                            : "block"
                        }
                        key={category.id}>
                        {category.name}
                    </NavLink>)
                }

            </div>
            <div className="mt-6">
                {
                    sportsNews.map(news => <LeftSportsCard key={news.id} news={news}></LeftSportsCard>)
                }

            </div>
        </div>
    );
};

export default LeftNavbar;