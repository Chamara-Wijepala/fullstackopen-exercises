import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const selectCountry = (code) => {
    setCountriesToDisplay(countries.filter((country) => country.cca3 === code));
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setCountriesToDisplay(
      countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      })
    );
  }, [inputValue]);

  return (
    <>
      <div>
        find countries:{" "}
        <input value={inputValue} onChange={handleInputChange} />
      </div>

      <CountryList
        countries={countriesToDisplay}
        selectCountry={selectCountry}
      />
    </>
  );
}
