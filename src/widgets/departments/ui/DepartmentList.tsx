import { Flex, Grid } from "@mantine/core";
import { DepartmentCard } from "./DepartmentCard";
import { IDepartment } from "../model/types";
import { DepartmentCreate } from "@/features";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";

export const DepartmentList = () => {
  const { data } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await api.get("/departments");
      return response.data;
    },
  });

  return (
    <Flex direction={"column"} gap={20}>
      <DepartmentCreate />
      <Grid>
        {data?.map((department) => (
          <Grid.Col key={department.id}>
            <DepartmentCard {...department} />
          </Grid.Col>
        ))}
      </Grid>
    </Flex>
  );
};
