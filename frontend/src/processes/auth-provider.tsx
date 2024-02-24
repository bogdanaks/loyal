import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAppStore } from "app/store"

import { useAuthStore } from "entities/auth/model/store"

import { getAccount } from "entities/account/api"
import { useAccountStore } from "entities/account/model/store"

export const AuthProvider = () => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setAccount = useAccountStore((state) => state.setAccount)
  const setType = useAppStore((state) => state.setType)

  const {
    error,
    isLoading,
    data: accountData,
  } = useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    retry: false,
  })

  useEffect(() => {
    if (Telegram.WebApp.initData?.length) {
      setType("telegram")
    }
  }, [])

  useEffect(() => {
    if (accountData) {
      setAccount(accountData.data)
    }
  }, [accountData])

  if (isLoading) {
    return <></>
  }

  if (error || !isAuth) {
    setIsAuth(false)
    return <Navigate to="/login" />
  }

  return <Outlet />
}
