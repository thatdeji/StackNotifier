"use client";
import Link from "next/link";
import { mainMenuItem } from "./DashboardLayout.data";
import { IDashboardLayoutProps } from "./DashboardLayout.types";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "./DashboardLayout.vectors";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="w-full h-dvh flex static lg:fixed top-0 left-0">
      <aside
        className={cn([
          "w-full lg:max-w-64 lg:flex-shrink-0 h-dvh overflow-y-auto fixed z-aside lg:static left-0 top-0 lg:border-r lg:border-b lg:border-r-gray-200",
          {
            "pointer-events-auto": isSidebarOpen,
            "pointer-events-none lg:pointer-events-auto": !isSidebarOpen,
          },
        ])}
      >
        <div
          className={cn(
            [
              "w-full h-full absolute bg-black bg-opacity-40 z-0 lg:hidden transition-all duration-300",
            ],
            {
              "opacity-100": isSidebarOpen,
              "opacity-0": !isSidebarOpen,
            }
          )}
        ></div>
        <div
          className={cn([
            "max-w-64 lg:max-w-full h-full overflow-y-auto bg-white relative z-10 px-6 pt-6 lg:pt-16 pb-11 lg:pb-12 flex flex-col justify-between transition-all duration-300 -translate-x-full lg:translate-x-0",
            {
              "translate-x-0": isSidebarOpen,
              "-translate-x-full lg:translate-x-0": !isSidebarOpen,
            },
          ])}
        >
          <div className="flex flex-col gap-4">
            <button
              className="[&_path]:stroke-gray-800 lg:hidden"
              onClick={handleToggleMenu}
            >
              <CloseIcon />
            </button>
            <ul className="list-none flex flex-col gap-2">
              {mainMenuItem.map((item, index) => (
                <li key={index} className="w-full">
                  <Link
                    className={cn(
                      [
                        "flex items-center gap-3 p-3 rounded-lg hover:bg-navy-06 transition-all duration-300 text-base font-medium text-gray-600 [&_path]:stroke-gray-600  hover:bg-gray-50",
                      ],
                      {
                        "bg-gray-50 text-gray-800 [&_path]:stroke-gray-950":
                          pathname === item.link,
                      }
                    )}
                    href={item.link}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              return router.push("/sign-in");
            }}
          >
            <span>Sign out</span>
          </Button>
        </div>
      </aside>
      <main className="w-full p-6 lg:px-12 lg:py-10 flex flex-col gap-6 flex-grow overflow-x-hidden">
        <div className="w-full flex gap-4 items-center">
          <button className="block lg:hidden" onClick={handleToggleMenu}>
            <HamburgerIcon />
          </button>
          {mainMenuItem.find((item) => item.link === pathname) ? (
            <h1 className="heading-one capitalize">
              {pathname.replace("/", "")}
            </h1>
          ) : null}
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
