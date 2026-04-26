import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "../../components/Toast";

type Product = {
  id: string;
  nome: string;
  preco: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  async function loadProducts(currentPage = 1) {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/products?page=${currentPage}&limit=5`,
        {
          headers: { Authorization: token || "" },
        }
      );

      setProducts(response.data);
    } catch {
      toast("Erro ao carregar produtos");
    }
  }

  async function handleDelete(id: string) {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: { Authorization: token || "" },
      });

      toast("Produto deletado");
      loadProducts(page);
    } catch (error: any) {
      toast(error.response?.data?.message || "Erro ao deletar");
    }
  }

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  return (
    <Layout>
      <h1>Produtos</h1>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.nome}</p>
          <p>R$ {product.preco}</p>

          <button onClick={() => navigate(`/products/edit/${product.id}`)}>
            Editar
          </button>

          <button onClick={() => handleDelete(product.id)}>
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