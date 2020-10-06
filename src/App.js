import React, { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setCountry(countryCode);
      });
  };

  console.log(countryInfo);

  return (
    <div className="app bg-gray-100 h-screen flex p-8">
      <section className="left-section w-9/12 p-8">
        <header className="flex justify-between mb-5">
          <h1 className="text-4xl">Covid-19 Tracker</h1>
          <form className="">
            <select
              onChange={onCountryChange}
              className="shadow-md h-full border-none outline-none text-xl p-2 bg-white w-full uppercase"
              value={country}
            >
              <option value="worldwide">WorldWide</option>
              {countries.map((country) => (
                <option className="bg-white" value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </form>
        </header>
        <aside className="flex justify-between">
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </aside>
      </section>

      <section className="right-section w-3/12 p-8 border-l">
        <main>
          <h2>Live Cases by Country</h2>
          <p>WorldWide New Cases</p>
        </main>
      </section>
    </div>
  );
}

export default App;
