
import {lazy,Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";


const IndexPage = lazy(() => import("./Views/IndexPage"));

const FavoritesPage = lazy(() => import("./Views/FavoritesPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={

            <Suspense fallback={<div>Loading...</div>}>
              <IndexPage />
            </Suspense>
          } />
          <Route path="favoritos" element={
            <Suspense fallback={<div>Loading...</div>}>
              <FavoritesPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
