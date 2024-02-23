import { Label } from "../label";
import { Textarea, TextareaProps } from "../textarea";

interface Props extends TextareaProps {
  label: string;
  error?: string;
}

export const TextareaField = ({ label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={props.name} className="mb-1.5 text-slate-500">
        {label}
      </Label>
      <Textarea name={props.name} {...props} />
      {error && (
        <Label htmlFor={props.name} className="mt-1.5 text-xs text-red-500">
          {error}
        </Label>
      )}
    </div>
  );
};
