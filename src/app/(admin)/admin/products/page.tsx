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
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import ProductModal from "./_partials/ProductsActionModal"
import ProductsListTable from "./_partials/ProducsListTable"

const CategoriesIndexPage : React.FC = () => {

  const [showCategoryModal , setShowCategoryModal] = useState<boolean>(false)

  const CategoryListUL = `${APP_BASE_URL}/api/product/list`
  const { data : CategoriesList , mutate , isLoading } = useSWR(CategoryListUL , adminFetcher);

  return(
    <>
      <AdminContextProvider>
        <PrivateView>
          <AdminCommonContainer>
            <div className="flex justify-between">
              <div>
                <PageHeading>Products</PageHeading>
                <BreadCrumbNav 
                  breadCrumbItems={[
                    {title : 'Dashboard' , href:routes.ADMIN_DASHBOARD},
                    {title : 'Products' , href:routes.PRODUCTS_INDEX},
                  ]}
                />
              </div>
              <Button onClick={() => setShowCategoryModal(true)}>
                <PlusIcon />
                Add Product
              </Button>
            </div>
            <ContentContainer>
              <ProductsListTable 
                data={CategoriesList?.data}
                sn={0}
                mutate={mutate}
                isloading={isLoading}
              />
            </ContentContainer>
            <ProductModal 
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