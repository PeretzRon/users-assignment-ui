import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoaderButton: React.FC<LoaderButtonProps> = ({ loading, children, ...props }) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={20} /> : children}
    </Button>
  );
};

export default LoaderButton;