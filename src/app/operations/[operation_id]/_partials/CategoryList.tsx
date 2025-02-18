import CategoryCard from "./CategoryCard";

const CategoryList: React.FC<{
  categoryListData: Record<string, any>[];
}> = ({ categoryListData }) => {
  return (
    <div className="flex-1">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {categoryListData?.data?.map((category) => {
          return (
            <>
              <CategoryCard category={category as any} key={category.id} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
