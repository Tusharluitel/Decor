"use client";
import CommonContainer from "@/components/elements/CommonContainer";
import PublicView from "@/views/PublicView";
import { APP_BASE_URL } from "@/lib/constants";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { routes } from "@/lib/routes";
import { use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategorySidebar from "../_partials/CategorySidebar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ProductHorizontalCard from "./_partials/ProductHorizontalCard";
import { cn } from "@/lib/utils";
import { useDownload } from "@/hooks/use-download";

const CategoryIndividualPage: React.FC<{
  params: Record<string, any> | any;
}> = ({ params }) => {
  const resolvedParams: any = use(params);

  const operation_id = resolvedParams?.operation_id;
  const category_id = resolvedParams?.category_id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriesListByOperationIdURL = `${APP_BASE_URL}/api/public/category/list/${operation_id}`;
  const categoryIndividualDetailURL = `${APP_BASE_URL}/api/category/show/${category_id}`;

  const { data: CategoriesListByOperationId, mutate } = useSWR(
    categoriesListByOperationIdURL,
    defaultFetcher
  );
  const { data: categoryIndividualDetail, mutate: mutateIndividualDetail } =
    useSWR(categoryIndividualDetailURL, defaultFetcher);

  const productListURL = categoryIndividualDetail
    ? `${APP_BASE_URL}/api/public/product/list/${category_id}?${
        searchParams?.has("category_id") && `category_id=${searchParams?.get("category_id")}`
      }`
    : null;

  const { data: productList, mutate: mutateProductList } = useSWR(
    productListURL,
    defaultFetcher
  );

  console.log(categoryIndividualDetail);
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
        <div className="bg-[#1B365D] text-white py-16 mb-8">
          <div className="mx-auto px-4">
            <CommonContainer>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-4">
                    {categoryIndividualDetail?.data?.name}
                  </h1>
                  <p className="text-lg">
                    {categoryIndividualDetail?.data?.description}
                  </p>
                </div>
                <Button
                  onClick={(e) => useDownload(e, category_id)}
                  className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 px-6 py-2 rounded-md"
                >
                  <Download size={20} />
                  Download Brochure
                </Button>
              </div>
            </CommonContainer>
          </div>
        </div>
        <CommonContainer>
          <div className="px-4 pb-8">
            <div className="flex md:flex-row flex-col gap-6 relative">
              {categoryIndividualDetail?.data?.children_categories &&
                categoryIndividualDetail?.data?.children_categories.length >
                  0 && (
                  <CategorySidebar
                    data={categoryIndividualDetail?.data?.children_categories}
                    mutate={mutate}
                    title="Sub Categories"
                  />
                )}

              <div className="flex-1">
                <div
                  className={cn(
                    "grid  grid-cols-1 gap-4",
                    categoryIndividualDetail?.data?.children_categories.length >
                      0
                      ? "lg:grid-cols-2"
                      : "lg:grid-cols-3"
                  )}
                >
                  {productList?.data?.length > 0 &&
                    productList?.data?.map(
                      (product: Record<string, any>, index: number) => {
                        return (
                          <ProductHorizontalCard
                            product={product}
                            key={index}
                          />
                        );
                      }
                    )}
                  {categoryIndividualDetail?.data?.length == 0 &&
                    "No Products to show"}
                </div>
              </div>
            </div>
          </div>
        </CommonContainer>
      </PublicView>
    </>
  );
};

export default CategoryIndividualPage;
