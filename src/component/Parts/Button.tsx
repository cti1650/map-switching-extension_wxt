import { FC, useCallback } from 'react';
import QRCode from 'react-qr-code';

type ButtonProps = {
  src: string;
  title: string;
  children?: React.ReactNode;
};

export const Button: FC<ButtonProps> = props => {
  const { src, title, children } = props;
  const handleClick = useCallback(() => {
    window.open(src);
  }, [src]);
  return (
    <>
      <button
        className="w-full py-1 border border-gray-400 bg-gray-300 rounded-lg shadow"
        onClick={handleClick}
      >
        {children || title}
      </button>
    </>
  );
};

Button.defaultProps = {
  src: '',
  title: 'button',
};

type ButtonPanelProps = {
  src: string;
  title: string;
  children?: React.ReactNode;
};

export const ButtonPanel: FC<ButtonPanelProps> = props => {
  const { src, title, children } = props;
  const handleClick = useCallback(() => {
    window.open(src);
  }, [src]);
  return (
    <div className="w-full flex flex-col justify-between p-2">
      <div>
        <h2 className="text-lg text-center font-extrabold">{title}</h2>
      </div>
      <div>
        <div>
          <div className="h-auto w-full max-w-128 mx-auto my-0 p-2">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              className="w-full h-auto max-w-full"
              value={src}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <button
          className="w-full py-1 text-xs border border-gray-400 bg-gray-300 rounded-lg shadow"
          onClick={handleClick}
        >
          開く
        </button>
      </div>
    </div>
  );
};

ButtonPanel.defaultProps = {
  src: '',
  title: 'button',
};
