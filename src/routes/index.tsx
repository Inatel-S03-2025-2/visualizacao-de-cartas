import { Routes, Route } from "react-router";

import { CardsDetailPage, DashboardPage, LoginPage } from "@/pages";
import { Layout } from "@/pages/layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="cards/detail/:id" element={<CardsDetailPage />} />
      </Route>
    </Routes>
  );
}
