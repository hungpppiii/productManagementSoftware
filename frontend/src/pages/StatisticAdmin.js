import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'Faker';
import { Container, Select } from '@chakra-ui/react';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const option_facility = {
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ thống kê sản phẩm trên các cơ sở sản xuất toàn quốc',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const option_agent = {
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ thống kê sản phẩm trên các đại lý phân phối toàn quốc',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const option_warranty = {
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ thống kê sản phẩm trên các trung tâm bảo hành toàn quốc',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels_facility = ['cơ sở sản xuất 1', 'cơ sở sản xuất 2', 'cơ sở sản xuất 3'];
const labels_agent = ['Đại lý phân phối 1', 'Đại lý phân phối 2', 'Đại lý phân phối 3', 'Đại lý phân phối 4', 'Đại lý phân phối 5'];
const labels_warranty = ['Trung tâm bảo hành 1', 'Trung tâm bảo hành 2'];


const data_facility = {
  labels: labels_facility,
  datasets: [
    {
      label: 'Sản phẩm mới sản xuất',
      data: labels_facility.map(() => faker.random.number(100, 200)),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm trong kho',
      data: labels_facility.map(() => faker.random.number(80 ,100)),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm đại lý trả lại',
      data: labels_facility.map(() => faker.random.number(10, 15)),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
    {
      label: 'Sản phẩm trung tâm bảo hành trả lại',
      data: labels_facility.map(() => faker.random.number(5)),
      backgroundColor: 'rgb(204, 0, 102)',
      stack: 'Stack 2',
    },
    {
      label: 'Sản phẩm triệu hồi',
      data: labels_facility.map(() => faker.random.number(0)),
      backgroundColor: 'rgb(153, 0, 153)',
      stack: 'Stack 3',
    },
  ],
};

const data_agent = {
  labels: labels_agent,
  datasets: [
    {
      label: 'Sản phẩm đã nhập',
      data: labels_agent.map(() => faker.random.number(80, 100)),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm đã bán',
      data: labels_agent.map(() => faker.random.number(30)),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm hoàn trả',
      data: labels_agent.map(() => faker.random.number(5)),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
    {
      label: 'Sản phẩm bảo hành',
      data: labels_agent.map(() => faker.random.number(10)),
      backgroundColor: 'rgb(204, 0, 102)',
      stack: 'Stack 3',
    },
  ],
};

const data_warranty = {
  labels: labels_warranty,
  datasets: [
    {
      label: 'Sản phẩm nhận bảo hành',
      data: labels_warranty.map(() => faker.random.number(5, 10)),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm hoàn trả khách hàng',
      data: labels_warranty.map(() => faker.random.number(10)),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Sản phẩm trả về cơ sở sản xuất',
      data: labels_warranty.map(() => faker.random.number(0, 1)),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
    
  ],
};


export default function StatisticAdmin() {
  const [optionValue, setOptionValue]= useState('option1')

  function changeChart(event) {

    setOptionValue(event.target.value)
    // console.log(value);
    // console.log(event);
  };
//   console.log(optionValue);
  return (
    <Container maxW='container.lg'>
      <Bar 
        id='chart-bar'
        options={optionValue==='option1'?option_facility:optionValue==='option2'?option_agent:option_warranty} 
        data={optionValue==='option1'?data_facility:optionValue==='option2'?data_agent:data_warranty} 
      />,

      <Select value={optionValue} id='select-chart' mt='56px' size='lg' width='fit-content' onChange={(event) => changeChart(event)}>
        <option value='option1' selected>Theo cơ sở sản xuất</option>
        <option value='option2'>Theo đại lý phân phối</option>
        <option value='option3'>Theo trung tâm bảo hành</option>
      </Select>
    </Container>
  );
}