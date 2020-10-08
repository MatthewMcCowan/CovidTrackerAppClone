import React, { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import { sortData, prettyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  console.log(countryInfo);

  return (
    <div className="app bg-gray-200 h-screen flex p-8">
      <section className="left-section w-9/12 px-4 h-full border flex flex-col">
        <header className="flex justify-between mb-5">
          <h1 className="text-4xl">Covid-19 Tracker</h1>
          <form className="">
            <select
              onChange={onCountryChange}
              className="cursor-pointer shadow-md h-full border-none outline-none text-xl p-2 bg-gray-200 w-full uppercase"
              value={country}
            >
              <option value="worldwide">WorldWide</option>
              {countries.map((country) => (
                <option className="bg-blue-100" value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </form>
        </header>
        <aside className="grid grid-rows-1 h-64 w-auto grid-flow-col gap-4 mb-4">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </aside>
        <div className="border-lg h-half flex-grow shadow-lg">
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </section>

      <section className="right-section w-3/12 bg-blue-100 p-4">
        <h2 className="mb-4 text-2xl ">Live Cases by Country</h2>

        <div className="container h-half overflow-auto my-4">
          <Table countries={tableData} />
        </div>
        <p className="mb-4 text-2xl ">Worldwide New {casesType}</p>
        <div>
          <LineGraph casesType={casesType} />
        </div>
        {/* Graph */}
      </section>
    </div>
  );
}

export default App;
