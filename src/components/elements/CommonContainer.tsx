const CommonContainer : React.FC<{
  children : React.ReactNode , 
  title? : string
}> = ({children , title}) => {
  return(
    <>
      <title>{title ?? 'DECORSIGN'}</title>
      <div className="container mx-auto">
        {
          children
        }
      </div>
    </>
  )
}

export default CommonContainer