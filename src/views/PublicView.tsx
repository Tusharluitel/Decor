import AppFooter from "@/components/common/PublicFooter/Footer"
import AppHeader from "@/components/common/PublicHeader/Header"

const PublicView : React.FC<{
  children : React.ReactNode
}> = ({
  children
}) => {
  return(
    <>
      <AppHeader />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      <AppFooter />
    </>
  )
}

export default PublicView