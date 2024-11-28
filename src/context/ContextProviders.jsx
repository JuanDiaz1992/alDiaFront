import { HomeChangeProvider } from "./HomeContext";
import { PictureProfilProvider } from "./profilePicture";
import { NextUIProvider } from "@nextui-org/react";
import { FinanceProvider } from "./FinancialProviders";

const ContextProviders = ({ children }) => {
  return (
    <NextUIProvider>
      <PictureProfilProvider>
        <HomeChangeProvider>
          <FinanceProvider>
            {children}
          </FinanceProvider>
        </HomeChangeProvider>
      </PictureProfilProvider>
    </NextUIProvider>
  );
};

export default ContextProviders;
