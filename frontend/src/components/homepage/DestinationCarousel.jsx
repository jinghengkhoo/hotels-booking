import React, { useRef } from 'react';

const destinations = [
    {
        name: 'Singapore',
        imageUrl: '../../src/assets/location/singapore.jpg',
    },
    {
        name: 'New York City',
        imageUrl: '../../src/assets/location/nyc.jpg',
    },
    {
        name: 'Shanghai',
        imageUrl: '../../src/assets/location/shanghai.jpeg',
    },
    {
        name: 'Bali',
        imageUrl: '../../src/assets/location/bali.jpg',
    },
    {
        name: 'Jeju Island',
        imageUrl: '../../src/assets/location/jeju.jpg',
    },
    {
        name: 'Bangkok',
        imageUrl: '../../src/assets/location/bangkok.jpg',
    },
    {
        name: 'Cancun',
        imageUrl: '../../src/assets/location/cancun.jpg',
    },
    {
        name: 'Japan',
        imageUrl: '../../src/assets/location/japan.jpg',
    },
    // Add more destinations as needed
];

const DestinationCarousel = () => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="bg-white py-16 px-8">
            <div className="container mx-auto text-center mb-8">
                <h2 className="text-3xl font-bold">Top Destination For Your Next Vacation</h2>
            </div>
            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    &lt;
                </button>
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto space-x-4 scrollbar-hide p-8"
                >
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className="min-w-[200px] flex-shrink-0 rounded overflow-hidden shadow-lg bg-white"
                        >
                            <img
                                className="m-4 w-48 h-48 object-cover"
                                src={destination.imageUrl}
                                alt={destination.name}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{destination.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    &gt;
                </button>
            </div>
            <div className="text-center mt-8">
                <button className="text-green-600 hover:text-green-700 font-semibold">
                    See All Destinations
                </button>
            </div>
        </div>
    );
};

export default DestinationCarousel;
