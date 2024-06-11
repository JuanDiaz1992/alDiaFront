import AppRouter from './router/AppRouterDoc';

import { PictureProfilProvider } from "./context/profilePicture";
function App() {
    return (
      <div className="App">
          <PictureProfilProvider>
              <AppRouter/>
          </PictureProfilProvider>
      </div>
    )
}

export default App
