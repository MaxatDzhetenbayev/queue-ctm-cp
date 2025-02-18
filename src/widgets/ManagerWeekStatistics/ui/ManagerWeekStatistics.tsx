import React from "react";
import { ManagerWeekStats } from "./ManagerWeekStats";
import { ManagerWeekCompleted } from "./ManagerWeekCompleted";

export const ManagerWeekStatistics = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Статистики за неделю</h3>
      <div className="w-full flex gap-4">
        <ManagerWeekCompleted />
        <ManagerWeekStats />
      </div>
    </div>
  );
};
