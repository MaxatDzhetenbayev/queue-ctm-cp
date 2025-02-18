import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import Link from "next/link";

	export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-gray-100 flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <div className="text-lg font-bold mb-8">Навигация</div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/dashboard"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold ">Главная</div>
            <div className="flex items-center space-x-4">
              <ProfileCard />
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="px-6 pt-6 flex max-w-[1680px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
