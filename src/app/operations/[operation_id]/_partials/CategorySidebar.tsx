import CategoryPills from "./CategoryPills"

const CategorySidebar : React.FC = () => {
    return(
        <>
            <div className="flex gap-8">
                <div className="w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow p-4 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div>
                            <h3 className="font-semibold mb-2">Categories</h3>   
                            <div className="flex gap-2 flex-wrap">
                                <CategoryPills>
                                    Modern
                                </CategoryPills>
                                <CategoryPills>
                                    Modern
                                </CategoryPills>
                                <CategoryPills>
                                    Modern
                                </CategoryPills>
                                <CategoryPills>
                                    Modern
                                </CategoryPills>
                                <CategoryPills>
                                    Modern
                                </CategoryPills>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
        </>
    )
}

export default CategorySidebar