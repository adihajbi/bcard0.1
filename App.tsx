import { Route, Routes } from "react-router-dom";
import { CardsPage } from "./pages/CardsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateCardPage } from "./pages/CreateCardPage";
import { EditCardPage } from "./pages/EditCardPage";
import { MyCardsPage } from "./pages/MyCardsPage";
import { FavoriteCardsPage } from "./pages/FavoriteCardsPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./ThemeContext";
import { SearchProvider } from "./SearchContext";
import { SandboxPage } from "./pages/SandboxPage";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ThemeProvider>
        <SearchProvider>
          <Navbar />
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<CardsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/my-cards" element={<MyCardsPage />} />
              <Route path="/create-card" element={<CreateCardPage />} />
              <Route path="/edit/:id" element={<EditCardPage />} />
              <Route path="/fav-cards" element={<FavoriteCardsPage />} />
              <Route path="/sandbox" element={<SandboxPage />} />
            </Routes>
          </div>
          <Footer />
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;