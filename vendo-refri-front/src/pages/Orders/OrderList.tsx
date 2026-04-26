import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout/Layout";

type Order = {
  id: string;
  quantidade: number;
  total: number;
  product: { nome: string; preco: number };
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);

  async function loadOrders(currentPage = 1) {
    const token = localStorage.getItem("token");

    const response = await api.get(
      `/orders?page=${currentPage}&limit=5`,
      {
        headers: { Authorization: token || "" },
      }
    );

    setOrders(response.data);
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    await api.delete(`/orders/${id}`, {
      headers: { Authorization: token || "" },
    });

    loadOrders(page);
  }

  useEffect(() => {
    loadOrders(page);
  }, [page]);

  return (
    <Layout>
      <h1>Pedidos</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.product.nome}</p>
          <p>{order.quantidade}</p>
          <p>R$ {order.quantidade * order.product.preco}</p>

          <button onClick={() => handleDelete(order.id)}>
            Deletar
          </button>
        </div>
      ))}

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>

        <span>Página {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Próxima
        </button>
      </div>
    </Layout>
  );
}