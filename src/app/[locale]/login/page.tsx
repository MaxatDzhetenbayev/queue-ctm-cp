import { LoginForm } from "@/modules/auth/ui/LoginForm";

export default function Home() {
  return (
    <main className="h-screen w-screen max-w-[600px] mx-auto flex items-center justify-center ">
      <LoginForm />
    </main>
  );
}
