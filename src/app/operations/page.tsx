'use client'
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation"
import { useEffect } from "react";


const OperationIndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace(routes.LANDING_INDEX)
    },[])

    return(
        <>
            
        </>
    )
}

export default OperationIndexPage