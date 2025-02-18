import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useManagerWeekStatics } from "../hooks";

export const ManagerWeekCompleted = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const { data, isLoading } = useManagerWeekStatics();

  return isLoading ? (
    <div className="">
     loading...
    </div>
  ) : (
    <div className="bg-neutral-50 p-4 rounded-lg">
      <Line
        style={{ height: "330px" }}
        data={{
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт"],
          datasets: [
            {
              label: "Завершенные приемы",
              data,
              fill: false,
              borderColor: "#193CB8",
              backgroundColor: "rgb(25,60,184,0.5)",
            },
          ],
        }}
      />
    </div>
  );
};
