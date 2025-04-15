import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./Views/IndexPage";
import FavoritesPage from "./Views/FavoritesPage";
import Layout from "./layouts/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="favoritos" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
