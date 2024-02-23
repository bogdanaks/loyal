interface Props {
  title: string;
  desc?: React.ReactNode;
  children: React.ReactNode;
}

export const GridGroup = ({ children, title, desc }: Props) => {
  return (
    <div className="bg-slate-200 p-4 pb-5 rounded-3xl flex flex-col">
      <h3 className="font-medium text-2xl">{title}</h3>
      {desc && <p className="text-sm text-slate-500">{desc}</p>}
      <div className="flex flex-col gap-4 mt-4">{children}</div>
    </div>
  );
};
