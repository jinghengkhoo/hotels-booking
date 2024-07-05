import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyDropdown = () => {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('SGD');
    const [flagSrc, setFlagSrc] = useState('https://restcountries.com/data/sgp.svg'); // Default flag for SGD

    useEffect(() => {
        // Fetch currency and flag data from Rest Countries API
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const currencyData = response.data.map(country => ({
                    code: Object.keys(country.currencies)[0],
                    flag: country.flags.svg,
                })).filter(currency => currency.code); // Ensure the code is not undefined
                setCurrencies(currencyData);

                // Set default currency and flag
                const defaultCurrency = currencyData.find(currency => currency.code === 'SGD');
                if (defaultCurrency) {
                    setSelectedCurrency(defaultCurrency.code);
                    setFlagSrc(defaultCurrency.flag);
                }
            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        };

        fetchCurrencyData();
    }, []);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency.code);
        setFlagSrc(currency.flag);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="options-menu"
                >
                    Change Currency
                </button>
            </div>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <ul
                    className="py-1 max-h-60 overflow-auto"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    {currencies.map((currency) => (
                        <li key={currency.code} className="cursor-pointer" role="menuitem">
                            <a
                                onClick={() => handleCurrencyChange(currency)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <img
                                    src={currency.flag}
                                    alt={`${currency.code} flag`}
                                    className="w-6 h-4 mr-3"
                                />
                                {currency.code}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4 flex items-center">
                {flagSrc && <img id="currency-flag" className="w-6 h-4 mr-2" src={flagSrc} alt="Currency Flag" />}
                <span id="currency-code">{selectedCurrency}</span>
            </div>
        </div>
    );
};

export default CurrencyDropdown;
