import { Calendar, Home, Users } from "lucide-react";
import React from "react";

import { LogoutButton } from "@/modules/auth/ui";
import { Link } from "@/shared/configs/i18";

const navigation = [
  { name: "Главная", href: "/admin", icon: Home },
  { name: "Персонал", href: "/admin/employee", icon: Users },
  { name: "Отсутствия", href: "/admin/absences", icon: Calendar },
];

export const Header = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Кнопка выхода справа */}
          <div className="flex items-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
