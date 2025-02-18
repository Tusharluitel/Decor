const CommonContainer : React.FC<{
  children : React.ReactNode , 
  title? : string
}> = ({children , title}) => {
  return(
    <>
      <title>{title ?? 'DECORSIGN'}</title>
      <div className="container mx-auto lg:px-0 px-6">
        {
          children
        }
      </div>
    </>
  )
}

export default CommonContainer