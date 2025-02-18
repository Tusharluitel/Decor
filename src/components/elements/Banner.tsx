import React from "react";
import CommonContainer from "./CommonContainer";
import bannerImage from "../../../public/images/banner.jpeg";

const Banner = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
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
          <div className="flex flex-wrap gap-y-4 justify-between">
            <div>
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
