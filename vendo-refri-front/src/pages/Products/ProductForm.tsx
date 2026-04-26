import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "../../components/Toast";

export default function ProductForm() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const response = await api.get(`/products/${id}`);
      setNome(response.data.nome);
      setPreco(String(response.data.preco));
    }

    loadProduct();
  }, [id]);

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");

      const data = {
        nome,
        preco: Number(preco),
      };

      if (id) {
        await api.put(`/products/${id}`, data, {
          headers: { Authorization: token || "" },
        });
      } else {
        await api.post("/products", data, {
          headers: { Authorization: token || "" },
        });
      }

      toast("Salvo com sucesso");
      navigate("/products");
    } catch {
      toast("Erro ao salvar");
    }
  }

  return (
    <Layout>
      <h1>{id ? "Editar Produto" : "Novo Produto"}</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <button onClick={handleSubmit}>Salvar</button>
    </Layout>
  );
}