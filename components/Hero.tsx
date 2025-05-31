// components/Hero.tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full bg-white dark:bg-gray-900 py-16 px-4 text-center relative">
      <div className="max-w-3xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          Everything About Cars – Just Choose!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Hi! We're Newdream Car and we've got it all: new cars, used cars, leasing, rentals, insurance, and more. So, which car fits you best?
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600">
            🚗 New Cars
          </Button>
          <Button variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">
            🚘 Used Cars
          </Button>
          <Button variant="secondary" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            📋 Private Leasing
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-600 dark:text-blue-400 underline cursor-pointer">
          Looking for a rental?
        </p>
      </div>

      {/* Optional decorative background circle */}
      <div className="absolute -right-10 bottom-0 w-64 h-64 bg-cyan-300 dark:bg-cyan-500 rounded-full opacity-20 blur-3xl z-0" />
    </section>
  );
}
