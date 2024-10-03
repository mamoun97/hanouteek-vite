import { useEffect, useState } from 'react'
import { Select, Text } from "rizzui";
import ApiConfig from '../../Api/ApiConfig';
import { AppDispatch, RootState } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import {  GlobalS, changePlatform } from '../../Store/globalSlice';

type selectOptionR = {
  value: string,
  label: string,
  db: string,
  avatar: string,
}
export const options: selectOptionR[] = [
  {
    label: "Hanouteek",
    value: "Hanouteek",
    db: "db=hanouteekiwY3oYSQ2",
    avatar: ApiConfig.rootUrl + "/logo-1700126267928-818468360.webp",
  },
  {
    label: "Millenium31",
    value: "Millenium31",
    db: "db=Millenium31pn-QVfdiI",
    avatar: ApiConfig.rootUrl + "/favicon-9-1703749562351-903330813.webp",
  },
  {
    label: "Taniajawaher",
    value: "Taniajawaher",
    db: "db=taniajawaheroi7JLwmU5",
    avatar: ApiConfig.rootUrl + "/favicon-9-1702969701396-476639064.webp",
  },
  {
    label: "Amir Market",
    value: "Amir Market",
    db: "db=marketX9-HJKluT",
    avatar: ApiConfig.rootUrl + "/market png-1703598191310-240851212.webp",
  },
  {
    label: "Wahren original",
    value: "Wahren original",
    db: "db=wahrenoriginalwahrenoriginalSBEv1XWgn",
    avatar: ApiConfig.rootUrl + "/favicon-10-1711322612974-666498865.webp",
  },
  {
    label: "Oran shoes",
    value: "Oran shoes",
    db: "db=oranshoesdefweGOLG",
    avatar: ApiConfig.rootUrl + "/434094843_930261791983750_2048385286810111503_n-1711454875827-785379680.webp",
  },
  {
    label: "Risedrop",
    value: "Risedrop",
    db: "db=dropdropmSqp6A8rx",
    avatar: ApiConfig.rootUrl + "/favicon-1722351504309-715605991.webp",
  },

];

export default function SelectPlatform() {
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const [value, setValue] = useState<selectOptionR|null>(options.find(el=>el.db==global?.platform)??null);
  
  const dispatch: AppDispatch = useDispatch();
  useEffect(()=>{
    dispatch(changePlatform(value?.db??""))
  },[value])
  return (
    <Select
      label={""}
      options={options}
      value={value}
      className={"grow max-w-xs"}
      onChange={setValue}
      displayValue={(value: any) => renderDisplayValue(value)}
      getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
    />
  );
}

function renderDisplayValue(value: selectOptionR) {
  return (
    <span className="flex items-center gap-2">
      <img
        src={value.avatar}
        alt={value.label}
        className="w-7 h-7 object-contain rounded"
      />
      <Text>{value.label}</Text>
    </span>
  )
}

function renderOptionDisplayValue(option: selectOptionR) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={option.avatar}
        alt={option.label}
        className="w-6 h-6 object-contain rounded"
      />

      <div>
        <Text fontWeight="medium">{option.label}</Text>
        {/* <Text>{option.value}</Text> */}
      </div>
    </div>
  )
}