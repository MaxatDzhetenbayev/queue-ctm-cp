import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useManagerWeekStats } from "../hooks";
import { Skeleton } from "@/shared";

export const ManagerWeekStats = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const { data, isLoading } = useManagerWeekStats();


  return isLoading ? (
    <div className="">
      <Skeleton className="w-[330px] h-[330px]" />
    </div>
  ) : (
    <div className="bg-neutral-50 p-4 rounded-lg">
      <Doughnut
        data={{
          labels: ["Приемы", "Завершенные", "Отмененные"],
          datasets: [
            {
              data: [data?.total, data?.completed, data?.declined],
              backgroundColor: [
                "var(--geist-primary)",
                "var(--geist-neutral)",
                "var(--geist-primary-light)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};
