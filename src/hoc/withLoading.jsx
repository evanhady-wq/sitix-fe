import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const withLoading = (WrappedComponent) => {
  return () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }, []);

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <FaSpinner className="animate-spin" color="blue" size={70} />
        </div>
      );
    }

    return <WrappedComponent />;
  };
};
