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
import { FileText, X } from "lucide-react";

interface OperationCategoryModalProps {
  mode: 'add' | 'edit';
  initialData?: any;
  mutate: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const OperationCategoryModal: React.FC<OperationCategoryModalProps> = ({
  mode,
  initialData,
  mutate,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  const [removeBrochure, setRemoveBrochure] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch operations list for dropdown
  const operationsListURL = `${APP_BASE_URL}/api/operations/list`;
  const { data: operationsList } = useSWR(operationsListURL, defaultFetcher);
  const operationsListOptions = operationsList?.data?.length ? 
    collectionToOptions(operationsList.data) as any[] : [];

  // Fetch categories list for parent category dropdown
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

  const handleFileChange = (key: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      [key]: file
    }));
    if (key === 'brochure') {
      setRemoveBrochure(false);
    }
  };

  const handleRemoveBrochure = () => {
    setRemoveBrochure(true);
    setFormData(prev => {
      const newData = { ...prev };
      delete newData.brochure;
      return newData;
    });
  };

  const loadOperations = async (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    try {
      const response = await fetch(
        `${APP_BASE_URL}/api/operations/list?search=${inputValue}`,
        { headers: fetchHeader() }
      );
      const data = await response.json();
      const options = collectionToOptions(data?.data);
      callback(options as any);
    } catch (error) {
      callback([]);
    }
  };

  const loadCategories = async (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    try {
      const response = await fetch(
        `${APP_BASE_URL}/api/categories/list?search=${inputValue}`,
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
        if (key === 'image' || key === 'brochure') {
          if (value instanceof File) {
            submitFormData.append(key, value);
          }
        } else {
          submitFormData.append(key, value);
        }
      }
    });

    if (removeBrochure) {
      submitFormData.append('remove_brochure', '1');
    }

    try {
      const submitURL = `${APP_BASE_URL}/api/category/${mode === 'edit' ? `update/${initialData?.id}` : 'store'}`;
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
        operation_id: initialData?.operation_id?.toString(),
        name: initialData?.name,
        description: initialData?.description,
        parent_category_id: initialData?.parent_category_id?.toString(),
      });
      setRemoveBrochure(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setError({});
      setFormData({});
      setRemoveBrochure(false);
    }
  }, [isOpen]);

  const defaultOperationValue = formData?.operation_id ? 
    operationsListOptions.find((option: any) => option.value == formData.operation_id) : 
    null;

  const defaultCategoryValue = formData?.parent_category_id ? 
    categoriesListOptions.find((option: any) => option.value == formData.parent_category_id) : 
    null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto custom-scrollbar">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Add New Category' : 'Edit Category'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-6">
            <div>
              <AsyncSelectField
                label="Operation"
                id="operation_id"
                labelStyle="label-top"
                name="operation_id"
                value={formData.operation_id}
                defaultValue={defaultOperationValue}
                defaultOptions={operationsListOptions}
                loadOptions={loadOperations}
                fieldErrors={error?.operation_id}
                onChange={(e) => handleSelectChange('operation_id', e.value as string)}
                required
              />
            </div>
            <div>
              <FormInput
                label="Name"
                id="name"
                name="name"
                labelPosition="top"
                value={formData?.name ?? ''}
                onChange={handleInputChange}
                error={error?.name}
                placeholder="Enter name"
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
              <label className="text-sm font-medium mb-2 block">Image</label>
              <ImageUpload
                defaultImageUrl={initialData?.image_path || ''}
                onImageChange={(file) => handleFileChange('image', file)}
              />
              {error?.image && (
                <p className="text-sm text-red-500 mt-1">{error?.image}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Brochure (PDF)</label>
              {mode === 'edit' && initialData?.brochure_path && !removeBrochure ? (
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <FileText className="w-4 h-4" />
                    <a
                      href={initialData.brochure_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1 truncate"
                    >
                      View Current Brochure
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveBrochure}
                      className="p-1 h-6 w-6"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileChange('brochure', e.target.files[0]);
                    }
                  }}
                  className="w-full"
                />
              )}
              {error?.brochure && (
                <p className="text-sm text-red-500 mt-1">{error.brochure}</p>
              )}
            </div>
            <div>
              <AsyncSelectField
                label="Parent Category"
                id="parent_category_id"
                labelStyle="label-top"
                name="parent_category_id"
                value={formData.parent_category_id}
                defaultValue={defaultCategoryValue}
                defaultOptions={categoriesListOptions}
                loadOptions={loadCategories}
                fieldErrors={error?.parent_category_id}
                onChange={(e) => handleSelectChange('parent_category_id', e.value as string)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-8" disabled={isLoading} isLoading={isLoading}>
              {mode === 'add' ? 'Create Category' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperationCategoryModal;