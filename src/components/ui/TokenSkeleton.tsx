import React from 'react';

interface TokenSkeletonProps {
  rows?: number;
}

const TokenSkeleton: React.FC<TokenSkeletonProps> = ({ rows = 10 }) => {
  return (
    <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-off-black text-left">
              <th className="px-6 py-3 w-12">
                <div className="h-4 bg-medium-gray rounded w-8"></div>
              </th>
              <th className="px-6 py-3 w-48">
                <div className="h-4 bg-medium-gray rounded w-24"></div>
              </th>
              <th className="px-6 py-3 w-32">
                <div className="h-4 bg-medium-gray rounded w-16"></div>
              </th>
              <th className="px-6 py-3 w-32">
                <div className="h-4 bg-medium-gray rounded w-20"></div>
              </th>
              <th className="px-6 py-3 w-40">
                <div className="h-4 bg-medium-gray rounded w-24"></div>
              </th>
              <th className="px-6 py-3 w-40">
                <div className="h-4 bg-medium-gray rounded w-28"></div>
              </th>
              <th className="px-6 py-3 w-24">
                <div className="h-4 bg-medium-gray rounded w-12"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-medium-gray">
            {Array(rows).fill(0).map((_, index) => (
              <tr key={index} className="hover:bg-off-black transition-colors">
                <td className="px-6 py-4">
                  <div className="h-4 bg-medium-gray rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-medium-gray"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-medium-gray rounded w-20 mb-2"></div>
                      <div className="h-3 bg-medium-gray rounded w-12"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-medium-gray rounded w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-medium-gray rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-medium-gray rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-medium-gray rounded w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-medium-gray rounded w-16"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenSkeleton; 