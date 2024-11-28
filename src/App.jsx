import AppRouter from './router/AppRouterDoc';
import ContextProviders  from "./context/ContextProviders";
function App() {
    return (
      <div className="App">
          <ContextProviders>
              <AppRouter/>
          </ContextProviders>
      </div>
    )
}

export default App
