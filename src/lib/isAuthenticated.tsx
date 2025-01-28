"use client";


import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { routes } from "@/lib/routes";
import Loader from "@/components/elements/Loader";
import { AuthContext } from "@/context/AuthContextProvider";
import { decorAccessToken } from "@/helpers/token.helper";



const isAuthenticated = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { loading } = useContext(AuthContext);

    const token = decorAccessToken()

    useEffect(() => {
      if (!loading && !decorAccessToken()) {
        router.push(routes.ADMIN_LOGIN);
      }
    }, [decorAccessToken(), loading, router]);

    if (loading) return (
    <div className="fixed w-full h-full flex justify-center items-center bg-white">
      <Loader />
    </div>
  );
    return decorAccessToken() ? <WrappedComponent {...props} /> : null;
  };
  
  return Wrapper;
};

export default isAuthenticated;