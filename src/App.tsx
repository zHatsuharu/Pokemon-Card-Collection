import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import HeaderNavbar from "./components/navbar"
import ErrorPage from "./pages/error"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import AuthProvider from "./providers/auth-providers"
import CollectionPage from "./pages/collection"
import AuthGuard from "./guards/auth-guard"
import SetsPage from "./pages/sets"

function App() {
  return (
    <>
      <AuthProvider>
        <HeaderNavbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/sets" element={<SetsPage />} />

            <Route element={<AuthGuard />}>
              <Route path='/collection' element={<CollectionPage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
