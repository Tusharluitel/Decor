"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryPills = ({
  children,
  isActive,
  id,
  mutate,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  id: string | number;
  mutate: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    Array.from(params.keys()).forEach((key) => {
      params.delete(key);
    });

    params.set("category_id", id.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm rounded-full border duration-500 ease-in-out 
                hover:border-[#FFA500] ${
                  isActive ? "bg-[#FFA500] bg-opacity-70 text-white" : ""
                }  w-fit text-left`}
    >
      {children}
    </button>
  );
};

export default CategoryPills;
