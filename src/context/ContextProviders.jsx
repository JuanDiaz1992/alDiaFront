import { HomeChangeProvider } from "./HomeContext";
import { PictureProfilProvider } from "./profilePicture";
import { NextUIProvider } from "@nextui-org/react";
import { FinanceProvider } from "./FinancialProviders";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ContextProviders = ({ children }) => {
  const clientId=import.meta.env.VITE_CLIENT_ID_GOOGLE;
  return (
    <NextUIProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <PictureProfilProvider>
          <HomeChangeProvider>
            <FinanceProvider>
              {children}
            </FinanceProvider>
          </HomeChangeProvider>
        </PictureProfilProvider>
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
};

export default ContextProviders;
