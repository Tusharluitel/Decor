import React, { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronDown, Cross, Loader2, MoreHorizontal, X } from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableSkeleton from "@/components/elements/TableSkeleton"
import BulkUpload from "@/components/elements/BulkUpload"
import { DeleteInstances } from "../DeleteInstances/DeleteInstanes"
import Download from "@/components/elements/Download"

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  searchKey?: string
  showCheckbox?: boolean
  actionDropdown?: any
  sn?: number
  customFilter?: React.ReactNode
  mutate: () => void
  isLoading?: boolean
  uploadURL?: string
  deleteURL?: string
  downloadSampleURL? : string
  downloadBtnLable? : string
}

export function DataTable<TData>({
  data = [],
  columns: userColumns,
  searchKey,
  showCheckbox = false,
  actionDropdown,
  customFilter,
  mutate,
  uploadURL,
  isLoading = false,
  deleteURL,
  downloadSampleURL,
  downloadBtnLable
}: DataTableProps<TData>) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const shouldFocusRef = useRef(false)

  // Initialize states with proper types
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteIds, setDeleteIds] = useState([])

  // Initialize filter state from URL
  const [localFilter, setLocalFilter] = useState(searchParams.get(searchKey ?? 'name') || "")

  // Memoize the columns configuration
  const finalColumns = useMemo(() => {
    let cols: ColumnDef<TData>[] = []
    
    if (showCheckbox) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            disabled={isLoading}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            disabled={isLoading}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      })
    }

    cols = [...cols, ...userColumns]

    if (actionDropdown) {
      cols.push({
        ...actionDropdown,
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
      })
    }

    return cols
  }, [userColumns, showCheckbox, actionDropdown, isLoading])

  const tableData = useMemo(() => {
    if (!data) return [];
    return data.map((item: any) => ({
      ...item,
    }));
  }, [data]);

  // Create table instance
  const table = useReactTable({
    data: tableData,
    columns: finalColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableFilters: true,
    manualFiltering: false,
  })

  // Debounced URL update
  const debouncedUpdateURL = useCallback(
    useDebounce(async (value: string) => {
      try {
        const currentParams = new URLSearchParams(searchParams?.toString() || '');
        currentParams.set(searchKey ?? 'name', value);
        router.replace(`?${currentParams.toString()}`);
        if (typeof mutate === 'function') {
          await mutate();
        }
      } catch (error) {
        console.error('Error updating search:', error);
      } finally {
        setIsSearching(false);
        shouldFocusRef.current = true;
      }
    }, 500),
    [searchParams, router, mutate, searchKey]
  );

  // Clear search parameters
  const clearSearchParams = () => {
    const column = table.getColumn(searchKey as string);
    if (column) {
      column.setFilterValue("");
    }
    setLocalFilter("");
    setIsSearching(false);
    router.replace(window.location.pathname);
    if (typeof mutate === 'function') {
      mutate();
    }
  }

  // Handle input filter change
  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFilter(value);
    setIsSearching(true);
    shouldFocusRef.current = true;
    debouncedUpdateURL(value);
  }, [debouncedUpdateURL]);

  // Handle focus after loading/searching states change
  useEffect(() => {
    if (!isLoading && !isSearching && shouldFocusRef.current && inputRef.current) {
      inputRef.current.focus();
      shouldFocusRef.current = false;
    }
  }, [isLoading, isSearching]);

  // Initialize filter from URL
  useEffect(() => {
    const urlFilter = searchParams?.get(searchKey ?? 'name');
    if (searchKey && urlFilter) {
      setLocalFilter(urlFilter);
    }
  }, [searchParams, searchKey]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <div className="flex gap-2">
          {searchKey && (
            <div className="relative">
              <Input
                placeholder={`Filter ${searchKey}...`}
                value={localFilter}
                onChange={handleFilterChange}
                className="max-w-sm"
                disabled={isLoading}
                ref={inputRef}
              />
              {(isLoading || isSearching) ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : searchParams?.get(searchKey) ? (
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={clearSearchParams}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              ) : null}
            </div>
          )}
          {customFilter}
        </div>
        <div className="w-fit flex gap-4">
          {table.getSelectedRowModel().rows.map(row => row.original?.id)?.length > 0 && deleteURL && 
            <DeleteInstances
              url={deleteURL}
              mutate={mutate}
              ids={table.getSelectedRowModel().rows.map(row => row.original?.id)}
              variant={'outline'}
            />
          }
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto" disabled={isLoading}>
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {(uploadURL || downloadSampleURL) && 
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {uploadURL && 
                  <DropdownMenuItem asChild>
                    <BulkUpload submitUrl={uploadURL} mutate={mutate}/>
                  </DropdownMenuItem>
                }
                {
                  downloadSampleURL && 
                  <DropdownMenuItem asChild className="mt-2">
                    <Download  url={downloadSampleURL} label={downloadBtnLable}/>
                  </DropdownMenuItem>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="custom-scrollbar" key={data?.length}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={finalColumns.length} rows={5}/>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable;