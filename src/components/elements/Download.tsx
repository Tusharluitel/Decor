import { useState } from 'react';
import { Button } from '../ui/button';
import { DownloadIcon } from 'lucide-react';
import { decorAccessToken } from '@/helpers/token.helper';

interface DownloadProps {
  url: string;
  filename?: string;
  className?: string;
  label?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  headers?: Record<string, string>;
}

const Download = ({
  url,
  filename = 'download',
  className = '',
  label = 'Download',
  onSuccess,
  onError,
  headers = {},
}: DownloadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization : `Bearer ${decorAccessToken()}`,
          Accept : 'Application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get filename from Content-Disposition header if available
      const contentDisposition = response.headers.get('content-disposition');
      const serverFilename = contentDisposition
        ?.split(';')
        ?.find(n => n.includes('filename='))
        ?.replace('filename=', '')
        ?.trim();

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = serverFilename || filename;
      
      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup the URL object
      window.URL.revokeObjectURL(downloadUrl);
      
      onSuccess?.();
    } catch (error) {
      console.error('Download failed:', error);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      variant={'outline'}
      className={`${className} w-full`}
    >
        <DownloadIcon className="mr-2 h-4 w-4" />
        {label}
    </Button>
  );
};

export default Download;