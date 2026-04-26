import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "#1e1e2f",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Sistema</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link style={{ color: "#fff" }} to="/dashboard">Dashboard</Link>
          <Link style={{ color: "#fff" }} to="/products">Produtos</Link>
          <Link style={{ color: "#fff" }} to="/orders">Pedidos</Link>
          <Link style={{ color: "#fff" }} to="/profile">Perfil</Link>
        </nav>

        <button
          onClick={logout}
          style={{
            marginTop: 20,
            padding: 8,
            width: "100%",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: 20, background: "#f4f4f4" }}>
        {children}
      </main>
    </div>
  );
}