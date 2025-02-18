import { APP_BASE_URL } from "@/lib/constants";

  // Function to download brochure
 export const useDownload = async (e: any, category_id:number) => {
    e.preventDefault();
    try {
      // Start download
      const response = await fetch(
        `${APP_BASE_URL}/api/public/category/download-brochure/${category_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Get the filename from the Content-Disposition header, fallback to default name
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "brochure.pdf";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      // Append to document, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error downloading brochure:", error);
      throw error;
    }
  };