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
    <div className="p-4">
      <div className="bg-background p-5 rounded-3xl flex">
        <Tabs
          defaultValue="data"
          orientation="horizontal"
          className="flex flex-row gap-6 w-full min-h-[600px]"
        >
          <TabsList className="flex-col gap-5 pb-0 bg-background border-r-2 border-muted pr-6 rounded-none h-full justify-start items-start">
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
    </div>
  )
}
