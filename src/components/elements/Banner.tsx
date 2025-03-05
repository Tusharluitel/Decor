import React from "react";
import CommonContainer from "./CommonContainer";
import bannerImage from "../../../public/images/banner.jpeg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";

const Banner = ({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description: string;
  breadcrumbs?: { label: string; route: string }[];
  children?: React.ReactNode;
}) => {
  return (
    <div
      className=" text-white py-16 mb-8"
      style={{
        backgroundImage: `linear-gradient(to right,
          rgba(27, 54, 93, 1),
          rgba(12, 37, 73, 0.5)
      ), url(${bannerImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto px-4">
        <CommonContainer>
          <div className="flex md:flex-nowrap flex-wrap gap-y-4 justify-between md:gap-24 items-center">
            <div>
              {breadcrumbs && (
                <Breadcrumb className="mb-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        asChild
                        className="text-white hover:text-white"
                      >
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white" />
                    {breadcrumbs.map((item, index) => (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink
                            asChild
                            className="text-white hover:text-white"
                          >
                            <Link href={item.route}>{item.label}</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs.length - 1 !== index && (
                          <BreadcrumbSeparator className="text-white" />
                        )}
                      </>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              )}

              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg">{description}</p>
            </div>

            <div>{children}</div>
          </div>
        </CommonContainer>
      </div>
    </div>
  );
};

export default Banner;
