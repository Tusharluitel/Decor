const CategoryPagination : React.FC = () => {
    return(
        <div className="flex-1">
            <div className="flex justify-center mt-8 space-x-2">
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">First</button>
                <button className="px-4 py-2 border rounded text-sm bg-[#FFA500] text-white">1</button>
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">2</button>
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">3</button>
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">4</button>
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">5</button>
                <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">Last</button>
            </div>
        </div>
    )
}

export default CategoryPagination