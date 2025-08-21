import React from "react";

import { ActivityAnalytics } from "./ActivityAnalytics";
import { DepartmentLoadAnalytics } from "./DepartmentLoadAnalytics";
import { KeyAnalytics } from "./KeyAnalytics";
import { ServiceTypesAnalytics } from "./ServiceTypesAnalytics";

export const AnalyticsWrapper = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="col-span-1 md:col-span-2 ">
        <KeyAnalytics />
      </div>
      <ActivityAnalytics />
      <ServiceTypesAnalytics />
        <DepartmentLoadAnalytics />
    </div>
  );
};
