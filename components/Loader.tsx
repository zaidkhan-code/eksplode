import React from "react";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-red-500 text-lg font-semibold">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
