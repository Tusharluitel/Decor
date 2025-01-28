import CommonContainer from "@/components/elements/CommonContainer"
import AdminContextProvider from "@/context/AdminContextProvider"
import PrivateView from "@/views/PrivateView"

const CategoriesIndexPage : React.FC = () => {
  return(
    <>
      <AdminContextProvider>
        <PrivateView>
          <CommonContainer>
            
          </CommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  )
}

export default  CategoriesIndexPage