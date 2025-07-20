import { createNavigation } from "next-intl/navigation";
import { routing } from "@i18/";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
