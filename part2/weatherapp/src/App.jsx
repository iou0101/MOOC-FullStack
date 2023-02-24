import { useState, useEffect } from "react";

const App = () => {
  const [country, setCountry] = useState("");
  const [countriesList, setCoutriesList] = useState(null);

  const handleCountryNameInput = (event) => {
    const name = event.target.value;
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((resp) =>
        resp.json().then((data) => {
          console.log(data);
          setCoutriesList(data);
        })
      )
      .catch((error) => console.log("country not found"));
  };

  return (
    <>
      <h1>Weather App</h1>
      <input onChange={handleCountryNameInput} />
      <div>
        <ul>
          {countriesList &&
            countriesList.map((country) => <li>{country.name.common}</li>)}
        </ul>
      </div>
      <div></div>
    </>
  );
};

export default App;
