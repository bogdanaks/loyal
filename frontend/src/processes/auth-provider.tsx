import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAuthStore } from "entities/auth/model/store"

import { getAccount } from "entities/account/api"
import { useAccountStore } from "entities/account/model/store"

export const AuthProvider = () => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setAccount = useAccountStore((state) => state.setAccount)
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
