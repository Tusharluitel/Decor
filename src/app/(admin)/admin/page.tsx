'use client'

import { decorAccessToken } from "@/helpers/token.helper"
import { routes } from "@/lib/routes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AdminIndexPage : React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    if(decorAccessToken()){
      router.replace(routes.ADMIN_DASHBOARD)
    }else{
      router.replace(routes.ADMIN_LOGIN)
    }
  },[])
  return(
    <>
      hello
    </>
  )
}

export default AdminIndexPage