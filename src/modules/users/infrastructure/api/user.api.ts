import { IUser } from "@/modules/users/types";
import { axiosApi } from "@/shared/lib/client";

/**
 * API для работы с пользователями.
 *
 * @returns {Promise<IUser>} Данные пользователя.
 */
export async function fetchUserProfile(): Promise<IUser> {
  const response = await axiosApi.get<IUser>("/users/1");
  return response.data;
}

/**
 * Обновляет профиль пользователя.
 * @param {IUser["id"]} id - Идентификатор пользователя.
 * @param {Partial<IUser>} user - Данные пользователя для обновления.
 * @returns {Promise<IUser>} Обновленные данные пользователя.
 */
export async function updateUserProfile(
  id: IUser["id"],
  user: Partial<Exclude<IUser, IUser["id"]>>
): Promise<IUser> {
  const response = await axiosApi.put<IUser>(`/users/${id}`, user);
  return response.data;
}
