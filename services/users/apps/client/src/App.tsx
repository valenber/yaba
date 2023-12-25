import "./App.css";
import { LoginView } from "./views/Login";
import { Error404View } from "./views/Error404";

// poor man's router
const CurentView = () => {
  if (window.location.pathname.endsWith("/login")) {
    return <LoginView />;
  }

  return <Error404View />;
};

function App() {
  return <CurentView />;
}

export default App;
