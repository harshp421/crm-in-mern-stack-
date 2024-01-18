import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader,Stack} from '@mui/material';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data:[300, 450, 200, 700, 400, 600, 800],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const LineChart = () => {
  return (
    <Card
    component={Stack}
    spacing={3}
    direction="column"
    sx={{
      px: 3,
      py: 5,
      borderRadius: 2,
    }}
    >
       <CardHeader title="Pie Chart"  sx={{ mb: 5 }} />
       
       <Line options={options} data={data} />
    </Card>
   
  )
}

export default LineChart