import { Input, InputProps } from "./input";
import { Label } from "./label";

interface Props extends InputProps {
  label: string;
  error?: string;
}

export const InputField = ({ label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={props.name} className="mb-1.5 text-slate-500">
        {label}
      </Label>
      <Input name={props.name} {...props} />
      {error && (
        <Label htmlFor={props.name} className="mt-1.5 text-xs text-red-500">
          {error}
        </Label>
      )}
    </div>
  );
};
