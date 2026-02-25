import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRef, type Dispatch, type SetStateAction } from "react";

type Props = {
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ setLocation }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const value = inputRef.current?.value.trim() ?? "";
    if (value) {
      setLocation(value);
    }
  };

  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Search by City or Block name.."
        ref={inputRef}
      />
      <Button className="text-teal-500" type={"submit"} onClick={handleSearch}>
        Search
      </Button>
    </Field>
  );
}
