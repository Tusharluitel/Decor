'use client'
import { AuthProvider } from "@/context/AuthContextProvider"

const AdminLayout : React.FC<{
  children : React.ReactNode
}> = ({
  children
}) => {
  return(
    <>
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  )
}

export default AdminLayout