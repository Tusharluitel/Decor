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
  submitUrl, 
  mutate
}: {
  submitUrl: string;
  mutate: () => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExcelFile, setSelectedExcelFile] = useState<File | null>(null);
  const [selectedZipFile, setSelectedZipFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const excelFileInputRef = useRef<any>(null);
  const zipFileInputRef = useRef<any>(null);

  const handleExcelFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedExcelFile(file);
    }
  };

  const handleZipFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedZipFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedExcelFile && !selectedZipFile) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      if (selectedExcelFile) {
        formData.append('product_csv', selectedExcelFile);
      }
      if (selectedZipFile) {
        formData.append('zip_file', selectedZipFile);
      }

      const response = await fetch(submitUrl, {
        method: 'POST',
        body: formData,
        headers: fetchHeader()
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();

      // Reset and close on success
      setSelectedExcelFile(null);
      setSelectedZipFile(null);
      setOpen(false);
      if (excelFileInputRef.current) {
        excelFileInputRef.current.value = '';
      }
      if (zipFileInputRef.current) {
        zipFileInputRef.current.value = '';
      }
      toast({
        title: 'Successfully Uploaded!',
        description: data?.message,
        variant: 'success'
      });
      
      // You might want to trigger a refresh of the employee list here
      mutate();
      
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error?.message,
        variant: 'destructive'
      });
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
          Import Products
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Product Data</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="excelFile">Select Excel File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleExcelFileChange}
              ref={excelFileInputRef}
            />
            {selectedExcelFile && (
              <p className="text-sm text-muted-foreground">
                Selected Excel: {selectedExcelFile.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipFile">Select ZIP Folder</Label>
            <Input
              id="zipFile"
              type="file"
              accept=".zip"
              onChange={handleZipFileChange}
              ref={zipFileInputRef}
            />
            {selectedZipFile && (
              <p className="text-sm text-muted-foreground">
                Selected ZIP: {selectedZipFile.name}
              </p>
            )}
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={(!selectedExcelFile && !selectedZipFile) || isLoading}
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