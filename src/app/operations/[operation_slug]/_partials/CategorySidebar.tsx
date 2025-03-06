"use client";

import { useSearchParams } from "next/navigation";
import CategoryPills from "./CategoryPills";

interface CategorySidebarProps {
  data: Record<string, any>[];
  title? : string
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ data, mutate , title = 'Categories' }) => {
  const searchParams = useSearchParams();

  return (
    <div className="flex gap-8 relative lg:min-h-screen">
      <div className="sticky top-4 overflow-y-auto max-h-[calc(100vh-2rem)] lg:w-72 w-full">
        <div className="bg-white rounded-lg shadow border p-4 space-y-6 max-h-[90vh] overflow-y-auto lg:min-h-[30vh]">
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="w-full h-2 border-b border-b-gray-200 mb-4"></div>
            <div className="flex gap-2 flex-wrap">
              {data?.length > 0 &&
                data?.map((category, index) => (
                  <CategoryPills
                    key={index + "pills"}
                    id={category?.id}
                    mutate={mutate}
                    isActive={searchParams?.get("category_id") == category?.id}
                  >
                    {category?.name}
                  </CategoryPills>
                ))}
                {
                  data?.length == 0 && `No ${title} to show`
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
