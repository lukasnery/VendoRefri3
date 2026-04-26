import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  products: number;
  orders: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");

      const products = await api.get("/products", {
        headers: { Authorization: token || "" },
      });

      const orders = await api.get("/orders", {
        headers: { Authorization: token || "" },
      });

      setStats({
        products: products.data.length,
        orders: orders.data.length,
      });
    }

    load();
  }, []);

  const data = [
    { name: "Produtos", total: stats.products },
    { name: "Pedidos", total: stats.orders },
  ];

  return (
    <Layout>
      <h1>Dashboard</h1>

      {/* CARDS */}
      <div style={grid}>
        <Card title="Produtos" value={stats.products} />
        <Card title="Pedidos" value={stats.orders} />
        <Card title="Status" value="Online" />
      </div>

      {/* GRÁFICO */}
      <div style={chartBox}>
        <h2>Visão geral</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

function Card({ title, value }: any) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 28, fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const chartBox = {
  marginTop: 30,
  background: "#fff",
  padding: 20,
  borderRadius: 12,
};