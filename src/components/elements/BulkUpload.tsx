import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { fetchHeader } from '@/helpers/fetch.helper';
import { useToast } from '@/hooks/use-toast';

const BulkUpload = ({
  submitUrl , 
  mutate
} : {
  submitUrl : string
  mutate : () => void
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<any>(null);

  const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(submitUrl, {
        method: 'POST',
        body: formData,
        headers : fetchHeader()
        
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json()

      // Reset and close on success
      setSelectedFile(null);
      setOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast({
        title : 'Sucessfully Uploaded !',
        description : data?.message,
        variant : 'success'
      })
      
      // You might want to trigger a refresh of the employee list here
      
    } catch (error : any) {
      toast({
        title : 'Upload failed',
        description : error?.message,
        variant : 'destructive'
      })
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='justify-center'>
          <Upload className="mr-2 h-4 w-4" />
          Import Employees
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Employee Data</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            
            <Input
              id="file"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFile.name}
            </p>
          )}
          <Button 
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className="w-full"
            isLoading={isLoading}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUpload;