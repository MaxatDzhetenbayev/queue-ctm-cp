import { Box, Button, Card, Flex, Grid, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'


const mockData: IDepartment[] = [
    {
        id: '1',
        name: { ru: 'Отдел по работе с соискателями', en: 'Sales Department' },
        employeesСount: 10,
        onlineEmployeesCount: 8,
        clientServedCount: 100,
        telegramClient: 50,
        offlineClient: 50,
        avgServiceTime: '5 мин',
        avgLoadTime: '2 мин',
    },
    {
        id: '2',
        name: { ru: 'Отдел по работе с работодателями', en: 'Support Department' },
        employeesСount: 5,
        onlineEmployeesCount: 4,
        clientServedCount: 200,
        telegramClient: 100,
        offlineClient: 100,
        avgServiceTime: '10 мин',
        avgLoadTime: '3 мин',
    },
]

export const PersonalControl = () => {
    return (
        <Grid>
            {mockData.map((department) => (
                <Grid.Col key={department.id}>
                    <DepartmentCard {...department} />
                </Grid.Col>
            ))}
        </Grid>
    )
}


interface IDepartment {
    id: string;
    name: { [key: string]: string };
    employeesСount: number;
    onlineEmployeesCount: number;
    clientServedCount: number;
    telegramClient: number;
    offlineClient: number;
    avgServiceTime: string;
    avgLoadTime: string;
}

const DepartmentCard = (data: IDepartment): React.ReactElement => {
    return (
        <Card withBorder shadow="sm" p="lg" radius="md" mt="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Text size="lg">
                    {data.name.ru}
                </Text>
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
            <Group mt="md">
                <Text size="sm" color="dimmed">
                    Загрузка: {data.avgLoadTime}
                </Text>
            </Group>
            <Group mt="md">
                <Text size="sm" color="dimmed">
                    Среднее время обслуживания: {data.avgServiceTime}
                </Text>
            </Group>
            <DepartmentDetailModal id={data.id} />
        </Card>
    )
}


const DepartmentDetailModal = ({ id }: { id: string }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const departmentDetailMockData = mockData.find((department) => department.id === id);


    return (
        <>
            <Button color="dark" fullWidth mt="md" radius="md" onClick={open}>
                Детальнее
            </Button>
            <Modal opened={opened} onClose={close} size="70%" title={`Отдел — ${id}`} centered>
                <Stack >
                    {/* Общее о сотрудниках */}
                    <Paper withBorder p="md" radius="md">
                        <Group >
                            <Group >
                                {/* <IconUsers size={20} /> */}
                                <Text size="sm">Всего сотрудников:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.employeesСount}</Text>
                        </Group>
                        <Group mt="xs">
                            <Group >
                                {/* <IconUser size={20} /> */}
                                <Text size="sm">Онлайн сейчас:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.onlineEmployeesCount}</Text>
                        </Group>
                    </Paper>

                    {/* Обслуженные клиенты */}
                    <Paper withBorder p="md" radius="md">
                        <Group >
                            <Group >
                                {/* <IconUsers size={20} /> */}
                                <Text size="sm">Обслужено клиентов:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.clientServedCount}</Text>
                        </Group>
                        <Group mt="xs">
                            <Group >
                                {/* <IconDeviceMobile size={20} /> */}
                                <Text size="sm">Через Telegram:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.telegramClient}</Text>
                        </Group>
                        <Group mt="xs">
                            <Group >
                                {/* <IconBuilding size={20} /> */}
                                <Text size="sm">Оффлайн:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.offlineClient}</Text>
                        </Group>
                    </Paper>

                    {/* Время и нагрузка */}
                    <Paper withBorder p="md" radius="md">
                        <Group >
                            <Group >
                                {/* <IconClock size={20} /> */}
                                <Text size="sm">Среднее время обслуживания:</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.avgServiceTime}</Text>
                        </Group>
                        <Group mt="xs">
                            <Group >
                                {/* <IconActivity size={20} /> */}
                                <Text size="sm">Средняя загрузка (время ожидания):</Text>
                            </Group>
                            <Text >{departmentDetailMockData?.avgLoadTime}</Text>
                        </Group>
                    </Paper>
                </Stack>
            </Modal>
        </>
    );
};
