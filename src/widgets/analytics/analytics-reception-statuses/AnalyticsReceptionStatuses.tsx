import { ProgressStats } from "@/entities";
import { Statuses } from "@/features";
import { api, normalizeStatus, ProgressType } from "@/shared";
import { Center, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const AnalyticsReceptionStatuses = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["absences-reception-statuses"],
    queryFn: async () =>
      (await api.get("analytics/statistics/reception-status")).data,
  });

  return (
    <>
      {isLoading ? (
        <Paper withBorder p={20} h={320}>
          <Center h="100%">
            <Title order={3}>Загрузка данных</Title>
          </Center>
        </Paper>
      ) : (
        <>
          {isSuccess && data && (
            <ProgressStats
              title="Статусы заявок"
              type={ProgressType.NUMBER}
              data={(() => {
                const res: { title: string; value: number }[] = [];
                for (const item in data) {
                  res.push({
                    title: normalizeStatus(item as Statuses),
                    value: data[item],
                  });
                }
                return res;
              })()}
            />
          )}
        </>
      )}
    </>
  );
};
