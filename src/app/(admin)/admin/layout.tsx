'use client'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthContextProvider"

const AdminLayout : React.FC<{
  children : React.ReactNode
}> = ({
  children
}) => {
  return(
    <>
      <AuthProvider>
        <>
          {children}
          <Toaster />
        </>
      </AuthProvider>
    </>
  )
}

export default AdminLayout