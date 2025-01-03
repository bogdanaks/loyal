import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { AuthProvider } from "processes/auth-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AccountMobile } from "pages/account-mobile"
import { AccountSettingsPage } from "pages/account-settings.page"
import { LoginPage } from "pages/auth/login.page"
import { RegisterPage } from "pages/auth/register.page"
import { BusinessPage } from "pages/business.page"
import { ClientsDetailPage } from "pages/clients-detail.page"
import { ClientsPage } from "pages/clients.page"
import { HelpPage } from "pages/help.page"
import { LoyalPage } from "pages/loyal.page"
import { PayPage } from "pages/pay.page"
import { PrivacyPolicyPage } from "pages/privacy-policy.page"
import { ScanPage } from "pages/scan.page"
import { UserAgreementPage } from "pages/user-agreement.page"

import { config } from "shared/config"

import { LayoutWrapper } from "widgets/ui"

dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Navigate to={config.initialPage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="user-agreement" element={<UserAgreementPage />} />

        <Route element={<AuthProvider />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientsDetailPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/loyal" element={<LoyalPage />} />
            <Route path="/account-settings" element={<AccountSettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/scan" element={<ScanPage />} />

            <Route path="/account-mobile" element={<AccountMobile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
