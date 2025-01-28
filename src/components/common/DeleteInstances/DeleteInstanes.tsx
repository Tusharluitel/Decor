import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { fetchHeader } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react"

export function DeleteInstances({
url,
mutate,
ids,
variant = "ghost" ,
// open,
// onOpenChange,
showTitle = true ,
className
}: {
url: string;
mutate: () => void;
ids: Array<string>;
variant? : "ghost" | "link" | "default" | "destructive" | "outline" | "secondary" | null | undefined
className? : string
showTitle? : boolean
// open: boolean;
// onOpenChange: (value: boolean) => void;
}) {
const [showModal , setShowModal] = useState<boolean>(false) 
const [loading, setLoading] = useState<boolean>(false);
const { toast } = useToast();

const handleDelete = async (e: React.MouseEvent): Promise<void> => {

  const formData = new FormData();
  ids.forEach((id : string , index : number) => {
    formData.append(`ids[${index}]` , id)
  })

  try {
    setLoading(true);
    const res = await fetch(url, {
      headers: fetchHeader(),
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message,
        variant: "success",
      });
      mutate();
      setShowModal(false); // Close the dialog on success
    }else{
      toast({
        variant: "destructive",
        title: "Error",
        description: data?.message,
      });
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error?.message,
    });
  } finally {
    setLoading(false);
  }
};

return (
  <AlertDialog open={showModal} onOpenChange={setShowModal}>
    <AlertDialogTrigger asChild>
      <Button
        variant={variant}
        size="sm"
        className={`text-red-500 hover:text-red-700 !w-full text-left flex  !px-2 h-auto min-h-[36px] 
          ${variant == 'outline' ? 'justify-center' : 'justify-start'} ${className}`}
      >
        <Trash2 className="h-4 w-4" />
         {showTitle && 'Delete'}
        {loading ? <Loader /> : null}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will delete your data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-500 hover:bg-red-300"
          onClick={(e) => handleDelete(e)}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
}

