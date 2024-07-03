import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 text-xs">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Visit the best places with us.</h3>
                        <ul>
                            <li className="mb-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                8 Somapah Rd, Singapore 487372
                            </li>
                            <li className="mb-2">
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                (308) 555-0121
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                hello@yourmail.com
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Top Destination</h3>
                        <ul>
                            <li className="mb-2"><a href="#">Tokyo</a></li>
                            <li className="mb-2"><a href="#">Los Angeles</a></li>
                            <li className="mb-2"><a href="#">Rome</a></li>
                            <li className="mb-2"><a href="#">Amsterdam</a></li>
                            <li className="mb-2"><a href="#">San Francisco</a></li>
                            <li className="mb-2"><a href="#">London</a></li>
                            <li><a href="#">More Destinations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Information</h3>
                        <ul>
                            <li className="mb-2"><a href="#">Help & FAQs</a></li>
                            <li className="mb-2"><a href="#">Press centre</a></li>
                            <li className="mb-2"><a href="#">About us</a></li>
                            <li className="mb-2"><a href="#">Contact us</a></li>
                            <li className="mb-2"><a href="#">Privacy policy</a></li>
                            <li><a href="#">Site map</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="text-blue-500"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                            <a href="#" className="text-blue-400"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                            <a href="#" className="text-red-600"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
                            <a href="#" className="text-pink-500"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                        </div>
                        <h3 className="text-lg font-bold mb-4">Payment channels</h3>
                        <div className="flex flex-wrap space-x-2">
                            <img src="path/to/payment-icon1.png" alt="Payment Icon 1" className="h-8" />
                            <img src="path/to/payment-icon2.png" alt="Payment Icon 2" className="h-8" />
                            <img src="path/to/payment-icon3.png" alt="Payment Icon 3" className="h-8" />
                            <img src="path/to/payment-icon4.png" alt="Payment Icon 4" className="h-8" />
                            <img src="path/to/payment-icon5.png" alt="Payment Icon 5" className="h-8" />
                        </div>
                        <div className="mt-4">
                            <button className="flex items-center space-x-2 border border-white py-2 px-4 rounded">
                                <span className="text-lg"><FontAwesomeIcon icon={faGlobe} /></span>
                                <span>English</span>
                                <span>|</span>
                                <span>USD</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 text-sm">
                Copyright &copy; 2024. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
