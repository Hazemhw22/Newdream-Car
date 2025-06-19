"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CarImagesProps {
  car: {
    name: string;
    images: string[];
  };
}

export default function CarImages({ car }: CarImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/cars/";

  useEffect(() => {
    setZoom(1);
    setDrag({ x: 0, y: 0 });
    setDragStart(null);
  }, [isZoomOpen, selectedImage]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(1, Math.min(3, z + (e.deltaY < 0 ? 0.2 : -0.2))));
  };

  const handleDoubleClick = () => {
    setZoom((z) => (z === 1 ? 2 : 1));
    setDrag({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setDragStart({ x: e.clientX - drag.x, y: e.clientY - drag.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart) return;
    setDrag({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  return (
    <div className="w-full">
      {/* الصورة الرئيسية */}
      <div
        className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md cursor-zoom-in"
        onClick={() => setIsZoomOpen(true)}
      >
        {/* عداد الصور على الجوال فقط */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium md:hidden">
          {selectedImage + 1} / {car.images?.length || 1}
        </div>
        <Image
          src={imageBaseUrl + (car.images?.[selectedImage] || "")}
          alt={
            car.images?.[selectedImage]
              ? `${car.name} תצוגה ${selectedImage + 1}`
              : `${car.name} ללא תמונה`
          }
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* الصور المصغّرة */}
      <div className="overflow-x-auto py-3 px-3 md:py-4 md:px-4 bg-white dark:bg-gray-800 mt-4 rounded-xl">
        <div className="flex justify-center gap-2 md:gap-3 pb-2 md:pb-0">
          {car.images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 active:scale-95 ${
                selectedImage === index
                  ? "border-cyan-500 scale-105 shadow-lg"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <Image
                src={imageBaseUrl + image}
                alt={`${car.name} عرض ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* نافذة تكبير الصورة */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400 transition"
            aria-label="إغلاق"
          >
            ✕
          </button>

          <div
            className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] flex items-center justify-center"
            onWheel={handleWheel}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            style={{ cursor: zoom > 1 ? "grab" : "zoom-in" }}
          >
            <Image
              src={imageBaseUrl + (car.images?.[selectedImage] || "")}
              alt={`${car.name} zoomed`}
              fill
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `scale(${zoom}) translate(${drag.x / zoom}px, ${
                  drag.y / zoom
                }px)`,
                transition: dragStart ? "none" : "transform 0.2s",
                borderRadius: "1rem",
                background: "#fff",
                userSelect: "none",
                pointerEvents: "all",
              }}
              draggable={false}
              priority
            />
          </div>

          {/* الصور المصغرة داخل المودال */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6">
            {car.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 active:scale-95 ${
                  selectedImage === index
                    ? "border-cyan-500 scale-105 shadow-lg"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <Image
                  src={imageBaseUrl + image}
                  alt={`${car.name} عرض ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="text-gray-200 text-xs mt-4">
            גלול להגדלה, לחיצה כפולה להגדלה/הקטנה, גרור להזיז
          </div>
        </div>
      )}
    </div>
  );
}
