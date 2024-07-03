import React, { useRef } from 'react';

const destinations = [
    {
        name: 'Bali',
        imageUrl: 'path/to/bali.jpg',
    },
    {
        name: 'Bangkok',
        imageUrl: 'path/to/bangkok.jpg',
    },
    {
        name: 'Cancun',
        imageUrl: 'path/to/cancun.jpg',
    },
    {
        name: 'Nha Trang',
        imageUrl: 'path/to/nhatrang.jpg',
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
                    className="flex overflow-x-auto space-x-4 scrollbar-hide"
                >
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className="min-w-[200px] flex-shrink-0 rounded overflow-hidden shadow-lg bg-white"
                        >
                            <img
                                className="w-full h-48 object-cover"
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
