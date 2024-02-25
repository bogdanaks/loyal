import { useAccountStore } from "entities/account/model/store"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/ui/tabs"

import { EditAccountData } from "./edit-account-data"
import { EditAccountSecurity } from "./edit-account-security"

export const AccountSettings = () => {
  const account = useAccountStore((state) => state.account)

  if (!account) {
    return null
  }

  return (
    <div className="flex w-full">
      <Tabs
        defaultValue="data"
        orientation="horizontal"
        className="flex flex-row gap-6 w-full min-h-[600px] max-sm:flex-col max-sm:gap-4 max-sm:min-h-full"
      >
        <TabsList className="flex-col gap-5 pb-0 bg-background border-r-2 border-muted pr-6 rounded-none h-full justify-start items-start max-sm:h-fit max-sm:flex-row max-sm:gap-2 max-sm:border-r-[0]">
          <TabsTrigger
            value="data"
            className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Данные
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Безопасность
          </TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="mt-0 w-full">
          <EditAccountData account={account} />
        </TabsContent>
        <TabsContent value="security" className="mt-0 w-full">
          <EditAccountSecurity />
        </TabsContent>
      </Tabs>
    </div>
  )
}
