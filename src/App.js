import AppRouter from './router/AppRouterDoc';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <AppRouter />
      </NextUIProvider>
    </div>
  );
}

export default App;
