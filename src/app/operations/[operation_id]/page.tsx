import CommonContainer from "@/components/elements/CommonContainer"
import PublicView from "@/views/PublicView"
import CategorySidebar from "./_partials/CategorySidebar"
import CategoryList from "./_partials/CategoryList"

const OperationPage : React.FC = () => {
  return(
    <>
      <PublicView>
        <CommonContainer>
          <div className="px-4 py-8">
              <h1 className="text-2xl font-bold text-[#1B365D] mb-8">Product List</h1>
              <div className="flex gap-6">
                <CategorySidebar />
                <div className="flex-1">
                  <div className="">
                    <CategoryList />
                  </div>
                </div>
              </div>
          </div>
        </CommonContainer>
      </PublicView>
    </>
  )
}

export default OperationPage