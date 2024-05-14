import { useLoaderData, useParams } from 'react-router-dom';
import UseTitle from '../components/UseTitle';

const EstateDetails = () => {
    UseTitle("PropertyDetails")
    const estates = useLoaderData();
    const { id } = useParams();
    const idint = parseInt(id);
    const estate = estates.find(estate => estate.id === idint);
    
    if (!estate) {
        return <div>Loading...</div>; // or handle the case when estate is not found
    }

    return (
        <div className="container lg:h-[600px] mx-auto mt-10 mb-4">
            <div className="bg-base-200 rounded-2xl shadow-lg p-8 lg:flex">
                <div className="lg:w-1/2 lg:mr-8 mb-4 lg:mb-0">
                    <img className="w-full h-auto rounded-lg" src={estate.image} alt={estate.estate_title} />
                </div>
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-semibold mb-4">{estate.estate_title}</h2>
                    <p className="text-lg text-gray-700 mb-4">{estate.description}</p>
                    <div className="mb-4">
                        <span className="inline-block bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{estate.status}</span>
                        <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{estate.area}</span>
                        <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mb-2">{estate.location}</span>
                    </div>
                    <p className="text-lg text-gray-700 mb-4">Price: <span className="font-semibold">{estate.price}</span></p>
                    <p className="text-lg text-gray-700 mb-4">Facilities:</p>
                    <ul className="flex flex-wrap">
                        {estate.facilities.map((facility, index) => (
                            <li key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 inline-block">{facility}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EstateDetails;
