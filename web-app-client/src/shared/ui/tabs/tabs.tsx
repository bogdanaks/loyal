import { cn } from "shared/libs/utils"

interface Props {
  items: { key: string; value: string; icon?: React.ReactNode }[]
  activeKey: string
  onClick: (tab: string) => void
}

interface TabItemProps {
  isActive: boolean
  value: string
  onClick: () => void
}

const TabItem = ({ value, isActive, onClick }: TabItemProps) => {
  return (
    <li
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer justify-center px-2 h-8 rounded-xl bg-[#F0F0F0] w-full whitespace-nowrap",
        { "bg-primary-disabled": isActive }
      )}
    >
      <span className="opacity-50">{value}</span>
    </li>
  )
}

export const Tabs = ({ items, activeKey, onClick }: Props) => {
  return (
    <ul className="w-full grid grid-flow-col gap-2 overflow-x-auto">
      {items.map((item) => {
        return (
          <TabItem
            key={item.key}
            value={item.value}
            onClick={() => onClick(item.key)}
            isActive={activeKey === item.key}
          />
        )
      })}
    </ul>
  )
}
