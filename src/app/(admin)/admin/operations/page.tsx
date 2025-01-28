'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import AdminCommonContainer from "@/components/elements/AdminCommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { Button } from "@/components/ui/button"
import { PageHeading } from "@/components/ui/title"
import AdminContextProvider from "@/context/AdminContextProvider"
import { routes } from "@/lib/routes"
import PrivateView from "@/views/PrivateView"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

const OpearationIndexPage : React.FC = () => {
  
  const [showOperationModal , setShowOperationModal] = useState<boolean>(false);
  
  
  return(
    <>
      <AdminContextProvider>
        <PrivateView>
          <AdminCommonContainer>
            <div className="flex justify-between">
              <div>
                <PageHeading>Operations</PageHeading>
                <BreadCrumbNav 
                  breadCrumbItems={[
                    {title : 'Dashboard' , href:routes.ADMIN_DASHBOARD},
                    {title : 'Operations' , href:routes.ADMIN_DASHBOARD},
                  ]}
                />
              </div>
              <Button>
                <PlusIcon />
                Add Operations
              </Button>
            </div>
            <ContentContainer>
              hello
            </ContentContainer>
          </AdminCommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  )
}

export default OpearationIndexPage