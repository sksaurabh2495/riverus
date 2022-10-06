
import React, { useState, useEffect, useRef } from 'react';
import SelectCustom from "../src/SelectCustom";
import axios from "axios";

function App() {

  const [countryData, setCountryData] = useState([]);

  const [optionsArray, setOptionsArray] = useState([]);

  const countries = {
    id: "country",
    label: "Select one option",
    options: optionsArray,
  };

  const [selectedCountry, setSelectedCountry] = useState({value:"", language:"", capital:"", currency:""});

  const handleChange = (item) => {
    setSelectedCountry(item);
  };

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v2/all');
      if (response && response.status) {
        const { status, data } = response;
        if (status === 200) {
          setCountryData(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    for(let i = 0 ; i < countryData.length ; i++){
      let tempObj = {
        value: countryData[i].name,
        label: countryData[i].name,
        language: countryData[i].languages[0].name,
        capital: countryData[i].capital,
        currency: countryData[i].currencies ? countryData[i].currencies[0].name : ""
      };
      countries.options.push(tempObj);
      setOptionsArray([...optionsArray, tempObj]);
    }
  }, [countryData]);


  return (
    <nav className="w-full shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8">
          <SelectCustom
            {...countries}
            onChange={(item) => handleChange(item)}
          />
      </div>

      <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="py-3 px-6">
                          Country name
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Language
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Capital
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Currency
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {selectedCountry.value}
                      </th>
                      <td className="py-4 px-6">
                          {selectedCountry.language}
                      </td>
                      <td className="py-4 px-6">
                          {selectedCountry.capital}
                      </td>
                      <td className="py-4 px-6">
                          {selectedCountry.currency}
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

    </nav>
  );
}
export default App;
