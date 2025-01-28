const CategoryCard : React.FC<{
    product : {
        name : string
        image : string , 
        code : string
    }
}
> = ({
    product
}) => {
    return(
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative group">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                        <button className="absolute bottom-4 right-4 bg-[#1B365D] text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                            Try in Visualizer
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-[#1B365D]">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.code}</p>
                </div>
            </div>
        </>
    )
}

export default CategoryCard