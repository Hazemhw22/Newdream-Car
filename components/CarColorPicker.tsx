"use client"

import { useState } from "react"
import Image from "next/image"

interface ColorOption {
  color: string
  name: string
  image: string
}

interface CarColorPickerProps {
  colorOptions: ColorOption[]
  onSelectColor: (colorOption: ColorOption) => void
}

export function CarColorPicker({ colorOptions, onSelectColor }: CarColorPickerProps) {
  const [selected, setSelected] = useState<ColorOption>(colorOptions[0])

  const handleColorSelect = (colorOption: ColorOption) => {
    setSelected(colorOption)
    onSelectColor(colorOption)
  }

  return (
    <div className="space-y-4">
      {/* Color Selection Buttons - Mobile Optimized */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {colorOptions.map((colorOption, idx) => (
          <button
            key={idx}
            onClick={() => handleColorSelect(colorOption)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-200 touch-manipulation ${
              selected.color === colorOption.color
                ? "ring-4 ring-cyan-500 border-cyan-500 scale-110"
                : "border-gray-300 hover:border-gray-400 active:scale-95"
            }`}
            style={{ backgroundColor: colorOption.color }}
            aria-label={`${colorOption.name} color`}
            title={colorOption.name}
          />
        ))}
      </div>

      {/* Selected Color Name - Mobile Optimized */}
      <div className="text-center md:text-right">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">נבחר: {selected.name}</span>
      </div>

      {/* Car Image with Selected Color - Mobile Optimized */}
      <div className="rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700">
        <div className="relative w-full h-48 md:h-64 lg:h-80">
          <Image
            src={selected.image || "/placeholder.svg"}
            alt={`${selected.name} car`}
            fill
            className="object-contain transition-all duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
          />
        </div>
      </div>

      {/* Color Information - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">{selected.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">גימור צבע פרימיום</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-300" style={{ backgroundColor: selected.color }} />
        </div>
      </div>
    </div>
  )
}
