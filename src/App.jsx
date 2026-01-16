import { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Lazy load components for better performance
const MusicPlayer = lazy(() => import("./Components/MusicPlayer"));
const SplashCursor = lazy(() => import("./Components/SplashCursor"));
const AppRouter = lazy(() => import("./Routers"));
const Navbar = lazy(() => import("./Components/Header/header"));
const Footer = lazy(() => import("./Components/Footer/footer"));
const Sidebar = lazy(() => import("./Components/Sidebar/Sidebar"));
const ModalVideoProvider = lazy(() => import("./Components/Video/ModalVideoContext").then(module => ({ default: module.ModalVideoProvider })));
const NavProvider = lazy(() => import("./Components/Context/NavContext").then(module => ({ default: module.NavProvider })));

function App(){
    return (
        <Suspense fallback={
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-accent" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }>
            <SplashCursor />

            {/* ✅ NEW: The Floating Music Button */}
            <MusicPlayer />

            <Router>
                <NavProvider>
                    <ModalVideoProvider>
                        <Navbar />
                        <Sidebar />
                        <AppRouter />
                        <Footer />
                    </ModalVideoProvider>
                </NavProvider>
            </Router>
        </Suspense>
    );
}

export default App;
