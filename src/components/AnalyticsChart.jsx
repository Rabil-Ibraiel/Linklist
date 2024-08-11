"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { addDays, differenceInDays, format } from "date-fns";

const AnalyticsChart = ({ data }) => {
  const dataKeyLabel = Object.keys(data[0])[1];
  console.log(dataKeyLabel);
  const newData = [];
  data.forEach((item, index) => {
    const date = item.date;
    const nextDate = data?.[index + 1]?.date;
    if (date) {
      if (nextDate) {
        const daysInBetween = differenceInDays(nextDate, date);
        newData.push(item);
        if (daysInBetween > 1) {
          for (let i = 1; i < daysInBetween; i++) {
            if (dataKeyLabel === "view") {
              newData.push({
                date: format(new Date(addDays(date, i)), "yyyy-MM-dd"),
                view: 0,
              });
            } else {
              newData.push({
                date: format(new Date(addDays(date, i)), "yyyy-MM-dd"),
                click: 0,
              });
            }
          }
        }
      } else {
        newData.push(item);
      }
    }
  });

  console.log(newData);

  return (
    <LineChart
      width={1000}
      height={300}
      data={newData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />

      <Line type="monotone" dataKey={dataKeyLabel} stroke="#82ca9d" />
    </LineChart>
  );
};

export default AnalyticsChart;
