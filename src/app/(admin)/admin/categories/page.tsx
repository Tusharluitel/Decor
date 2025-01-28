'use client'
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav"
import AdminCommonContainer from "@/components/elements/AdminCommonContainer"
import ContentContainer from "@/components/elements/ContentContainer"
import { PageHeading } from "@/components/ui/title"
import AdminContextProvider from "@/context/AdminContextProvider"
import { adminFetcher } from "@/helpers/fetch.helper"
import { APP_BASE_URL } from "@/lib/constants"
import { routes } from "@/lib/routes"
import PrivateView from "@/views/PrivateView"
import useSWR from "swr"
import CategoryListTable from "./_partials/CategoryListTable"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import OperationCategoryModal from "./_partials/CategoryActionModal"
import { useSearchParams } from "next/navigation"
import Paginator from "@/components/common/Pagination/Paginator"

const CategoriesIndexPage : React.FC = () => {

  const [showCategoryModal , setShowCategoryModal] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const CategoryListUL = `${APP_BASE_URL}/api/category/list${searchParams?.toString() == '' ? '' : `?${searchParams?.toString()}`}`
  const { data : CategoriesList , mutate , isLoading } = useSWR(CategoryListUL , adminFetcher);

  return(
    <>
      <AdminContextProvider>
        <PrivateView>
          <AdminCommonContainer>
            <div className="flex justify-between">
              <div>
                <PageHeading>Categories</PageHeading>
                <BreadCrumbNav 
                  breadCrumbItems={[
                    {title : 'Dashboard' , href:routes.ADMIN_DASHBOARD},
                    {title : 'Categories' , href:routes.CATEGORIES_INDEX},
                  ]}
                />
              </div>
              <Button onClick={() => setShowCategoryModal(true)}>
                <PlusIcon />
                Add Category
              </Button>
            </div>
            <ContentContainer>
              <CategoryListTable 
                data={CategoriesList?.data}
                sn={0}
                mutate={mutate}
                isloading={isLoading}
              />
              <Paginator 
                currentPage={CategoriesList?.meta?.current_page}
                totalPages={CategoriesList?.meta?.last_page}
                mutate={mutate}
                showPreviousNext
              />
            </ContentContainer>
            <OperationCategoryModal 
              mode="add"
              isOpen={showCategoryModal}
              onOpenChange={setShowCategoryModal}
              mutate={mutate}
            />
          </AdminCommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  )
}

export default  CategoriesIndexPage