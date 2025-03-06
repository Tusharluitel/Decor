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
import Banner from "@/components/elements/Banner";
import { capitalize, pluralize } from "@/helpers/string.helper";
import Pagination from "@/components/elements/Pagination";

const CategoryIndividualPage: React.FC<{
  params: Record<string, any> | any;
}> = ({ params }) => {
  const resolvedParams: any = use(params);

  const operation_slug = resolvedParams?.operation_slug;
  const category_slug = resolvedParams?.category_slug;
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIndividualDetailURL = `${APP_BASE_URL}/api/public/category/show-by-slug/${category_slug}`;

  const { data: categoryIndividualDetail, mutate: mutateIndividualDetail } =
    useSWR(categoryIndividualDetailURL, defaultFetcher);

  const productListURL = categoryIndividualDetail
    ? `${APP_BASE_URL}/api/public/product/list-by-slug/${category_slug}?${searchParams.toString()}`
    : null;

  const { data: productList, mutate: mutateProductList } = useSWR(
    productListURL,
    defaultFetcher
  );

  console.log(categoryIndividualDetail);
  useEffect(() => {
    if (!operation_slug) {
      router.replace(routes.LANDING_INDEX);
    }
  }, []);

  const handleFilter = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`);
    mutateProductList();
  };

  return (
    <>
      <PublicView>
        <Banner
          title={categoryIndividualDetail?.data?.name}
          description={categoryIndividualDetail?.data?.description}
          breadcrumbs={[
            {
              label: capitalize(operation_slug?.replace("-", " ")),
              route: routes.OPERATIONS_INDIVIDUAL.replace(
                ":slug",
                operation_slug
              ),
            },
            {
              label: categoryIndividualDetail?.data?.name,
              route: "#",
            },
          ]}
        >
          <Button
            onClick={(e) => useDownload(e, category_slug)}
            className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 px-6 py-2 rounded-md"
          >
            <Download size={20} />
            Download Brochure
          </Button>
        </Banner>
        <CommonContainer>
          <div className="px-4 pb-8">
            <p className="mb-8">
              Showing all {productList ? productList?.meta?.total : 0}{" "}
              {pluralize("result", productList?.meta?.total)}
            </p>
            <div className="flex md:flex-row flex-col gap-6 relative">
              {categoryIndividualDetail?.data?.children_categories &&
                categoryIndividualDetail?.data?.children_categories.length >
                  0 && (
                  <CategorySidebar
                    data={categoryIndividualDetail?.data?.children_categories}
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
                  {productList?.data?.length > 0 && (
                    <>
                      {productList?.data?.map(
                        (product: Record<string, any>, index: number) => {
                          return (
                            <ProductHorizontalCard
                              product={product}
                              key={index}
                            />
                          );
                        }
                      )}
                    </>
                  )}

                  {productList?.data?.length == 0 && "No Products to show"}
                </div>

                {productList?.meta && (
                  <Pagination
                    meta={productList?.meta}
                    onPageChange={(page) =>
                      handleFilter("page", page.toString())
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </CommonContainer>
      </PublicView>
    </>
  );
};

export default CategoryIndividualPage;
