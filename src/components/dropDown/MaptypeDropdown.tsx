import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MaptypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="xs:w-[180px] text-teal-500">
        <SelectValue placeholder="Map Type Dropdown" />
      </SelectTrigger>
      <SelectContent className="z-1001 capitalize">
        {mapTypes.map((mapType) => (
          <SelectItem key={mapType} value={mapType}>
            {mapType.split("_")[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
const mapTypes = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
