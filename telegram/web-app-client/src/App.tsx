import { AnimatePresence } from "framer-motion";
import { AuthUserProvider } from "processes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "pages/home";
import { LoginPage } from "pages/login.page";
import { PrivacyPolicyPage } from "pages/privacy-policy.page";
import { AboutAppPage } from "pages/profile/about/about-app.page";
import { UserAgreementPage } from "pages/profile/about/user-agreement.page";
import { FeedbackPage } from "pages/profile/feedback.page";
import { ProfileEditPage } from "pages/profile/profile-edit.page";
import { ProfilePage } from "pages/profile/profile.page";
import { QrPage } from "pages/qr/qr.page";
import { ShopDetailPage } from "pages/shops/shop-detail/shop-detail.page";
import { ShopsPage } from "pages/shops/shops.page";

import { BaseLayout } from "widgets/ui/base-layout/base-layout";

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />

          <Route element={<AuthUserProvider />}>
            <Route index path="/" element={<HomePage />} />
            <Route element={<BaseLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/edit" element={<ProfileEditPage />} />
              <Route path="about-app" element={<AboutAppPage />} />
              <Route path="user-agreement" element={<UserAgreementPage />} />
              <Route path="feedback" element={<FeedbackPage />} />

              <Route path="qr" element={<QrPage />} />
              <Route path="shops" element={<ShopsPage />} />
              <Route path="shops/:id" element={<ShopDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
