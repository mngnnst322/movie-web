type SkeletonProps = {
  count?: number;
};

export const MovieCardSkeleton2 = ({ count = 12 }: SkeletonProps) => {
  return (
    <div className=" w-1/3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-100   animate-pulse">
          <div className="p-3 bg-stone-100 rounded-b-lg space-y-2 dark:bg-gray-800"></div>
        </div>
      ))}
    </div>
  );
};
