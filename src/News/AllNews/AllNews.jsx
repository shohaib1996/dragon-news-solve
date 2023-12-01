import { useEffect, useState } from "react";
import AllNewsCard from "../../components/AllNewsCard/AllNewsCard";


const AllNews = () => {
    const [newsItems, setNewsItems] = useState([])
    useEffect(() => {
        fetch('/data/news.json')
            .then(res => res.json())
            .then(data => setNewsItems(data))
    }, [])

    
    return (
        <div>
            {
                newsItems.map(news => <AllNewsCard key={news.id} news={news}></AllNewsCard>)
            }
        </div>
    );
};

export default AllNews;