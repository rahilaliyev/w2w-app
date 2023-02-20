import "styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* <Header /> */}
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<HomePage />} exact path="/" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
