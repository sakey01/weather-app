import "./App.css";
import { useEffect, useState } from "react";
import { Droplet, Search, Thermometer } from "lucide-react";

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
  const [status, setStatus] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  // updates city data
  const handleSearch = () => {
    if (city === "") return;
    setCity(search);
  };

  // Use effect to get location on mount + update on search button click
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const fetchData = async () => {
      try {
        // Fetch data using api key + city
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        if (!res.ok) {
          setStatus("Failed");
          return;
        }

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
      <div className="flex justify-center items-center gap-2 rounded shadow-md bg-white p-3">
        <input
          type="text"
          name="search"
          className="p-1 focus:outline-none rounded"
          placeholder="Enter a city name"
          autoComplete="off"
          autoFocus
          spellCheck={false}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={() => handleSearch()}
          className="cursor-pointer rounded hover:bg-gray-200 p-1"
        >
          <Search size={16} className="w-5 h-5"></Search>
        </button>
      </div>

      {status && <div>{status}</div>}
      {/* Weather data container */}
      {data ? (
        <div className="flex flex-col items-center p-5 rounded shadow-md bg-white gap-2">
          <img src={data.current.condition.icon} alt="weather icon" />
          <div className="text-3xl">{data.current.temp_c}°C</div>
          <div>{data.current.condition.text}</div>
          <div>{data.location.region}</div>

          {/* Temparature it feels like stat */}
          <div className="flex gap-1 border-t-2 mt-4 justify-center w-full border-gray-300">
            <div className="flex items-center p-4 gap-2 border-r-2 border-gray-300">
              <Thermometer size={32} color="#D1D5DB"></Thermometer>
              <div className="flex flex-col text-sm">
                <span>{data.current.feelslike_c}°C</span>Feels Like
              </div>
            </div>

            {/* Humidity stat */}
            <div className="flex items-center p-4 gap-2">
              <Droplet size={32} color="#D1D5DB"></Droplet>
              <div className="flex flex-col text-sm">
                <span>{data.current.humidity}%</span>Humidity
              </div>
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
