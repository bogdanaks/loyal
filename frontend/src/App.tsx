import { AuthProvider } from "processes/auth-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AccountSettingsPage } from "pages/account-settings.page"
import { LoginPage } from "pages/auth/login.page"
import { RegisterPage } from "pages/auth/register.page"
import { BusinessPage } from "pages/business.page"
import { ClientsPage } from "pages/clients.page"
import { DashboardPage } from "pages/dashboard.page"
import { HelpPage } from "pages/help.page"
import { LoyalPage } from "pages/loyal.page"
import { PayPage } from "pages/pay.page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AuthProvider />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/loyal" element={<LoyalPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/pay" element={<PayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
