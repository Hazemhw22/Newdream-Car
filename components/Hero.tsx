// components/Hero.tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-4 text-center relative">
      <div className="max-w-3xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
          Everything About Cars – Just Choose!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Hi! We're Newdream Car and we've got it all: new cars, used cars, leasing, rentals, insurance, and more. So, which car fits you best?
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
            🚗 New Cars
          </Button>
          <Button variant="outline">🚘 Used Cars</Button>
          <Button variant="secondary">📋 Private Leasing</Button>
        </div>
        <p className="mt-6 text-sm text-blue-600 underline cursor-pointer">
          Looking for a rental?
        </p>
      </div>

      {/* Optional decorative background circle */}
      <div className="absolute -right-10 bottom-0 w-64 h-64 bg-cyan-300 rounded-full opacity-20 blur-3xl z-0" />
    </section>
  );
}
