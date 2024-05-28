import AppRouter from './router/AppRouterDoc';
import {NextUIProvider} from "@nextui-org/react";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NextUIProvider>
          <AppRouter />
        </NextUIProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
