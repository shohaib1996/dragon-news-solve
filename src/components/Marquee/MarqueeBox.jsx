import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";


const MarqueeBox = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className='bg-[#F3F3F3] py-4 flex'>
                <button className="btn btn-secondary font-bold text-white ml-4">Breaking News</button>
                <Marquee speed={100} pauseOnHover={true} className='text-black font-bold'>
                    <Link to="/news/0282e0e58a5c404fbd15261f11c2ab6a" className='mr-8'>Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet</Link>
                    <Link to="/news/0282e0e58a5c404fbd15261f11c2ab6a">Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet</Link>
                </Marquee>
            </div>

        </div>
    );
};

export default MarqueeBox;