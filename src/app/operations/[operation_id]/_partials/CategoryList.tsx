import CategoryCard from "./CategoryCard"

const CategoryList : React.FC = () => {
    return(
        <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
            {[
                {name: 'Modern Accent Chair', code: 'DC500300', image: 'https://placehold.co/600x400'},
                {name: 'Minimalist Side Table', code: 'DC500301', image: 'https://placehold.co/600x400'},
                {name: 'Contemporary Vase', code: 'DC500302', image: 'https://placehold.co/600x400'},
                {name: 'Wall Art Abstract', code: 'DC500303', image: 'https://placehold.co/600x400'},
                {name: 'Decorative Mirror', code: 'DC500304', image: 'https://placehold.co/600x400'},
                {name: 'Table Lamp Modern', code: 'DC500305', image: 'https://placehold.co/600x400'},
                {name: 'Floor Cushion', code: 'DC500306', image: 'https://placehold.co/600x400'},
                {name: 'Shelf Unit', code: 'DC500307', image: 'https://placehold.co/600x400'},
                {name: 'Throw Blanket', code: 'DC500308', image: 'https://placehold.co/600x400'},
            ].map((product, index) => {
                return(
                    <>
                        <CategoryCard product={product as any} key={index}/>
                    </>
                )
            })}
            </div>
        </div>
    )
}

export default CategoryList