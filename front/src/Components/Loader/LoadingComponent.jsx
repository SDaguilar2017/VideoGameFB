import React from "react";

const LoadingComponent = () => {
  return (
    <div class="loader">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="none" fill="white" />
        <path d="M50 50 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10" stroke="black" />
      </svg>
    </div>
  );
};

export default LoadingComponent;
