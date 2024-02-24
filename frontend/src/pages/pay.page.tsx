import { Button } from "shared/ui/button"

import { Layout } from "widgets/ui/layout"

export const PayPage = () => {
  return (
    <Layout>
      <h1 className="min-h-12 flex items-center text-3xl font-bold px-4">Оплата</h1>
      <div className="p-4">
        <div className="bg-background p-5 rounded-3xl flex flex-col max-w-[600px]">
          <h2>Ваш аккаунт оплачен до: 2023-12-12</h2>
          <h3>Тариф: 999р в месяц</h3>
          <Button className="mt-10">Продлить подписку</Button>
        </div>
      </div>
    </Layout>
  )
}
