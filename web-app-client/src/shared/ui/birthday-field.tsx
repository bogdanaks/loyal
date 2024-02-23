import { IMaskInput } from "react-imask";

import { Label } from "./label";

interface Props {
  error?: string;
  value?: string;
  label: string;
  name?: string;
  onChange: (value: string) => void;
}

export const BirthdayField = ({ label, error, value, name, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className="mb-1.5 text-slate-500">
        {label}
      </Label>
      <IMaskInput
        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name={name}
        mask={Date}
        unmask={true}
        inputMode="numeric"
        placeholder="31.12.1998"
        value={value}
        onAccept={onChange}
      />
      {error && (
        <Label htmlFor={name} className="mt-1.5 text-xs text-red-500">
          {error}
        </Label>
      )}
    </div>
  );
};
