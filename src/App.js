import AppRouter from './router/AppRouterDoc';
import {NextUIProvider} from "@nextui-org/react";
import { PictureProfilProvider } from "./context/profilePicture";

function App() {

  return (
    <div className="App">
        <NextUIProvider>
          <PictureProfilProvider>
            <AppRouter />
          </PictureProfilProvider>
        </NextUIProvider>
    </div>
  );
}

export default App;
