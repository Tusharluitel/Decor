const AdminCommonContainer: React.FC<{children : React.ReactNode , className? :string , title? :string}> = ({
  children , 
  className , 
  title
}) => {
  return(
    <>
      <title>{title ?? 'DECOR'}</title>
      <div className={`container py-4 px-4 sm:px-8 mx-auto ${className}`}>{children}</div>
    </>
  )
}

export default AdminCommonContainer