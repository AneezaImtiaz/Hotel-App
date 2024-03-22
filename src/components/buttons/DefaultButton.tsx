import React from 'react';
import './DefaultButton.css';

export type DefaultButtonProps = {
  text: string;
  disabled?: boolean;
  buttonClick: () => void;
};

const DefaultButton: React.FC<DefaultButtonProps> = ({ disabled = false, text, buttonClick }) => {
  return (
    <button disabled={disabled} className='button' onClick={() => buttonClick()}>{text}</button>
  );
};

export default DefaultButton;
