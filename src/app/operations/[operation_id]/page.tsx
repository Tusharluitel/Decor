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
  const operation_id = resolvedParams?.operation_id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriesListByOperationIdURL = `${APP_BASE_URL}/api/public/category/list/${operation_id}`;
  const { data: CategoriesListByOperationId, mutate } = useSWR(
    categoriesListByOperationIdURL,
    defaultFetcher
  );

  useEffect(() => {
    if (!operation_id) {
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

  return (
    <>
      <PublicView>
        <div className="pb-8">
          <Banner
            title={CategoriesListByOperationId?.data?.at(0)?.operation?.title}
            description={
              CategoriesListByOperationId?.data?.at(0)?.operation?.description
            }
          />
          <CommonContainer>
            {CategoriesListByOperationId && (
              <>
              <h2 className="text-[#1B365D] font-semibold text-2xl mb-4">{CategoriesListByOperationId?.data?.at(0)?.operation?.title}</h2>
              <CategoryList categoryListData={CategoriesListByOperationId} />
              </>
            )}

            {/* <div className="flex lg:flex-row flex-col gap-6 relative px-4">
                <CategorySidebar data={CategoriesListByOperationId?.data} mutate={mutate}/>
                <div className="flex-1">
                  <div className="">
                    {filteredCategories?.length > 0 && 
                      filteredCategories.map((categories: Record<string,any>, index: number) => (
                        categories?.products?.length > 0 && (
                          <div className="[&:not(:last-of-type)]:mb-12" key={categories?.id || index}>
                            <h3 className="mb-6 flex justify-between ">
                              <span className="text-xl font-semibold text-[#1B365D]">
                                {categories?.name}
                              </span>
                              <Link 
                                className="underline" 
                                href={routes.CATEGORIES_INDIVIDUAL.replace(':id',operation_id).replace(':categoryId', categories?.id)}
                              >
                                View All
                              </Link>
                            </h3>
                            <CategoryList categoryListData={categories?.products}/>
                          </div>
                        )
                      ))
                    }
                  </div>
                </div>
              </div> */}
          </CommonContainer>
        </div>
      </PublicView>
    </>
  );
};

export default OperationPage;
