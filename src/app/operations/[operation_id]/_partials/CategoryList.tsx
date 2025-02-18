import ProductCard from "./CategoryCard"

const CategoryList : React.FC<{
    categoryListData : Record<string,any>[]
}> = ({
    categoryListData
}) => {
    return(
        <div className="flex-1">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {categoryListData?.map((product, index) => {
                return(
                    <>
                        <ProductCard product={product as any} key={index}/>
                    </>
                )
            })}
            </div>
        </div>
    )
}

export default CategoryList