import AppRouter from './router/AppRouterDoc';
import {NextUIProvider} from "@nextui-org/react";
import { AuthProvider } from './context/AuthContext';
import { PictureProfilProvider } from "./context/profilePicture";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NextUIProvider>
          <PictureProfilProvider>
            <AppRouter />
          </PictureProfilProvider>
        </NextUIProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
