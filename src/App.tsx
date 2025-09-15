import { useEffect, useState } from "react";
import "./App.css";
import { Search } from "lucide-react";

function App() {
  const [search, setSearch] = useState<string>("");
  const [temperature, setTemperature] = useState();

  const getWeather = async (city: string) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );

      const data = await res.json();

      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="main">
      <div className="search-container">
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Enter a city name"
          autoComplete="off"
          spellCheck={false}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={() => {getWeather(search)}} className="btn">
          <Search size={16} className="w-5 h-5"></Search>
        </button>
      </div>
      <div className="display-container">
        <div>{data.}</div>
      </div>
    </div>
  );
}

export default App;
