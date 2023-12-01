import PropTypes from 'prop-types';
import { FaBookmark, FaShareAlt, FaEye } from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Link } from 'react-router-dom';




const AllNewsCard = ({ news }) => {

    const { rating, total_view, title, author, image_url, details, _id } = news
    // console.log(_id);

    return (
        <div className='mt-5 border border-[#E7E7E7]'>
            <div className='bg-[#F3F3F3] flex items-center justify-between p-6 rounded-md font-poppins'>
                <div className='flex items-center'>
                    <div>
                        <img className='h-12 w-12 rounded-full mr-5' src={author.img} alt="" />
                    </div>
                    <div>
                        <p className='font-bold'>{author.name}</p>
                        <p>{author?.published_date?.slice(0, 10)}</p>   {/* you can do it with split .split(" ")[0];*/}

                    </div>
                </div>
                <div className='text-xl flex gap-3'>
                    <FaBookmark></FaBookmark>
                    <FaShareAlt></FaShareAlt>
                </div>
            </div>
            <h1 className='mt-3 mb-4 text-xl font-bold text-[#403F3F]'>{title}</h1>
            <div>
                <img className='' src={image_url} alt="" />
                <div>
                    <p className='text-[#706F6F] mt-8 mb-5 px-2'>{details.slice(0, 380)}...<Link to={`news/${_id}`} className='text-orange-600 hover:text-orange-400 font-bold'>Read More</Link></p>
                </div>
            </div>
            <div className='flex items-center justify-between mb-5 border-t border-slate-300 mx-4 pt-5'>
                <div className='flex gap-3 items-center'>
                    <Rating style={{ maxWidth: 150 }} readOnly halfFillMode= 'svg' value={rating.number < 4.5 ? Math.floor(rating.number) : rating.number } />
                    <p className='text-[#706F6F] text-lg'>{rating.number}</p>
                </div>
                <div className='font-semibold text-[#706F6F] flex items-center gap-3'><FaEye className='text-xl'></FaEye>{total_view}</div>
            </div>

        </div>
    );
};
AllNewsCard.propTypes = {

    news: PropTypes.object.isRequired
}


export default AllNewsCard;