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
import FormInput from "@/components/forms/InputFields";
import ImageUpload from "@/components/elements/ImageUpload";
import { APP_BASE_URL } from "@/lib/constants";
import { fetchHeader } from "@/helpers/fetch.helper";
import { defaultFetcher } from "@/helpers/fetch.helper";
import useSWR from "swr";
import { collectionToOptions } from "@/helpers/option.helper";
import AsyncSelectField from "@/components/forms/AsyncSelectField";
import RichTextEditor from "@/components/elements/RichTextEditor";


interface ProductModalProps {
  mode: 'add' | 'edit';
  initialData?: any;
  mutate: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
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

  // Fetch categories list for dropdown
  const categoriesListURL = `${APP_BASE_URL}/api/category/list`;
  const { data: categoriesList } = useSWR(categoriesListURL, defaultFetcher);
  const categoriesListOptions = categoriesList?.data?.length ? 
    collectionToOptions(categoriesList.data) as any[] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSpecificationsChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: content
    }));
  };

  const loadCategories = async (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    try {
      const response = await fetch(
        `${APP_BASE_URL}/api/category/list?search=${inputValue}`,
        { headers: fetchHeader() }
      );
      const data = await response.json();
      const options = collectionToOptions(data?.data);
      callback(options as any);
    } catch (error) {
      callback([]);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]: [string, any]) => {
      if (value) {
        if (key === 'image') {
          if (value instanceof File) {
            submitFormData.append(key, value);
          }
        } else {
          submitFormData.append(key, value);
        }
      }
    });

    try {
      const submitURL = `${APP_BASE_URL}/api/product/${mode === 'edit' ? `update/${initialData?.id}` : 'store'}`;
      const res = await fetch(submitURL, {
        method: 'POST',
        body: submitFormData,
        headers: fetchHeader()
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
        name: initialData?.name,
        description: initialData?.description,
        category_id: initialData?.category_id?.toString(),
        specifications: initialData?.specifications,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setError({});
      setFormData({});
    }
  }, [isOpen]);

  const defaultCategoryValue = formData?.category_id ? 
    categoriesListOptions.find((option: any) => option.value == formData.category_id) : 
    null;


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-auto custom-scrollbar">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Add New Product' : 'Edit Product'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-6">
            <div>
              <FormInput
                label="Name"
                id="name"
                name="name"
                labelPosition="top"
                value={formData?.name ?? ''}
                onChange={handleInputChange}
                error={error?.name}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <FormInput
                label="Description"
                id="description"
                name="description"
                labelPosition="top"
                value={formData?.description ?? ''}
                onChange={handleInputChange}
                error={error?.description}
                placeholder="Enter description"
              />
            </div>
            <div>
              <AsyncSelectField
                label="Category"
                id="category_id"
                labelStyle="label-top"
                name="category_id"
                value={formData.category_id}
                defaultValue={defaultCategoryValue}
                defaultOptions={categoriesListOptions}
                loadOptions={loadCategories}
                fieldErrors={error?.category_id}
                onChange={(e) => handleSelectChange('category_id', e.value as string)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Image</label>
              <ImageUpload
                defaultImageUrl={initialData?.image_path || ''}
                onImageChange={(file) => 
                  setFormData(prev => ({ ...prev, image: file }))
                }
              />
              {error?.image && (
                <p className="text-sm text-red-500 mt-1">{error?.image}</p>
              )}
            </div>
            <RichTextEditor
                label="Specifications"
                value={formData?.specifications || ''}
                onChange={handleSpecificationsChange}
                error={error?.specifications}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-8" disabled={isLoading} isLoading={isLoading}>
              {mode === 'add' ? 'Create Product' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;