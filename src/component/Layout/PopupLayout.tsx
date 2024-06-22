import { FC } from 'react';
import cc from 'classcat';

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

export const PopupLayout: FC<Props> = ({ children, center = true }) => {
  return (
    <div className="w-[400px] min-h-[130px] py-4">
      <div
        className={cc([
          'h-full flex flex-col gap-2 p-4',
          {
            'items-center justify-center': center,
          },
        ])}
      >
        {children}
      </div>
    </div>
  );
};
