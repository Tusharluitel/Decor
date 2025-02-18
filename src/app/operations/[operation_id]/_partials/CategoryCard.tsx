const ProductCard : React.FC<{
    product : {
        name : string
        image_path : string , 
        description : string
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
                        src={product?.image_path} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                        
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-[#1B365D]">{product.name}</h3>
                    {/* <p className="text-sm text-gray-500 clamp-3">{product?.description}</p> */}
                </div>
            </div>
        </>
    )
}

export default ProductCard