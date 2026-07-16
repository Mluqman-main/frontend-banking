import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navber from "./components/Navber";
import Register from "./pages/Register";
import IntroPage from "./pages/Intro";
import Login from "./pages/login";
import VerifyOtp from "./components/Otpverfiaction";
import Dashbord from "./pages/Dashbord";
import BankDashboard from "./pages/BankDashboard";
import Transfer from "./components/Transfer";
import ForgotPassword from "./pages/resetpassword";
import UpdatePassword from "./pages/updatepassorwd";
import RestOtp from "./components/restotp";
import Transicationshastry from "./components/Transicationshastry";
import VerifyresetOtp from "./components/verfiyresestotp";
import Loan from "./components/loan";
import Footer from "./components/Footer";
import AccountLimit from "./components/accountlimite";
import Features from "./pages/intropages/Features";
import Security from "./pages/intropages/Security";
import Support from "./pages/intropages/Support";
import TermsOfService from "./pages/intropages/TermsOfService";
import PrivacyPolicy from "./pages/intropages/PrivacyPolicy";




function Layout() {
  const location = useLocation();

  const hideNavbar = [
    "/",
    "/login",
    "/register",
    "/verifyotp",
    "/forgotpassword",
    "/updatepassword",
    "/resetotp",
    "/verifyresetotp",
    "/features",
    "/security",
    "/support",
    "/terms",
    "/PrivacyPolicy",
  ].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbar && <Navber />}

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/bankdashboard" element={<BankDashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transicationshastry" element={<Transicationshastry />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/resetotp" element={<RestOtp />} />
        <Route path="/verifyresetotp" element={<VerifyresetOtp />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/loan-limit" element={<AccountLimit />} />
        <Route path="/features" element={<Features />} />
        <Route path="/security" element={<Security />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;