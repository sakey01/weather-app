import "./App.css";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type WeatherData = {
  current: {
    cloud: number;
    condition: {
      text: string;
      icon: string;
    };
    temp_c: number;
    feelslike_c: number;
    humidity: number;
  };
  location: {
    region: string;
  };
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("London");
  const [data, setData] = useState<WeatherData | null>(null);

  // Use effect to get location on mount + update on search button click
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const fetchData = async () => {
      try {
        // Fetch data using api key + city
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        const data = await res.json();

        setData(data);

        return data;
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className="flex flex-col min-w-screen min-h-screen items-center justify-center gap-4 shadow bg-blue-400">
      {/* Search container */}
      <div className="flex justify-center items-center gap-2 rounded shadow-md bg-white p-4">
        <input
          type="text"
          name="search"
          className="p-1"
          placeholder="Enter a city name"
          autoComplete="off"
          autoFocus
          spellCheck={false}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setCity(search);
          }}
          className="btn"
        >
          <Search size={16} className="w-5 h-5"></Search>
        </button>
      </div>
      {/* Weather data container */}
      {data ? (
        <div className="flex flex-col items-center rounded shadow-md bg-white p-5 gap-2">
          <img src={data.current.condition.icon} alt="weather icon" />
          <div className="text-2xl">{data.current.temp_c}°C</div>
          <div>{data.current.condition.text}</div>
          <div>{data.location.region}</div>
          <div className="flex gap-1">
            <div className="flex flex-col items-center p-4">
              Feels Like: <span>{data.current.feelslike_c}</span>
            </div>
            <div className="flex flex-col items-center p-4">
              humidity: <span>{data.current.humidity}</span>{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}

export default App;
