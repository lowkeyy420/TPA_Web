import { useAxios } from "@/hooks/useAxios";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import style from "../styles/UI.module.scss";

function DataVisualization() {
  const url = process.env.BASE_URL + "admin/get-visualization";
  const [loading, data, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div className={style.datavisual_container}>
      <div className={style.chart_container}>
        <h2>Product Inserted In 2023</h2>
        <BarChart
          width={300}
          height={500}
          data={data ? [{ name: "2023", count: data.count }] : []}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div className={style.chart_container}>
        <h2>Product Inserted In 2023</h2>

        <BarChart
          width={300}
          height={500}
          data={data ? [{ name: "2023", count: data.count }] : []}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default DataVisualization;
