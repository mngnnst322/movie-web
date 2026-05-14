type SkeletonProps = {
  count?: number;
};

export const MovieCardSkeleton = ({ count = 12 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-75 animate-pulse">
          <div className="h-107.5 bg-gray-300 rounded-t-lg dark:bg-gray-700" />

          <div className="p-3 bg-stone-100 rounded-b-lg space-y-2 dark:bg-gray-800">
            <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-700" />

            <div className="h-4 w-40 bg-gray-300 rounded dark:bg-gray-700" />

            <div className="h-4 w-28 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </>
  );
};
