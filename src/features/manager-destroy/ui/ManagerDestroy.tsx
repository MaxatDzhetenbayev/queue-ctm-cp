import { api } from '@/shared'
import { queryClient } from '@/shared/providers/query-providers'
import { Button, Flex, Modal, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export const ManagerDestroy = ({ id }: { id: number }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const { mutate: handleManagerDestroy } = useMutation({
        mutationKey: ['manager-destroy'],
        mutationFn: async (id: number) => {
            await api.delete(`/users/managers/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['managers'] })
            close()
        }
    })


    return (
        <>
            <Modal opened={opened} onClose={close} >
                <Title order={2}>Вы точно хотите удалить этого менеджера?</Title>
                <Flex direction="row" gap={20} mt={40}>
                    <Button onClick={() => handleManagerDestroy(id)} bg="red" flex={1}>Да</Button>
                    <Button onClick={close} variant='default' flex={1}>Отменить</Button>
                </Flex>
            </Modal>
            <Button bg="red" w="100%" onClick={open}>Удалить</Button>
        </>
    )
}
