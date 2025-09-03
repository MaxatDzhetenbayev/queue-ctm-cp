import React from "react";

import { AnalyticsWrapper } from "@/modules/analytics/ui";

const AdminPage = () => {
  return (
    <div>
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-1">
            Обзор деятельности центров карьеры
          </p>
        </div>
        {/* <div className=" flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              // value={dateRange.startDate}

              className="border-none focus:ring-0 text-sm"
            />
            <span className="text-gray-400">—</span>
            <input type="date" className="border-none focus:ring-0 text-sm" />
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Скачать отчет</span>
          </button>
        </div> */}
      </div>
      <div className="mt-4">
        <AnalyticsWrapper />
      </div>
    </div>
  );
};

export default AdminPage;
