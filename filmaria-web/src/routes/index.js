import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../pages/Home";
import Favoritos from "../pages/Favoritos";
import Filme from "../pages/Filme";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/"          element={<Footer />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/filme/:id" element={<Filme />} />
            </Routes>
            
        </BrowserRouter>
    )
}