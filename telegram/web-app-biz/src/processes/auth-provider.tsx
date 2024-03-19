import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "entities/auth/model/store";

import { getAccount } from "entities/business/api";
import { useBusinessStore } from "entities/business/model/store";

export const AuthProvider = () => {
  // const isAuth = useAuthStore((state) => state.isAuth);
  // const setIsAuth = useAuthStore((state) => state.setIsAuth);
  // const setAccount = useBusinessStore((state) => state.setAccount);
  // const {
  //   error,
  //   isLoading,
  //   data: accountData,
  // } = useQuery({
  //   queryKey: ["account-biz"],
  //   queryFn: getAccount,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (accountData) {
  //     setAccount(accountData.data);
  //   }
  // }, [accountData]);

  // if (isLoading) {
  //   return <></>;
  // }

  // if (error) {
  //   setIsAuth(false);
  //   return <Navigate to="/auth" />;
  // }

  // if (!isAuth) {
  //   return <Navigate to="/auth" />;
  // }

  return <Outlet />;
};
