import { Routes, Route, Navigate } from "react-router";

import { CardsDetailPage, DashboardPage, LoginPage } from "@/pages";
import { Layout } from "@/pages/layout";
import { PrivateRoute } from "@/components/PrivateRoute";
import Perfil from "@/pages/Perfil/Perfil";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="cards/detail/:id" element={<CardsDetailPage />} />
        <Route path="profile" element={<Perfil />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
