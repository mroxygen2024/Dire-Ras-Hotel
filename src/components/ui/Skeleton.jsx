import React from 'react';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200/80 ${className}`}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 1, className, ...props }) {
  return (
    <div className={`space-y-2.5 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 w-full ${
            i === lines - 1 && lines > 1 ? 'w-3/5' : ''
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className, ...props }) {
  return (
    <Skeleton
      className={`w-full h-full ${className}`}
      {...props}
    />
  );
}

export function SkeletonButton({ className, ...props }) {
  return (
    <Skeleton
      className={`h-11 w-32 rounded-sm ${className}`}
      {...props}
    />
  );
}
