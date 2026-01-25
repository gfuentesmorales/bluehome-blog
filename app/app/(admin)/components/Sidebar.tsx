"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { icon: "dashboard", label: "Dashboard", url: "/admin", type: "filled" },
    { icon: "document_scanner", label: "Posts", url: "/admin/post", type: "outlined" },
    { icon: "sell", label: "Categories", url: "/admin/category", type: "outlined" },
    { icon: "group", label: "Users", url: "/admin/user", type: "outlined" },
  ];

  return (
    <aside className="w-64 bg-white p-6 h-screen sticky top-0 border-r border-gray-200 flex flex-col">

      {/* PERFIL */}
      <div className="flex items-center space-x-3 mb-6">
        <div
          className="w-10 h-10 rounded-full bg-gray-300"
          style={{
            backgroundImage:
              "url('https://ui-avatars.com/api/?name=UserName')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div>
          <p className="font-semibold">Admin Name</p>
          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-1 flex-1">
        {menu.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.label}
              href={item.url}
              className={`
                flex items-center space-x-3 p-3 rounded-lg
                transition-colors
                ${isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <span
                className={`material-icons${item.type === "outlined" ? "-outlined" : ""} text-base`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="
          mt-auto flex items-center space-x-3 p-3 rounded-lg
          text-red-600 hover:bg-red-50 transition-colors mb-4
          cursor-pointer
        "
      >
         <span className="material-icons-outlined text-base">
          power_off
        </span>
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
