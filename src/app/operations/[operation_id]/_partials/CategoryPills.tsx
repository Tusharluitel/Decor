import React from "react"

const CategoryPills = ({
    children
} : {
    children : React.ReactNode
}) => {
    return(
        <>
            <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-fit text-left">
                Modern
            </button>
        </>
    )
}

export default CategoryPills