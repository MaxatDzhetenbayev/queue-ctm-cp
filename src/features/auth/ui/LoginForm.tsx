"use client";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { AxiosError } from "axios";

export const LoginForm = () => {
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      login,
      password,
    });
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    return "An unknown error occurred";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Добро пожаловать!
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-600"
            >
              Логин:
            </label>
            <input
              id="login"
              value={login}
              onChange={(e) => setlogin(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{getErrorMessage(error)}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
