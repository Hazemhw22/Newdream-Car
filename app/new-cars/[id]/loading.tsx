import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full bg-gray-200 dark:bg-gray-800 rounded-lg mb-4">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="flex gap-2 overflow-x-auto py-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-16 w-16 md:h-20 md:w-20 rounded-lg flex-shrink-0"
            />
          ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
