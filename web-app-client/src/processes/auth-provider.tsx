import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "entities/auth/model/store";

import { getMe } from "entities/user/api";
import { useUserStore } from "entities/user/model/store";

export const AuthUserProvider = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setMe = useUserStore((state) => state.setMe);
  const { error, isLoading, data } = useQuery({ queryKey: ["me"], queryFn: getMe, retry: false });

  useEffect(() => {
    if (data) {
      setMe(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    setIsAuth(false);
    return <Navigate to="/login" />;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
