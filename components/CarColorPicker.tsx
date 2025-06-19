"use client";

interface CarColorPickerProps {
  colorOptions: { color: string; images: string[] }[];
  selectedColor?: string;
  onSelectColor: (color: string) => void;
}

export default function CarColorPicker({
  colorOptions,
  selectedColor,
  onSelectColor,
}: CarColorPickerProps) {
  return (
    <div className="flex gap-3">
      {colorOptions.map((color, idx) => (
        <button
          key={color.color + idx}
          type="button"
          className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
            ${
              selectedColor === color.color
                ? "border-cyan-500 scale-110 shadow-lg"
                : "border-gray-300"
            }
          `}
          style={{ backgroundColor: color.color }}
          onClick={() => onSelectColor(color.color)}
          aria-label={color.color}
        >
          {selectedColor === color.color && (
            <span className="block w-4 h-4  rounded-full  border-cyan-500 " />
          )}
        </button>
      ))}
    </div>
  );
}
