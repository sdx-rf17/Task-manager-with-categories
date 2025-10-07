const TaskSkeleton = () => {
  return (
    <div className="bg-slate-700 flex justify-between p-4 rounded-lg shadow animate-pulse">
      <div className="space-y-2 w-full">
        <div className="h-5 bg-slate-600 rounded w-3/4"></div>
        <div className="h-4 bg-slate-600 rounded w-full"></div>
        <div className="h-4 bg-slate-600 rounded w-1/2"></div>
        <div className="h-6 bg-slate-600 rounded w-24"></div>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="h-6 w-6 bg-slate-600 rounded"></div>
        <div className="h-7 w-7 bg-slate-600 rounded"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
