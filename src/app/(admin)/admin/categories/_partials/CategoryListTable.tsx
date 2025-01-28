import { DataTable } from "@/components/common/DataTable/DataTable"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
}  from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { DeleteInstances } from "@/components/common/DeleteInstances/DeleteInstanes"
import { APP_BASE_URL } from "@/lib/constants"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import OperationCategoryModal from "./CategoryActionModal"
import { Badge } from "@/components/ui/badge"

const CategoryListTable : React.FC<{data : [] , sn : number , mutate : () => void , isloading : boolean}> = ({
    data , 
    sn , 
    mutate,
    isloading
}) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "sn",
            header: "sn",
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize" data-attr={JSON.stringify(row)}>{row.index + 1}</div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize flex gap-2 items-center">
                {
                    row?.original?.image_path &&
                    <Avatar className="h-8 w-8">
                    {
                        <AvatarImage src={row.original?.image_path ?? 'no image path'} alt={row.original.title} /> 
                    }
                    </Avatar>
                }
                {row.getValue("name")}
            </div>
            ),
        },
        {
            accessorKey: "description",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="!px-0"
                        >
                            Description
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("description")}</div>
            ),
        },

        {
            accessorKey: "parent_category_id",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="!px-0"
                        >
                            Parent Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">
                {
                    row.original?.parent_category?.name ?
                    <Badge>
                        {row.original?.parent_category?.name ?? ''}
                    </Badge>
                    : '-'
                }
            </div>
            ),
        },
       
    ]

    useEffect(() => {
        if(!isModalOpen) setSelectedRow(null)
    },[isModalOpen])

    return(
        <>
          <DataTable
              data={data}
              columns={columns}
              sn={1}
              searchKey="name"
              showCheckbox={false}
              mutate={mutate}
              isLoading={isloading}
              actionDropdown={{
                  id: "actions",
                  enableHiding: false,
                  cell: ({ row } : {  row : any}) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        
                          <DropdownMenuItem onClick={() => {
                              setSelectedRow(row?.original) ; 
                              setIsModalOpen(true)
                          }} className="text-yellow-500 hover:text-yellow-300">
                              <Pencil />
                              Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                              <DeleteInstances
                                  url={`${APP_BASE_URL}/api/category/delete`}
                                  mutate={mutate}
                                  ids={[row?.original?.id]}
                              />
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ),
              }}
              
          />
          <OperationCategoryModal
              mode="edit"
              initialData={selectedRow}
              mutate={mutate}
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
          />
        </>
    )
}

export default CategoryListTable