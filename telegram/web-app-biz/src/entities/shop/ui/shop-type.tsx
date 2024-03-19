import { cn } from "shared/libs/utils";

interface Props {
  id: number;
  title: string;
  onClick: (id: number) => void;
  isActive: boolean;
}

export const ShopType = ({ id, title, isActive, onClick }: Props) => {
  return (
    <li
      className="flex flex-col cursor-pointer items-center justify-center"
      onClick={() => onClick(id)}
    >
      <div
        className={cn("w-full bg-gray-500 rounded-xl border-2 aspect-[16/12]", {
          "border-primary": isActive,
        })}
      ></div>
      <span>{title}</span>
    </li>
  );
};
