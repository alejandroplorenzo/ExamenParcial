import { PageProps } from "$fresh/server.ts";
import Footer from "../components/footer.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout">
        <a href="/">INICIO</a>
      <Component />
      <Footer />
    </div>
  );
}