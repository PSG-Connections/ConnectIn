import React from 'react';

const CustomErrorToast: React.FC<{heading: string; message: string}> = ({
  message,
  heading,
}) => {
  return (
    <div>
      <div className="text-sm font-bold bg-[#e92828]">{heading}</div>
      <div className="text-xs break-words">{message}</div>
    </div>
  );
};

export default CustomErrorToast;
