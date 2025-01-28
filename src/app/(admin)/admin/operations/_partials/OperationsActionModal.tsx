import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/elements/Loader";
import FormInput from "@/components/forms/InputFields";
import ImageUpload from "@/components/elements/ImageUpload";

interface OperationActionModalProps {
  mode: 'add' | 'edit';
  initialData?: any;
  mutate: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const OperationActionModal: React.FC<OperationActionModalProps> = ({
  mode,
  initialData,
  mutate,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    // Add the file to formData
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    // Create FormData and append all values
    const submitFormData = new FormData();
    submitFormData.append('title', formData.title || '');
    submitFormData.append('description', formData.description || '');
    if (formData.imageFile) {
      submitFormData.append('image', formData.imageFile);
    }

    try {
      const submitURL = `/api/design-decor/${mode === 'edit' ? `update/${initialData?.id}` : 'store'}`;
      const res = await fetch(submitURL, {
        method: 'POST',
        body: submitFormData,
      });
      const data = await res.json();

      if (data?.success) {
        setFormData({});
        mutate();
        toast({
          variant: 'success',
          title: `Successfully ${mode === 'edit' ? 'Updated!' : 'Created!'}`,
          description: data?.message,
        });
        onOpenChange(false);
      } else {
        setError(data?.errors);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: data?.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData?.title,
        description: initialData?.description,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setError({});
      setFormData({});
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto custom-scrollbar">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Add New Design' : 'Edit Design'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-6">
            <div className="">
              <FormInput
                label="Title"
                id="title"
                name="title"
                labelPosition="top"
                value={formData.title}
                defaultValue={formData?.title ?? ''}
                onChange={handleInputChange}
                error={error?.title}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="">
              <FormInput
                label="Description"
                id="description"
                name="description"
                labelPosition="top"
                value={formData.description}
                defaultValue={formData?.description ?? ''}
                error={error?.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>
            <div className="">
              <label className="text-sm font-medium mb-2 block">Image</label>
              <ImageUpload
                defaultImageUrl={initialData?.image || ''}
                onImageChange={handleImageChange}
              />
              {error?.image && (
                <p className="text-sm text-red-500 mt-1">{error.image}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-8" disabled={isLoading}>
              {mode === 'add' ? 'Create Design' : 'Save Changes'}
              {isLoading && <Loader />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperationActionModal;