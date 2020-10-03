import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    // Create a function
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="">
      <header className="flex justify-between mb-5">
        <h1 className="text-4xl">Covid-19 Tracker</h1>
        <form className="">
          <select onChange={onCountryChange} className="shadow-md h-full border-none outline-none text-xl p-2 bg-white w-full uppercase" value={country}>
            <option value='worldwide'>WorldWide</option>
            {countries.map((country) => (
              <option className="bg-white" value={country.value}>
                {country.name}
              </option>
            ))}
          </select>
        </form>
      </header>
    </div>
  );
}

export default App;
