import SidebarProvider from "./AdminSidebarContextProvider"

const AdminContextProvider : React.FC<{
  children : React.ReactNode
}> = ({
  children
}) => {
  return(
    <>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </>
  )
}

export default AdminContextProvider