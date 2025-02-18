"use client";
import { ManagerReceptions } from "@/widgets";
import { ManagerTodayStatistics } from "@/widgets/ManagerTodayStatistics";
import { ManagerWeekStatistics } from "@/widgets/ManagerWeekStatistics";

import React from "react";

export default function Page() {
  //   const [reminders, setReminders] = useState([
  //     { id: 1, text: "Следующий клиент через 5 минут", type: "warning" },
  //     { id: 2, text: "Запись без подтверждения", type: "alert" },
  //     { id: 3, text: "Закрытие смены через 30 минут", type: "info" },
  //   ]);

  //   const removeReminder = (id: number) => {
  //     setReminders(reminders.filter((reminder) => reminder.id !== id));
  //   };

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg ">
      <div className="grid  h-full p-6 gap-x-6">
        <div className="col-span-3 row-span-2">
          <ManagerReceptions />
        </div>
        <div className="col-span-2 row-start-3 h-full">
          <ManagerWeekStatistics />
        </div>
        <div className="col-span-1 row-start-3">
          <ManagerTodayStatistics />
        </div>
        {/* <div className="row-span-2 bg-neutral-50 rounded-lg p-4 shadow-md h-full">
          <h2 className="text-2xl font-semibold mb-4">Напоминания</h2>
          {reminders.length > 0 ? (
            <ul className="space-y-3">
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className={`font-medium text-${reminder.type}`}>
                    {reminder.text}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeReminder(reminder.id)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">Нет новых напоминаний</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
