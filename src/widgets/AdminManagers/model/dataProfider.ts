import { api } from "@/shared";

interface Manager {
  id: number;
  login: string;
  password: string;
  profile: {
    full_name: string;
    iin: string;
    phone: string;
  };
}
type ManagerFlatProfile = { id: Manager["id"] } & Manager["profile"];

interface Params {
  id: number;
  data: Partial<Manager>;
  previousData?: Manager;
}

const getList = async (): Promise<{ data: Manager[]; total: number }> => {
  const response = await api.get<Manager[]>("/users/managers/center");
  return {
    data: response.data,
    total: response.data.length,
  };
};

const getOne = async (
  res: string,
  params: { id: number }
): Promise<{ data: ManagerFlatProfile }> => {
  const response = await api.get<Manager>(`/users/managers/${params.id}`);
  return {
    data: { id: response.data.id, ...response.data.profile },
  };
};

const update = async (
  res: string,
  params: Params
): Promise<{ data: Manager }> => {
  const response = await api.put<Manager>(
    `/users/managers/${params.id}`,
    params.data
  );
  return { data: response.data };
};

const create = async (
  res: string,
  params: {
    data: Omit<Manager, "id">;
  }
): Promise<{ data: Manager }> => {
  const response = await api.post<Manager>(`/users/manager`, params.data);
  return { data: response.data };
};

const remove = async (params: {
  id: number;
}): Promise<{ data: Manager | null }> => {
  await api.delete(`users/managers/${params.id}`);
  return { data: null }; // Возвращаем `null`, так как удалённого объекта больше нет
};

const dataProvider = {
  getList,
  getOne,
  update,
  create,
  delete: remove,
};

export default dataProvider;
