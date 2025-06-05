import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const ImageGalleryModal = ({
  images,
  onClose,
}: {
  images: any[];
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    // Trigger the animation after mount
    setShow(true);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-4 max-w-lg w-full relative transition-all duration-300 transform ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={images[current].image_path}
          alt=""
          className="w-full h-64 object-contain mb-4"
        />
        <div className="absolute w-full left-0 top-1/2 -translate-y-1/2">
          {/* Navigation buttons vertically centered over the image */}
          <button
            onClick={() => setCurrent((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={current === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 px-2 py-1 flex items-center  rounded-full ${
              current === 0 ? "text-gray-300 cursor-not-allowed" : ""
            }`}
            aria-label="Previous"
            style={{ zIndex: 2 }}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() =>
              setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : prev))
            }
            disabled={current === images.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 flex items-center rounded-full ${
              current === images.length - 1
                ? "text-gray-300 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next"
            style={{ zIndex: 2 }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-white bg-opacity-80 rounded px-3 py-1 text-sm font-medium ">
          {current + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
