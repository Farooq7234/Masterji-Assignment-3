'use client';
import { useState, useEffect } from 'react';
import axios, {AxiosError} from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assuming Input exists in your ShadCN components
import { Button } from '@/components/ui/button'; // Assuming Button exists in your ShadCN components
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { ApiResponse } from "@/types/ApiResponse";
import Image from 'next/image';


const WeatherNews = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const { toast } = useToast()

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=982c14935d4424d8c19ee2036f05aae3&units=metric`
      );
      setWeather(data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "city not found",
        variant: "destructive",
      });

      
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(city);
    fetchWeather();
  };

  if (loading) return <Loader2></Loader2>

  return (
    <div className="p-6 space-y-4 ">
      <div className='p-6 rounded-lg shadow-md w-[600px]'>
      <h1 className="text-2xl font-bold mb-4">How's the weather today?</h1>   
      <div className="flex space-x-2">
        <Input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSearch}>Get Weather</Button>
      </div>

      {weather ? (
        <Card className='mt-5'>
          <CardHeader >
            <CardTitle className='mx-auto'>{weather.name}, {weather.sys.country}</CardTitle>
            <CardDescription className='mx-auto' >
            {weather.weather.map((w:any, index:number) => (
            <li key={index} className="text-lg font-medium list-none">
            {w.description}
            </li>
        ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
           <div className='flex flex-col'>
            <p> {weather.weather.map((w:any, index:number) => (  
            <Image
             src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} alt=""
            key={index} className="mx-auto"
            width={140}
            height={140}
            />
        ))}</p>
          <div className='grid grid-cols-2 gap-3'>
          <div className='p-2 shadow-md'>
          <p className='font-bold text-center'>{weather.main.temp}%</p>
          <p className='font-normal text-center text-sm text-gray-600'>Current Temperature</p>
          </div>
          <div  className='p-2 shadow-md'>
          <p className='font-bold text-center'>{weather.main.temp}%</p>
          <p className='font-normal text-center text-sm text-gray-600'>Feels Like</p>
          </div>
          <div  className='p-2 shadow-md'>
          <p className='font-bold text-center'>{weather.main.humidity}%</p>
          <p className='font-normal text-center text-sm text-gray-600'>Humidity</p>
          </div>
          <div  className='p-2 shadow-md'>
          <p className='font-bold text-center'>{weather.wind.speed}%</p>
          <p className='font-normal text-center text-sm text-gray-600'>Wind Speed</p>
          </div>
           </div>
            <p className='text-center mt-10 mb-2'><span className='font-bold'>Sunrise:</span> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p className='text-center '><span className='font-bold'>Sunset:</span> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
           </div>
          </CardContent>
        </Card>
      ) : (
        null
      )}
      </div>
    </div>
  );
};

export default WeatherNews;
