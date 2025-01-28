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
import OperationActionModal from "./_partials/OperationsActionModal"
import { APP_BASE_URL } from "@/lib/constants"
import useSWR from "swr"
import { adminFetcher } from "@/helpers/fetch.helper"
import OperationListTable from "./_partials/OperationsList"
import { useSearchParams } from "next/navigation"
import Paginator from "@/components/common/Pagination/Paginator"

const OpearationIndexPage : React.FC = () => {
  
  const searchParams = useSearchParams()
  const [showOperationModal , setShowOperationModal] = useState<boolean>(false);
  const getAllOperationsList = 
    `${APP_BASE_URL}/api/operations/list${searchParams?.toString() == '' ? '' : `?${searchParams?.toString()}`}`
  const { data : AllOperationsList , mutate } = useSWR(getAllOperationsList , adminFetcher);

  
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
              <Button onClick={() => setShowOperationModal(true)}>
                <PlusIcon />
                Add Operations
              </Button>
            </div>
            <ContentContainer>
              <OperationListTable 
                data={AllOperationsList?.data ?? []}
                sn={0}
                mutate={mutate}
                isloading={!AllOperationsList}
              />
              <Paginator 
                currentPage={AllOperationsList?.meta?.current_page}
                totalPages={AllOperationsList?.meta?.last_page}
                mutate={mutate}
                showPreviousNext
              />
            </ContentContainer>
            <OperationActionModal 
              mode="add"
              isOpen={showOperationModal}
              onOpenChange={setShowOperationModal}
              mutate={mutate}
            />
          </AdminCommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  )
}

export default OpearationIndexPage