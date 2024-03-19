import { AuthProvider } from "processes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AccountBusinessPage } from "pages/account/account-business.page";
import { AccountHelpPage } from "pages/account/account-help.page";
import { AccountLoyalPage } from "pages/account/account-loyal.page";
import { AccountPaymentPage } from "pages/account/account-payment.page";
import { AccountSettingsPage } from "pages/account/account-settings.page";
import { AccountPage } from "pages/account/acoount.page";
import { AuthPage } from "pages/auth.page";
import { ClientDetailPage } from "pages/clients/client-detail.page";
import { ClientsPage } from "pages/clients/clients.page";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/login.page";
import { PrivacyPolicyPage } from "pages/privacy-policy.page";
import { QrScannerPage } from "pages/qr-scanner.page";
import { RegisterPage } from "pages/register.page";
import { UserAgreementPage } from "pages/user-agreement.page";

import { BaseLayout } from "widgets/ui/base-layout/base-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />

        <Route element={<AuthProvider />}>
          <Route index path="/" element={<HomePage />} />
          <Route element={<BaseLayout />}>
            <Route path="account" element={<AccountPage />} />
            <Route path="account/settings" element={<AccountSettingsPage />} />
            <Route path="account/loyal" element={<AccountLoyalPage />} />
            <Route path="account/business" element={<AccountBusinessPage />} />
            <Route path="account/payment" element={<AccountPaymentPage />} />
            <Route path="account/help" element={<AccountHelpPage />} />
            <Route path="user-agreement" element={<UserAgreementPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailPage />} />
            <Route path="qr-scanner" element={<QrScannerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
