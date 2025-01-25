import React from "react";

const SkeletonPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-20">
      <header className="bg-white shadow-md rounded-2xl p-4 mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="md:col-span-2 lg:col-span-1 bg-white shadow-md rounded-2xl p-6"
          >
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, subIndex) => (
                <div
                  key={subIndex}
                  className="h-4 bg-gray-300 rounded w-full mb-2"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonPage;
