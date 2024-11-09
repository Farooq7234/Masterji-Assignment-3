"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming Input exists in your ShadCN components
import { Button } from "@/components/ui/button"; // Assuming Button exists in your ShadCN components
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";
import { Article } from "@/types/ApiResponse";
import Link from "next/link";

const WeatherNews = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const { toast } = useToast();
  const [newsData, setnewsData] = useState<Article[]>([]);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "City not found",
        variant: "destructive",
      });

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `https://newsapi.org/v2/everything?pageSize=5&q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_SECRET}`
        );
        setnewsData(data.data.articles);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description: axiosError.response?.data.message ?? "Error Loading News!",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setSearch(city);
    fetchWeather();
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-10" />;

  return (
    <div className="p-6 space-y-4 flex flex-col lg:flex-row justify-around min-h-screen">
      {/* Weather Section */}
      <div className="p-6 rounded-lg shadow-md dark:shadow-gray-400 dark:shadow-sm w-full lg:w-[30%] h-auto lg:h-[100vh] mt-4">
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">
          How's the weather today?
        </h1>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch}>Get Weather</Button>
        </div>

        {weather && (
          <Card className="mt-5">
            <CardHeader>
              <CardTitle className="text-center">
                {weather.name}, {weather.sys.country}
              </CardTitle>
              <CardDescription className="text-center">
                {weather.weather.map((w: any, index: number) => (
                  <li key={index} className="text-lg font-medium list-none">
                    {w.description}
                  </li>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {weather.weather.map((w: any, index: number) => (
                  <Image
                    src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                    alt=""
                    key={index}
                    width={140}
                    height={140}
                  />
                ))}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-2 shadow-md">
                    <p className="font-bold text-center">{weather.main.temp}°C</p>
                    <p className="font-normal text-center text-sm text-gray-600">
                      Current Temperature
                    </p>
                  </div>
                  <div className="p-2 shadow-md">
                    <p className="font-bold text-center">{weather.main.feels_like}°C</p>
                    <p className="font-normal text-center text-sm text-gray-600">
                      Feels Like
                    </p>
                  </div>
                  <div className="p-2 shadow-md">
                    <p className="font-bold text-center">{weather.main.humidity}%</p>
                    <p className="font-normal text-center text-sm text-gray-600">
                      Humidity
                    </p>
                  </div>
                  <div className="p-2 shadow-md">
                    <p className="font-bold text-center">{weather.wind.speed} m/s</p>
                    <p className="font-normal text-center text-sm text-gray-600">
                      Wind Speed
                    </p>
                  </div>
                </div>
                <p className="text-center mt-6">
                  <span className="font-bold">Sunrise:</span>{" "}
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
                <p className="text-center">
                  <span className="font-bold">Sunset:</span>{" "}
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* News Section */}
      <div className="shadow-md rounded-md w-full lg:w-[65%] min-h-[100vh] p-6">
        <h2 className="text-2xl font-bold text-center lg:text-left">
          What's happening around the world
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {newsData.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                {article.urlToImage && (
                  <Image
                    src={article.urlToImage}
                    alt="Article Image"
                    className="rounded-md"
                    width={400}
                    height={200}
                  />
                )}
              </CardHeader>
              <CardContent>
                <p className="font-bold">{article.title}</p>
                <p className="text-sm text-gray-500">
                  {article.author} - {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <p className="truncate">{article.content}</p>
              </CardContent>
              <CardFooter>
            <Link className="text-xl text-blue-500 mx-auto" href={''}>View full article</Link>
               </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherNews;
