import { Container, Footer, Header } from "@/components";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <main>
        <Header />
          <Container>
            <Outlet />
          </Container>
        <Footer />
      </main>
    </>
  );
}
