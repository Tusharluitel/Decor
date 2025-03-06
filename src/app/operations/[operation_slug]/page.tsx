"use client";
import CommonContainer from "@/components/elements/CommonContainer";
import PublicView from "@/views/PublicView";
import CategorySidebar from "./_partials/CategorySidebar";
import CategoryList from "./_partials/CategoryList";
import { APP_BASE_URL } from "@/lib/constants";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/fetch.helper";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Banner from "@/components/elements/Banner";

const OperationPage: React.FC<{
  params: Record<string, any> | any;
}> = ({ params }) => {
  const resolvedParams: any = use(params);
  const operationSlug = resolvedParams?.operation_slug;
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriesListByOperationIdURL = `${APP_BASE_URL}/api/public/category/list-by-slug/${operationSlug}`;
  const { data: CategoriesListByOperationId, mutate } = useSWR(
    categoriesListByOperationIdURL,
    defaultFetcher
  );

  useEffect(() => {
    if (!operationSlug) {
      router.replace(routes.LANDING_INDEX);
    }
  }, []);

  const filteredCategories = CategoriesListByOperationId?.data?.filter(
    (category: any) => {
      if (!searchParams?.get("id")) {
        return true;
      }
      return category?.id == searchParams?.get("id");
    }
  );

  const operationTitle =
    CategoriesListByOperationId?.data?.at(0)?.operation?.title;

  return (
    <>
      <PublicView>
        <div className="pb-8">
          <Banner
            title={operationTitle}
            description={
              CategoriesListByOperationId?.data?.at(0)?.operation?.description
            }
            breadcrumbs={[
              {
                label: operationTitle,
                route: "#",
              },
            ]}
          />
          <CommonContainer>
            {CategoriesListByOperationId && (
              <>
                <h2 className="text-[#1B365D] font-semibold text-2xl mb-4">
                  {operationTitle}
                </h2>
                <CategoryList categoryListData={CategoriesListByOperationId} />
              </>
            )}
          </CommonContainer>
        </div>
      </PublicView>
    </>
  );
};

export default OperationPage;
