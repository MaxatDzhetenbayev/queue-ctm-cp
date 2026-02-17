"use client";

import { Building2, Calendar, FileText, Globe, Home, Menu, Users } from "lucide-react";
import { usePathname as useNextPathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

import { LogoutButton } from "@/modules/auth/ui";
import { useGetUserProfile } from "@/modules/users/application/use-cases";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Link, useRouter } from "@/shared/configs/i18";

// Функция для получения инициалов из полного имени
const getInitials = (fullName: string) => {
  const names = fullName.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
};

interface HeaderProps {
  showNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {
  const { data: userProfile } = useGetUserProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const fullPathname = useNextPathname();

  const navigation = [
    { name: t("navigation.home"), href: "/admin", icon: Home, key: "home" },
    { name: t("navigation.employees"), href: "/admin/employee", icon: Users, key: "employees" },
    { name: t("navigation.departments"), href: "/admin/departments", icon: Building2, key: "departments" },
    { name: t("navigation.absences"), href: "/admin/absences", icon: Calendar, key: "absences" },
    { name: t("navigation.receptions"), href: "/admin/receptions", icon: FileText, key: "receptions" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    // Из полного URL убираем текущий префикс локали (ru|kz),
    // чтобы избежать дублирования вида `/ru/ru/...`
    const normalizedPathname =
      fullPathname.replace(/^\/(ru|kz)(?=\/|$)/, "") || "/";

    router.replace(normalizedPathname, { locale: newLocale });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип/название */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">CTM</h1>
          </div>

          {/* Десктопная навигация */}
          {showNavigation && (
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Правая часть: переключатель языка, аватар пользователя и мобильное меню */}
          <div className="flex items-center space-x-4">
            {/* Переключатель языка */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Globe className="h-5 w-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("ru")}
                  className={locale === "ru" ? "bg-gray-100" : ""}
                >
                  {t("language.russian")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("kz")}
                  className={locale === "kz" ? "bg-gray-100" : ""}
                >
                  {t("language.kazakh")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Аватар пользователя с dropdown */}
            {userProfile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                      {getInitials(userProfile.profile.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm text-gray-700 border-b">
                    {userProfile.profile.fullName}
                  </div>
                  <DropdownMenuItem asChild>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Мобильное меню */}
            {showNavigation && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    {/* Переключатель языка в мобильном меню */}
                    <div className="border-t pt-4 mt-4">
                      <div className="px-3 py-2 text-sm font-medium text-gray-700 mb-2">
                        {t("language.switch")}
                      </div>
                      <button
                        onClick={() => {
                          handleLanguageChange("ru");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-100 ${
                          locale === "ru" ? "bg-gray-100 font-medium" : ""
                        }`}
                      >
                        {t("language.russian")}
                      </button>
                      <button
                        onClick={() => {
                          handleLanguageChange("kz");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-100 ${
                          locale === "kz" ? "bg-gray-100 font-medium" : ""
                        }`}
                      >
                        {t("language.kazakh")}
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
