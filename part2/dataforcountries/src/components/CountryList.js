import CountryDetails from "./CountryDetails";

export default function CountryList({ countries, selectCountry }) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => selectCountry(country.cca3)}>show</button>
          </li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) return <CountryDetails country={countries[0]} />;
}
