import { IUser, UserAddress, UserCompany } from "../types";

/**
 * Конструктор класса User.
 * @param {IUser} user - Данные пользователя.
 */
export class User implements IUser {
  /**
   * Creates an instance of User.
   * @param id - ID пользователя.
   * @param email - Email пользователя.
   * @param username - Имя пользователя.
   * @param name - Полное имя пользователя.
   * @param address - Адрес пользователя.
   * @param company - Компания пользователя.
   */
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public name: string,
    public address?: UserAddress,
    public company?: UserCompany
  ) {}
}
