import PropTypes from 'prop-types';
import { FaCalendar } from 'react-icons/fa';

const LeftSportsCard = ({ news }) => {
    const { image_url, title, author } = news;
    const publishedDate = author.published_date;
    const inputDate = new Date(publishedDate)
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let month = monthNames[inputDate.getMonth()];
    let day = inputDate.getDate();
    let year = inputDate.getFullYear();
    let formattedDate = month + " " + day + ", " + year;
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg mt-5 mb-5 font-poppins">
            <a href="#">
                <img className="rounded-t-lg" src={image_url} alt="" />
            </a>
            <div className="p-5 flex flex-col">
                <h5 className="h-[150px] mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <div className='flex items-center justify-between'>
                    <p className='font-semibold text-[#403F3F]'>Sports</p>
                    <p className='flex items-center text-[#9F9F9F]'><FaCalendar className='mr-3'></FaCalendar> <span>{formattedDate}</span></p>
                </div>

            </div>
        </div>

    );
};
LeftSportsCard.propTypes = {

    news: PropTypes.object.isRequired
}

export default LeftSportsCard;