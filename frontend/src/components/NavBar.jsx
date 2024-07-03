import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    return (
        <nav className="bg-blue-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faBars} className="mr-2" />
                    <span className="font-semibold">MENU</span>
                </div>
                <div className="text-center font-bold text-xl">
                    travelust
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faGlobe} />
                            <span>Change Currency</span>
                        </button>
                        <div className="absolute hidden bg-white text-black mt-2 py-2 w-48 rounded shadow-lg">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-200">USD</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-200">EUR</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-200">GBP</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <span>LOG IN</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
