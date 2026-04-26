import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";


type Product = {
  id: string;
  nome: string;
};

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  async function handleSubmit() {
    const token = localStorage.getItem("token");

    await api.post(
      "/orders",
      {
        productId,
        quantidade: Number(quantidade),
      },
      {
        headers: { Authorization: token || "" },
      }
    );

    navigate("/orders");
  }

  return (
    <Layout>
      <h1>Novo Pedido</h1>

      <select onChange={(e) => setProductId(e.target.value)}>
        <option value="">Selecione</option>

        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <input
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <button onClick={handleSubmit}>Salvar</button>
    </Layout>
  );
}