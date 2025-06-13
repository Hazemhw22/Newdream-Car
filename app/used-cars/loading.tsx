import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Skeleton */}
        <div className="relative w-full h-[300px] bg-gray-200 dark:bg-gray-800 rounded-xl mb-8"></div>

        {/* Car Type Filters Skeleton */}
        <div className="my-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-gray-800"
                >
                  <Skeleton className="w-12 h-12 rounded-full mb-3" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
          </div>
        </div>

        {/* Search Filters Skeleton */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Car Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="pt-4 border-t">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <div className="flex gap-2 mt-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
