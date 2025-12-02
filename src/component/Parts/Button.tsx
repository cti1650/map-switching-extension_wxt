import { type FC, useCallback } from "react";
import QRCode from "react-qr-code";

type ButtonProps = {
  src: string;
  title: string;
  children?: React.ReactNode;
};

export const Button: FC<ButtonProps> = (props) => {
  const { src = "", title = "button", children } = props;
  const handleClick = useCallback(() => {
    window.open(src);
  }, [src]);
  return (
    <>
      <button
        type="button"
        className="w-full py-1 border border-gray-400 bg-gray-300 rounded-lg shadow"
        onClick={handleClick}
      >
        {children || title}
      </button>
    </>
  );
};

type ButtonPanelProps = {
  id?: string;
  src: string;
  title: string;
  children?: React.ReactNode;
};

export const ButtonPanel: FC<ButtonPanelProps> = (props) => {
  const { id, src = "", title = "button" } = props;
  const handleClick = useCallback(() => {
    window.open(src);
  }, [src]);
  return (
    <div id={id} className="w-full flex flex-col justify-between p-2">
      <div>
        <h2 id={id ? `${id}-title` : undefined} className="text-lg text-center font-extrabold">
          {title}
        </h2>
      </div>
      <div>
        <div>
          <div className="h-auto w-full max-w-lg mx-auto my-0 p-2">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              className="w-full h-auto max-w-full"
              value={src}
              viewBox={"0 0 256 256"}
            />
          </div>
        </div>
        <button
          id={id ? `${id}-button` : undefined}
          type="button"
          className="w-full py-1 text-xs border border-gray-400 bg-gray-300 rounded-lg shadow"
          onClick={handleClick}
        >
          開く
        </button>
      </div>
    </div>
  );
};
