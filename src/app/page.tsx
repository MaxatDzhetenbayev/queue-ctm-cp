import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users/profile`,
    {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  const data = res.ok ? await res.json() : null;
  const user = data;

  console.log(user.role);

  if (user || user?.role === "ADMIN") {
    redirect("/admin");
  } else if (user?.role === "MANAGER") {
    redirect("/dashboard");
  }
}
