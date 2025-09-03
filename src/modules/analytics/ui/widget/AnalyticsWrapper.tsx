import React from "react";

import { ActivityAnalytics } from "../activity-analytics";
import { AnalyticsDateFilter } from "../components";
import { DepartmentLoadAnalytics } from "../department-load-analytics";
import { KeyAnalytics } from "../key-analytics/KeyAnalytics";
import { ReceptionsAuthTypeAnalytics } from "../receptions-auth-type-analytics";
import { ServiceTypesAnalytics } from "../service-types-analytics";

export const AnalyticsWrapper = () => {
  return (
    <div className="space-y-6">
      {/* Фильтр по дате */}
      <AnalyticsDateFilter />

      {/* Аналитика */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2 ">
          <KeyAnalytics />
        </div>
        <ActivityAnalytics />
        <ServiceTypesAnalytics />
        <ReceptionsAuthTypeAnalytics />
        <DepartmentLoadAnalytics />
      </div>
    </div>
  );
};
