import { memo, ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  variant?: 'blue' | 'red' | 'yellow' | 'gray';
  hideTextOnMobile?: boolean;
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

const Button = ({ text, icon, variant = 'blue', onClick, hideTextOnMobile = false, className }: ButtonProps) => {
  const colors = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
  };

  return (
    <button
      className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${colors[variant]} cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
      {!hideTextOnMobile ? (
        <span className='text-sm'>{text}</span>
      ) : (
        <span className='text-sm hidden lg:inline'>{text}</span>
      )}
    </button>
  );
};

export default memo(Button);
