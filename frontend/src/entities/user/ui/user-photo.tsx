// import { config } from "shared/config";
import { cn } from "shared/libs/utils"

// import { useBusinessStore } from "entities/business/model/store";

export const UserPhoto = () => {
  // const account = useBusinessStore((store) => store.account);

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden min-h-24 min-w-24 h-24 w-24 max-sm:min-h-16 max-sm:min-w-16 max-sm:max-h-16 max-sm:max-w-16"
      )}
    >
      <img
        src="/im.jpg"
        // src={me?.photo ? `${config.apiDomain}/static/${account?.photo}` : "/empty.png"}
        alt="Im"
        className="w-full h-auto"
      />
    </div>
  )
}
