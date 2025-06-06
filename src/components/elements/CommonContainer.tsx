const CommonContainer: React.FC<{
  children: React.ReactNode;
  title?: string;
}> = ({ children, title }) => {
  return (
    <>
      <title>{title ?? "DECORSIGN"}</title>
      <div className="px-[40px]">
        <div className="w-[1100px] max-w-full mx-auto lg:px-0 px-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default CommonContainer;
