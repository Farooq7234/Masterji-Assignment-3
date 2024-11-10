'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define the API response type
interface User {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the chart data structure
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const Page: React.FC = () => {
  // Explicitly type `chartData` as `ChartData | null`
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://67309d0166e42ceaf160d1c1.mockapi.io/api/v1/user/user');
        const data: User[] = await response.json();

        // Transform data for the chart
        const labels = data.slice(0, 7).map((item) => `User ${item.id}`);
        const dataset = data.slice(0, 7).map((item) => item.id * 10); // Mock values

        setChartData({
          labels,
          datasets: [
            {
              label: 'User Details',
              data: dataset,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const config = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dynamic Bar Chart Example</h2>
      {chartData ? <Bar data={chartData} options={config} /> : <p>Loading...</p>}
    </div>
  );
};

export default Page;
