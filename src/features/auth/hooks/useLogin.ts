import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ILoginData {
  login: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: ILoginData) => api.post("/auth/login", data),
    onSuccess: (res) => {
      const { user } = res.data;
      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    },
  });
};

export const checkAuth = async () => {
  const cookie = cookies().toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      credentials: "include",
    }
  );
  const user = await res.json();
  console.log("user:", user.role);

  if (!user) {
    redirect("/login");
  }
  if (user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
};
