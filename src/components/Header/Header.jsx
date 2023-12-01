import moment from 'moment';

const Header = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className='font-poppins'>
                <img className="mx-auto" src="/assets/logo.png" alt="" />
                <p className="text-[#706F6F] text-center mt-5">Journalism Without Fear or Favour</p>
                <p className='text-center text-[#706F6F] mb-8'> <span className="font-bold text-[#403F3F]">{moment().format("dddd")},</span> {moment().format("MMMM D, YYYY")}</p>      
            </div>



        </div>
    );
};

export default Header;