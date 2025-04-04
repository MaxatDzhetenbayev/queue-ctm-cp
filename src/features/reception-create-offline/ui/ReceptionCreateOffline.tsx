"use client"
import { api } from '@/shared';
import { queryClient } from '@/shared/providers/query-providers';
import { Button, Flex, Input, Modal, Select, Title } from '@mantine/core'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


interface FormData {
    full_name: string;
    iin: string;
    phone: string,
    visitor_type_id: string,
    service_id: number | null;
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

    const { control, handleSubmit, reset, watch } = useForm<FormData>();

    const iin = watch('iin')
    const [debouncedIin] = useDebouncedValue(iin, 1000);


    const { data: userByIin, isSuccess: isUserFindSuccess, isLoading: isUserFindLoading, } = useQuery({
        queryKey: ['finded-user-by-iin', debouncedIin],
        queryFn: async () => {
            const res = await api.get('/users/iin/' + iin)
            return res.data
        },
        enabled: !!debouncedIin,
        retry: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (isUserFindSuccess) {
            reset((prev) => ({
                ...prev,
                full_name: userByIin.full_name,
                phone: userByIin.phone,
                visitor_type_id: String(userByIin.visitor_type_id),
                service_id: userByIin.service_id
            }))
        }
    }, [userByIin, isUserFindSuccess, reset])


    const { mutate } = useMutation({
        mutationKey: ["receptions-create-offline"],
        mutationFn: async (data: FormData) => {
            const res = await api.post("/receptions/offline", data);
            return res
        },
        onSuccess: () => {
            reset()
            close()
            queryClient.invalidateQueries({
                queryKey: ["receptions-list"],
            });
        },
        onError: (error: AxiosError) => {
            if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                (error.response.data.message as string[]).forEach((msg: string) => {
                    toast.error(msg)
                })
            }
        }
    });

    const onSubmit = (data: FormData) => mutate(data);

    return (
        <>
            <Modal opened={opened} onClose={close} size="xl">
                <Title order={2}>Создание записи оффлайн</Title>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Flex direction="column" gap={15} mt={20}>
                        <Controller
                            name="iin"
                            control={control}
                            render={({ field }) => <Input maxLength={12} placeholder="Введите ИИН"  {...field} />}
                        />
                        {!!debouncedIin && !isUserFindLoading && (
                            <>
                                {isUserFindSuccess ? (
                                    <>
                                        <Input disabled value={userByIin.full_name} placeholder="Введите полное ФИО" />
                                        <Input disabled value={userByIin.phone} placeholder="Введите номер телефона" />
                                        <Select
                                            disabled
                                            value={userByIin.visitor_type_id}
                                            placeholder="Тип посетителя"
                                            data={[
                                                { value: "1", label: "Работодатель" },
                                                { value: "2", label: "Соискатель" },
                                            ]}
                                        />
                                        <Controller
                                            name="service_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={String(field.value)}
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    placeholder="Выберите сервис"
                                                    data={!isServicesLoading && managerServices.map((s: { id: number, name: { [key: string]: string } }) => ({
                                                        value: String(s.id),
                                                        label: s.name["ru"]
                                                    })) || []}
                                                />
                                            )}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Controller
                                            name="full_name"
                                            control={control}
                                            render={({ field }) => <Input placeholder="Введите полное ФИО"  {...field} />}
                                        />
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => <Input maxLength={11} placeholder="Введите номер телефона"  {...field} />}
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
                                                        { value: "1", label: "Работодатель" },
                                                        { value: "2", label: "Соискатель" },
                                                    ]}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="service_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={String(field.value)}
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    placeholder="Выберите сервис"
                                                    data={!isServicesLoading && managerServices.map((s: { id: number, name: { [key: string]: string } }) => ({
                                                        value: String(s.id),
                                                        label: s.name["ru"]
                                                    })) || []}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <Button type='submit' bg="dark">Создать запись</Button>
                    </Flex>
                </form>
            </Modal>
            <Button variant="default" onClick={open}>Создать запись</Button>
        </>
    )
}
