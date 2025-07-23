"use client";
import React from "react";
import { useReceptionDetail } from "../hooks";
import {
  Box,
  Button,
  Flex,
  Grid,
  // Input,
  Modal,
  Paper,
  Text,
  // Textarea,
  Title,
  // UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { normalizeStatus } from "@/shared";
// import { MdEdit } from "react-icons/md";
// import { useForm } from "react-hook-form";

export const ReceptionDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useReceptionDetail(id);
  const [opened, { open, close }] = useDisclosure(false);

  // const [isEditing, setIsEditing] = useState(false);

  // const handleChangeEditStatus = () => {
  //   setIsEditing((prev) => !prev);
  // };

  // type FormData = {
  //   fullName: string;
  //   iin: string;
  //   phone: string;
  //   comment: string;
  // };

  // const { register, handleSubmit, reset } = useForm<FormData>({
  //   defaultValues: {
  //     fullName: data?.user?.profile?.fullName || "",
  //     iin: data?.user?.profile?.iin || "",
  //     phone: data?.user?.profile?.phone || "",
  //     comment: data?.comment || "",
  //   },
  // });

  // const handleFormSubmit = (formData: FormData) => {
  //   console.log("Form submitted with data:", formData);
  //   // Here you can handle the form submission, e.g., send it to an API
  // };

  // useEffect(() => {
  //   if (data) {
  //     reset({
  //       fullName: data.user.profile.fullName || "",
  //       iin: data.user.profile.iin || "",
  //       phone: data.user.profile.phone || "",
  //       comment: data.comment || "",
  //     });
  //   }
  // }, [data, reset]);

  return (
    <>
      <Modal centered opened={opened} size={"xl"} onClose={close}>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <Box>
            {/* <form onSubmit={handleSubmit(handleFormSubmit)}> */}
            <Flex gap={20}>
              <Flex flex={1} direction={"column"}>
                <Flex justify={"space-between"} align={"center"}>
                  <Title order={2} c={"dimmed"} size={18}>
                    Личные данные
                  </Title>
                  {/* <UnstyledButton c={"blue"} onClick={handleChangeEditStatus}>
                    <Flex align={"center"} gap={5}>
                      <MdEdit size={21} />
                      {isEditing ? "Сохранить" : "Редактировать"}
                    </Flex>
                  </UnstyledButton> */}
                </Flex>
                <Paper withBorder p={20} mt={16}>
                  <Title c={"dimmed"} size={16} order={3}>
                    ФИО
                  </Title>
                  {/* {isEditing ? (
                    <Input type="text" {...register("fullName")} />
                  ) : ( */}
                  <Text>{data?.user?.profile?.fullName}</Text>
                  {/* )} */}
                  <Title mt={6} c={"dimmed"} size={16} order={3}>
                    ИИН
                  </Title>
                  {/* {isEditing ? (
                    <Input type="text" {...register("iin")} />
                  ) : ( */}
                  <Text>{data?.user?.profile?.iin}</Text>
                  {/* )} */}
                  <Title mt={6} c={"dimmed"} size={16} order={3}>
                    Телефон
                  </Title>
                  {/* {isEditing ? (
                    <Input type="text" {...register("phone")} />
                  ) : ( */}
                  <Text>{data?.user?.profile?.phone}</Text>
                  {/* )} */}
                </Paper>
                <Title order={2} c={"dimmed"} size={18} mt={16}>
                  Информация о записи
                </Title>
                <Paper withBorder p={20} mt={8}>
                  <Grid>
                    <Grid.Col span={6}>
                      <Title c={"dimmed"} size={16} order={3}>
                        Дата записи
                      </Title>
                      <Text>
                        {new Date(data?.date as string).toLocaleDateString(
                          "ru-RU"
                        )}
                      </Text>
                      <Title mt={6} c={"dimmed"} size={16} order={3}>
                        Статус
                      </Title>
                      <Text>{normalizeStatus(data?.status)}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Title c={"dimmed"} size={16} order={3}>
                        Время записи
                      </Title>
                      <Text>
                        {new Date(data?.time as string).toLocaleTimeString(
                          "ru-RU",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Text>
                      <Title mt={6} c={"dimmed"} size={16} order={3}>
                        Выбранный сервис
                      </Title>
                      <Text>{data?.service?.name?.["ru"]}</Text>
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Flex>
              <Box w={300} style={{ flexShrink: 0 }}>
                <Title order={2} c={"dimmed"} size={18}>
                  Комментарий
                </Title>
                <Paper
                  h={"91.2%"}
                  withBorder
                  p={
                    // isEditing ? 0 :
                    20
                  }
                  mt={16}
                >
                  {/* {isEditing ? (
                      <Textarea
                        maxLength={605}
                        autosize
                        {...register("comment")}
                      />
                    ) : ( */}
                  <Text>
                    {data?.comment ? data.comment : "Нет комментария"}
                  </Text>
                  {/* )} */}
                </Paper>
              </Box>
            </Flex>
            {/* </form> */}
            <Box></Box>
          </Box>
        )}
      </Modal>
      <Button variant="default" onClick={open}>
        Детальная информация
      </Button>
    </>
  );
};
