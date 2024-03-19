import MD5 from "md5"

import { Button } from "shared/ui/button"

import { Container } from "widgets/ui/container"

const login = "ballami"
const outSum = "1990"
const invoiceId = "678678"
const pass1 = "rh3e46SsS0WCu1PCsYyV"
const userId = "12345"
const signature = MD5(`${login}:${outSum}:${invoiceId}:${pass1}:Shp_userId=${userId}`)

const payParams = {
  MerchantLogin: login,
  OutSum: outSum,
  InvoiceID: invoiceId,
  Description: "Оплата подписки на сервис ballami.ru",
  SignatureValue: signature,
  Culture: "ru",
  Shp_userId: userId,
  IsTest: "1",
}

const payLink = "https://auth.robokassa.ru/Merchant/Index.aspx?"
const queryParams = new URLSearchParams(payParams)
const payLinkWithParams = payLink + queryParams.toString()

export const PayPage = () => {
  return (
    <Container title="Оплата" className="max-w-[600px] h-fit" withBack>
      <div className=" flex flex-col w-full">
        <h2>Ваш аккаунт оплачен до: 2023-12-12</h2>
        <h3>Тариф: 1990р в месяц</h3>
        <a href={payLinkWithParams} target="_blank" className="w-full h-full mt-10">
          <Button className="w-full">Продлить подписку</Button>
        </a>
      </div>
    </Container>
  )
}
