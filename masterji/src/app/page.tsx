"use client"; // Enable if you're using app directory and client-side components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/weather-news");
  }, [router]);

  return (<>
  <div className="flex justify-center items-center min-h-screen">
  <Loader2/>
  </div>
  </>)
};

export default Home;
