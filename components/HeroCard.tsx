// components/CarCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type CarCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
};

export default function CarCard({ title, description, imageUrl, isActive }: CarCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-md overflow-hidden w-72 transition-all duration-300 ${
        isActive ? "scale-105 z-10" : "scale-95 opacity-70"
      }`}
      animate={isActive ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button className="w-full">View Details</Button>
      </div>
    </motion.div>
  );
}
