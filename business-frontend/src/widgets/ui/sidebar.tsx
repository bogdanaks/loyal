import {
  Bitcoin,
  Briefcase,
  ChevronLeft,
  HelpCircle,
  LogOut,
  QrCode,
  Store,
  Ticket,
  UserRoundCog,
  UsersRound,
  Wallet2,
} from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { useAuthStore } from "entities/auth/model/store"

import { removeAuthToken } from "shared/libs/ls"
import { cn } from "shared/libs/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "shared/ui/tooltip"

const links = [
  {
    title: "Клиенты",
    icon: <UsersRound size={20} />,
    path: "/clients",
  },
  {
    title: "Сканирование",
    icon: <QrCode size={20} />,
    path: "/scan",
  },
  {
    title: "Мой бизнес",
    icon: <Store size={20} />,
    path: "/business",
  },
  {
    title: "Программа лояльности",
    icon: <Ticket size={20} />,
    path: "/loyal",
  },
  {
    title: "Аккаунт",
    icon: <UserRoundCog size={20} />,
    path: "/account-settings",
  },
  {
    title: "Помощь",
    icon: <HelpCircle size={20} />,
    path: "/help",
  },
  {
    title: "Оплата",
    icon: <Wallet2 size={20} />,
    path: "/pay",
  },
]

export const Sidebar = () => {
  const location = useLocation()
  const setIsAuth = useAuthStore((store) => store.setIsAuth)
  const [collapsed, setCollapsed] = useState(false)

  const handleExit = () => {
    removeAuthToken()
    setIsAuth(false)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="flex">
      <ul className="sm:hidden absolute bottom-0 left-0 grid grid-cols-3 h-14 px-4 w-full bg-background text-xs z-10">
        <Link to="/clients" className="flex flex-col items-center justify-center">
          <li
            className={cn("flex flex-col items-center justify-center opacity-50", {
              "opacity-100": location.pathname.includes("clients"),
            })}
          >
            <UsersRound size={20} />
            <span>Клиенты</span>
          </li>
        </Link>
        <Link to="/scan" className="flex flex-col items-center justify-center">
          <li
            className={cn("flex flex-col items-center justify-center opacity-50", {
              "opacity-100": location.pathname.includes("scan"),
            })}
          >
            <QrCode size={20} />
            <span>Скан</span>
          </li>
        </Link>
        <Link to="/account-mobile" className="flex flex-col items-center justify-center">
          <li
            className={cn("flex flex-col items-center justify-center opacity-50", {
              "opacity-100": [
                "/account-mobile",
                "/business",
                "/loyal",
                "/help",
                "/pay",
                "/account-settings",
              ].includes(location.pathname),
            })}
          >
            <Briefcase size={20} />
            <span>Аккаунт</span>
          </li>
        </Link>
      </ul>
      <TooltipProvider>
        <div
          className={cn(
            "flex flex-col p-4 bg-background transition-all delay-100 sticky left-0 max-sm:hidden",
            {
              "w-20": collapsed,
              "w-72": !collapsed,
            }
          )}
        >
          <h2 className="min-h-12 flex items-center text-3xl font-bold text-nowrap delay-200 gap-2">
            <span className="min-w-[48px] flex items-center justify-center">
              <Bitcoin size={30} />
            </span>
            <span
              className={cn("delay-100 transition-all", {
                "opacity-100": !collapsed,
                "opacity-0": collapsed,
              })}
            >
              Баллами
            </span>
          </h2>
          <ul className="flex flex-col mt-4 gap-2 font-medium text-sm h-full text-slate-600">
            {links.map((link) => (
              <li className="w-full h-10 flex items-center text-nowrap" key={link.title}>
                <Link
                  to={link.path}
                  className={cn(
                    "w-full h-full flex flex-row items-center gap-4 hover:bg-muted rounded-lg px-4 duration-75",
                    {
                      "bg-primary-foreground hover:bg-primary-foreground":
                        location.pathname === link.path,
                    }
                  )}
                >
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger>
                      <span className="min-w-[20px] min-h-[20px]">{link.icon}</span>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        <p>{link.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  <span
                    className={cn("delay-100 transition-all", {
                      "opacity-100": !collapsed,
                      "opacity-0 pointer-events-none": collapsed,
                    })}
                  >
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
            <li
              onClick={handleExit}
              className="mt-auto w-full h-10 flex flex-row items-center gap-2 hover:bg-muted rounded-lg px-4 duration-75 cursor-pointer"
            >
              <span className="min-w-[20px] min-h-[20px]">
                <LogOut size={20} />
              </span>
              <span
                className={cn("delay-100 transition-all", {
                  "opacity-100": !collapsed,
                  "opacity-0": collapsed,
                })}
              >
                Выйти
              </span>
            </li>
            <li
              onClick={handleCollapse}
              className="w-full h-10 flex flex-row items-center gap-2 hover:bg-muted rounded-lg px-4 duration-75 cursor-pointer"
            >
              <span className="min-w-[20px] min-h-[20px]">
                <ChevronLeft size={20} style={{ transform: collapsed ? "rotate(180deg)" : "" }} />
              </span>
              <span
                className={cn("delay-100 transition-all", {
                  "opacity-100": !collapsed,
                  "opacity-0": collapsed,
                })}
              >
                Свернуть
              </span>
            </li>
          </ul>
        </div>
      </TooltipProvider>
    </div>
  )
}
