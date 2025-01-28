'use client'
import AdminCommonContainer from "@/components/elements/AdminCommonContainer"
import { PageHeading } from "@/components/ui/title"
import AdminContextProvider from "@/context/AdminContextProvider"
import PrivateView from "@/views/PrivateView"
import WelcomeBanner from "./_partials/WelcomeBanner"

const DashboardIndexPage : React.FC = () => {
  return(
    <> 
      <AdminContextProvider>
        <PrivateView>
          <AdminCommonContainer>
            <PageHeading>Dashboard</PageHeading>
            <div className="mt-4">
              <WelcomeBanner />
            </div>
          </AdminCommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  )
}

export default DashboardIndexPage