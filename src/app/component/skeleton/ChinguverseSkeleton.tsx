"use client";

export default function ChinguverseSkeleton() {
  return (
    <div className="p-4 space-y-6 bg-white dark:bg-black">
      
      {/* Top Bar: Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="animate-pulse bg-gray-300 dark:bg-gray-800 rounded-md h-10 w-full md:w-1/2" />
        
        <div className="flex gap-3 w-full md:w-1/2">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-800 rounded-md h-10 flex-1" />
          <div className="animate-pulse bg-gray-300 dark:bg-gray-800 rounded-md h-10 flex-1" />
        </div>
      </div>

      {/* Big Map / Main Content */}
      <div className="animate-pulse bg-gray-200 dark:bg-gray-800 w-full h-[400px] rounded-xl" />

      {/* List Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl h-24"
          />
        ))}
      </div>
    </div>
  );
}
