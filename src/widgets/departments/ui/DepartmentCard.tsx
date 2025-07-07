import { Card, Group, Text } from "@mantine/core";
import { IDepartment } from "../model/types";
import { DepartmentDetail } from "@/features/department/department-detail/ui/DepartmentDetail";

export const DepartmentCard = (data: IDepartment): React.ReactElement => {
  return (
    <Card withBorder shadow="sm" p="lg" radius="md" mt="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text size="lg">{data.name.ru}</Text>
      </Card.Section>
      <Group mt="md">
        <Text size="sm" color="dimmed">
          Онлайн {data.onlineEmployeesCount} / {data.employeesСount}
        </Text>
      </Group>
      <Group mt="md">
        <Text size="sm" color="dimmed">
          Telegram: {data.telegramClient} | Оффлайн: {data.clientServedCount}
        </Text>
      </Group>
      <DepartmentDetail departmentData={data} />
    </Card>
  );
};
