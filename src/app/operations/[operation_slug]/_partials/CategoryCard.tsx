import { useDownload } from "@/hooks/use-download";
import { routes } from "@/lib/routes";
import { Download } from "lucide-react";
import Link from "next/link";

const CategoryCard: React.FC<{
  category: {
    id: number;
    slug: string;
    name: string;
    image_path: string;
    description: string;
    operation: Record<string, string>;
  };
}> = ({ category }) => {
  const categoryRoute = routes.CATEGORIES_INDIVIDUAL.replace(
    ":slug",
    category?.operation ? category?.operation?.slug : ""
  ).replace(":categorySlug", category?.slug);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative group">
          <Link href={categoryRoute}>
            <img
              src={category?.image_path}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
          </Link>

          {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div> */}
        </div>
        <div className="flex justify-between p-4">
          <Link href={categoryRoute}>
            <h3 className="font-semibold text-[#1B365D] hover:underline">
              {category.name}
            </h3>
          </Link>
          <div
            className="bg-primary py-1 px-2 rounded-md cursor-pointer"
            onClick={(e) => useDownload(e, category.id)}
          >
            <Download className="text-white w-4" />
          </div>
          {/* <p className="text-sm text-gray-500 clamp-3">{category?.description}</p> */}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
