import { useEffect } from 'react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, title = 'Confirm Action', message, onConfirm, onCancel }: ConfirmDialogProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-auto'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='mt-2 text-gray-600'>{message}</p>
        <div className='flex justify-end gap-2 mt-4'>
          <Button text='Cancel' variant='gray' onClick={onCancel} />
          <Button text='Delete' variant='red' onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
