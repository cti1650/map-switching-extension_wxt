import { FC } from 'react';
import { PopupLayout } from '../Layout';
import { ButtonPanel } from '../Parts';

type Props = {
  links: MapLink | null;
  url: string;
};

export const PopupPage: FC<Props> = ({ links, url }) => {
  return (<PopupLayout>
      <div className="flex flex-col justify-center my-1 mx-6 w-full h-1/2">
        <h1 className="text-2xl text-center font-extrabold">
          Map Switching Extension
        </h1>
        {links ? (
          <div className="grid grid-cols-3">
            <ButtonPanel title="Google Map" src={links.gmap} />
            <ButtonPanel title="Yahoo! Map" src={links.ymap} />
            <ButtonPanel title="Yahoo!カーナビ" src={links.ycarnavi} />
            <ButtonPanel title="地理院地図" src={links.gsimap} />
            <ButtonPanel title="重ねるハザードマップ" src={links.disaportal} />
            <ButtonPanel title="川の防災情報" src={links.kawabou} />
          </div>
        ) : (
          <div className="w-full py-5 text-center">
            <div>マップ変換に対応していないサイトのようです…</div>
          </div>
        )}
        <div className="pt-5 w-full truncate text-xs">
          ページURL : {url}
        </div>
      </div>
    </PopupLayout>);
};