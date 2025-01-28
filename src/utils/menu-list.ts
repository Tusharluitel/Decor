import { routes } from "@/lib/routes";
import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Split,
  CalendarCog,
  PackageOpen
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: routes.ADMIN_DASHBOARD,
          label: "Dashboard",
          icon: LayoutGrid,
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: routes.OPERATIONS_INDEX,
          label: "Operations",
          icon: CalendarCog,
        },
        {
          href: routes.CATEGORIES_INDEX,
          label: "Categories",
          icon: Split,
        },
        {
          href: routes.PRODUCTS_INDEX,
          label: "Products",
          icon: PackageOpen,
        },

      ]
    },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}