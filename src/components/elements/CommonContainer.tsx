const CommonContainer : React.FC<{
  children : React.ReactNode
}> = ({children}) => {
  return(
    <>
      <div className="container mx-auto">
        {
          children
        }
      </div>
    </>
  )
}

export default CommonContainer