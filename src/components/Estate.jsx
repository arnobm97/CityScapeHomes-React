import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Estate = ({ estate }) => {
    const { estate_title, image, description, price, status, area, location, facilities,id } = estate;

    return (
        <div className="max-w-xs sm:max-w-md md:max-w-lg  overflow-hidden shadow-lg rounded-2xl">
            <img className="w-full" src={image} alt={estate_title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{estate_title}</div>
                <p className="text-slate-500">{description}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">{status}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{area}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{location}</span>
            </div>
            <div className="px-6 py-4">
                <p className="text-slate-500 "><span className='font-bold  text-gray-700 text-base'>Price:</span> {price}</p>
                <p className="text-slate-500 "><span className='font-bold  text-gray-700' >Facilities:</span> {facilities.join(', ')}</p>
            </div>
            <div className="px-6 py-4 flex justify-center">
                <Link to={`/estate/${id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Property
                </button>
                </Link>
            </div>
        </div>
    );
};

Estate.propTypes = {
    estate: PropTypes.shape({
        estate_title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        area: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        facilities: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
};

export default Estate;
