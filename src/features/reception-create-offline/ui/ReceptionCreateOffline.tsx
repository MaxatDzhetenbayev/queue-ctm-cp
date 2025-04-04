"use client"
import { api } from '@/shared';
import { queryClient } from '@/shared/providers/query-providers';
import { Button, Flex, Input, Modal, Select, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';


interface FormData {
    full_name: string;
    iin: string;
    phone: string,
    visitor_type_id: string,
    service_id: number;
}



export const ReceptionCreateOffline = () => {

    const [opened, { open, close }] = useDisclosure(false);


    const { data: managerServices, isLoading: isServicesLoading } = useQuery({
        queryKey: ['manager-services-list'],
        queryFn: async () => {
            const res = await api.get('/services/manager')
            return res.data
        }
    })

    const { control, handleSubmit, } = useForm<FormData>();

    const { mutate } = useMutation({
        mutationKey: ["receptions-create-offline"],
        mutationFn: async (data: FormData) => {
            await api.post("/receptions/offline", data);
        },
        onSuccess: () => {
            close()
            queryClient.invalidateQueries({
                queryKey: ["receptions-list"],
            });
        },
    });

    const onSubmit = (data: FormData) => mutate(data);


    return (
        <>
            <Modal opened={opened} onClose={close} size="xl">
                <Title order={2}>Создание записи оффлайн</Title>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Flex direction="column" gap={15} mt={20}>
                        <Controller
                            name="full_name"
                            control={control}
                            render={({ field }) => <Input placeholder="Введите полное ФИО"  {...field} />}
                        />
                        <Controller
                            name="iin"
                            control={control}
                            render={({ field }) => <Input placeholder="Введите ИИН"  {...field} />}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <Input placeholder="Введите номер телефона"  {...field} />}
                        />
                        <Controller
                            name="visitor_type_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={String(field.value)}
                                    onChange={(value) => field.onChange(Number(value))}
                                    placeholder="Выберите тип посетителя"
                                    defaultValue="2"
                                    data={[
                                        {
                                            value: "1",
                                            label: "Работодатель"
                                        },
                                        {
                                            value: "2",
                                            label: "Соискатель"
                                        },
                                    ]}
                                />
                            )} />
                        <Controller
                            name="service_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={String(field.value)}
                                    onChange={(value) => field.onChange(Number(value))}
                                    placeholder="Выберите сервис"
                                    data={!isServicesLoading && managerServices.map((s: { id: number, name: { [key: string]: string } }) => (
                                        {
                                            value: String(s.id),
                                            label: s.name["ru"]
                                        }
                                    ))
                                        || []}
                                />
                            )} />
                        <Button type='submit' bg="dark">Создать запись</Button>
                    </Flex>
                </form>
            </Modal>
            <Button variant="default" onClick={open}>Создать запись</Button>
        </>
    )
}
