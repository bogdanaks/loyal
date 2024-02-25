import { Button } from "shared/ui/button"

import { Container } from "widgets/ui/container"
import { Layout } from "widgets/ui/layout"

export const PayPage = () => {
  return (
    <Layout>
      <Container title="Оплата" className="max-w-[600px] h-fit" withBack>
        <div className=" flex flex-col w-full">
          <h2>Ваш аккаунт оплачен до: 2023-12-12</h2>
          <h3>Тариф: 999р в месяц</h3>
          <Button className="mt-10">Продлить подписку</Button>
        </div>
      </Container>
    </Layout>
  )
}
