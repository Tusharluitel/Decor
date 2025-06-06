"use client";
import BreadCrumbNav from "@/components/common/BreadCumbNav/BreadCrumbNav";
import AdminCommonContainer from "@/components/elements/AdminCommonContainer";
import ContentContainer from "@/components/elements/ContentContainer";
import { PageHeading } from "@/components/ui/title";
import AdminContextProvider from "@/context/AdminContextProvider";
import { adminFetcher } from "@/helpers/fetch.helper";
import { APP_BASE_URL } from "@/lib/constants";
import { routes } from "@/lib/routes";
import PrivateView from "@/views/PrivateView";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ProductModal from "./_partials/ProductsActionModal";
import ProductsListTable from "./_partials/ProducsListTable";
import { useSearchParams } from "next/navigation";
import Paginator from "@/components/common/Pagination/Paginator";

const ProductsIndexPage: React.FC = () => {
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const ProductListUL = `${APP_BASE_URL}/api/product/list${
    searchParams?.toString() == "" ? "" : `?${searchParams?.toString()}`
  }`;
  const {
    data: ProductsList,
    mutate,
    isLoading,
  } = useSWR(ProductListUL, adminFetcher);

  return (
    <>
      <AdminContextProvider>
        <PrivateView>
          <AdminCommonContainer>
            <div className="flex justify-between">
              <div>
                <PageHeading>Products</PageHeading>
                <BreadCrumbNav
                  breadCrumbItems={[
                    { title: "Dashboard", href: routes.ADMIN_DASHBOARD },
                    { title: "Products", href: routes.PRODUCTS_INDEX },
                  ]}
                />
              </div>
              <Button onClick={() => setShowProductModal(true)}>
                <PlusIcon />
                Add Product
              </Button>
            </div>
            <ContentContainer>
              <ProductsListTable
                data={ProductsList?.data}
                sn={0}
                mutate={mutate}
                isloading={isLoading}
              />
              <Paginator
                currentPage={ProductsList?.meta?.current_page}
                totalPages={ProductsList?.meta?.last_page}
                mutate={mutate}
                showPreviousNext
              />
            </ContentContainer>
            <ProductModal
              mode="add"
              isOpen={showProductModal}
              onOpenChange={setShowProductModal}
              mutate={mutate}
            />
          </AdminCommonContainer>
        </PrivateView>
      </AdminContextProvider>
    </>
  );
};

export default ProductsIndexPage;
