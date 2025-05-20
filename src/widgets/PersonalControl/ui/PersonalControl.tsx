import { Box, Button, Card, Flex, Grid, Group, Modal, Paper, Stack, Tabs, Text, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import {
    Bar,
    Pie,
    Line,
} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { AdminManagersTable } from '@/widgets/AdminManagersTable';

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



ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement
);

const DepartmentDetailModal = ({ id }: { id: string }) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Button color="dark" fullWidth mt="md" radius="md" onClick={open}>
                Детальнее
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                size="80%"
                title={`Отдел — ${id}`}
                centered
                padding="lg"
            >
                <Tabs defaultValue="dashboard">
                    <Tabs.List>
                        <Tabs.Tab value="dashboard">Дашборд</Tabs.Tab>
                        <Tabs.Tab value="employees">Сотрудники</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="dashboard">
                        <DepartmentDashboard />
                    </Tabs.Panel>
                    <Tabs.Panel value="employees">
                        <Box>
                            <Title order={2}>Управление менеджерами</Title>
                            <Card withBorder mt={20}>
                                <AdminManagersTable />
                            </Card>
                        </Box>
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    );
};


const DepartmentDashboard = () => {
    const theme = useMantineTheme();

    const data = {
        clientServedTotal: 20,
        sourceTelegram: 10,
        sourceOffline: 20,
        avgServiceTime: '8:16',
        avgLoad: '40%',
        barChart: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
            datasets: [
                {
                    label: 'Клиенты',
                    data: [3, 5, 2, 6, 4],
                    backgroundColor: theme.colors.dark[6],
                },
            ],
        },
        pieChart: {
            labels: ['Telegram', 'Оффлайн'],
            datasets: [
                {
                    data: [10, 20],
                    backgroundColor: [theme.colors.cyan[6], theme.colors.dark[6]],
                },
            ],
        },
        lineChart: {
            labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
            datasets: [
                {
                    label: 'Загруженность',
                    data: [20, 35, 40, 60, 50, 40],
                    borderColor: theme.colors.dark[6],
                    fill: false,
                },
            ],
        },
    };

    return (
        <Grid gutter="md" mt="md">
            <Grid.Col span={2}>
                <Stack h="100%" flex={1} >
                    <Paper flex={1} withBorder radius="md" p="sm">
                        <Flex h={"100%"} direction="column" justify={"space-between"} >
                            <Text size="sm" color="dimmed">
                                Всего обслуженных клиентов
                            </Text>
                            <Title order={2}>{data.clientServedTotal}</Title>
                            <Text size="xs" color="dimmed">за сегодня</Text>
                        </Flex>
                    </Paper>
                    <Paper flex={1} withBorder radius="md" p="sm">
                        <Flex h={"100%"} direction="column" justify={"space-between"} >
                            <Text size="sm" color="dimmed">
                                Источник
                            </Text>
                            <Title order={2}>{data.sourceOffline} / {data.sourceTelegram}</Title>
                            <Text size="xs" color="dimmed">за сегодня</Text>
                        </Flex>
                    </Paper>
                    <Paper flex={1} withBorder radius="md" p="sm">
                        <Flex h={"100%"} direction="column" justify={"space-between"} >
                            <Text size="sm" color="dimmed">
                                Среднее время обслуживания
                            </Text>
                            <Title order={2}>{data.avgServiceTime}</Title>
                            <Text size="xs" color="dimmed">за сегодня</Text>
                        </Flex>
                    </Paper>
                    <Paper flex={1} withBorder radius="md" p="sm">
                        <Flex h={"100%"} direction="column" justify={"space-between"} >
                            <Text size="sm" color="dimmed">
                                Средняя загруженность
                            </Text>
                            <Title order={2}>{data.avgLoad}</Title>
                            <Text size="xs" color="dimmed">за сегодня</Text>
                        </Flex>
                    </Paper>
                </Stack>
            </Grid.Col>
            <Grid.Col span={10} >
                <Grid>
                    <Grid.Col span={6}>
                        <Paper withBorder radius="md" p="sm">
                            <Flex h={230} flex={1} justify="center" align="center">
                                <Bar data={data.barChart} />
                            </Flex>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper withBorder radius="md" p="sm">
                            <Flex h={230} flex={1} justify="center" align="center">
                                <Pie data={data.pieChart} />
                            </Flex>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Paper h={250} withBorder radius="md" p="sm">
                            <Flex h={230} flex={1} justify="center" align="center">
                                <Line data={data.lineChart} />
                            </Flex>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col h={"100%"} span={6} >
                        <Flex flex={1} direction="column" gap={10}>
                            <Flex h={"100%"} gap={10}>
                                <Paper h={"100%"} flex={1} withBorder radius="md" p="sm">
                                    <Flex h={"100%"} direction="column" justify={"space-between"} >
                                        <Text size="sm" color="dimmed">
                                            Всего обслуженных клиентов
                                        </Text>
                                        <Title order={2}>{data.clientServedTotal}</Title>
                                        <Text size="xs" color="dimmed">за сегодня</Text>
                                    </Flex>
                                </Paper>
                                <Paper h={"100%"} flex={1} withBorder radius="md" p="sm">
                                    <Flex h={"100%"} direction="column" justify={"space-between"} >
                                        <Text size="sm" color="dimmed">
                                            Всего обслуженных клиентов
                                        </Text>
                                        <Title order={2}>{data.clientServedTotal}</Title>
                                        <Text size="xs" color="dimmed">за сегодня</Text>
                                    </Flex>
                                </Paper>
                            </Flex>
                            <Flex gap={10}>
                                <Paper h={"100%"} flex={1} withBorder radius="md" p="sm">
                                    <Flex h={"100%"} direction="column" justify={"space-between"} >
                                        <Text size="sm" color="dimmed">
                                            Всего обслуженных клиентов
                                        </Text>
                                        <Title order={2}>{data.clientServedTotal}</Title>
                                        <Text size="xs" color="dimmed">за сегодня</Text>
                                    </Flex>
                                </Paper>
                                <Paper h={"100%"} flex={1} withBorder radius="md" p="sm">
                                    <Flex h={"100%"} direction="column" justify={"space-between"} >
                                        <Text size="sm" color="dimmed">
                                            Всего обслуженных клиентов
                                        </Text>
                                        <Title order={2}>{data.clientServedTotal}</Title>
                                        <Text size="xs" color="dimmed">за сегодня</Text>
                                    </Flex>
                                </Paper>
                            </Flex>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>
    )
}

const EmployeesList = () => {
    return (
        <Flex direction="column" gap={20}>
            <Text>Список сотрудников</Text>
            <Card withBorder>
                <Text>Список сотрудников</Text>
            </Card>
        </Flex>
    )
}
