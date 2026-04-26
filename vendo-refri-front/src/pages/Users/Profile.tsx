import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import Layout from "../../components/Layout/Layout";
import { toast } from "../../components/Toast";

import { isValidCPF, isStrongPassword } from "../../utils/validation";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome || "");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!nome) return toast("Nome obrigatório");

    if (!isValidCPF(cpf)) {
      return toast("CPF inválido");
    }

    if (senha && !isStrongPassword(senha)) {
      return toast("Senha fraca");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/users/${user?.id}`,
        {
          nome,
          cpf,
          senha: senha || undefined,
        },
        {
          headers: {
            Authorization: token || "",
          },
        }
      );

      toast("Usuário atualizado com sucesso");
    } catch (error: any) {
      console.log(error.response?.data);
      toast(error.response?.data?.message || "Erro ao atualizar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1>Perfil</h1>
      <p><strong>Tipo:</strong> {user?.role}</p>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />

      <input
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="CPF"
      />

      <input
        type="password"
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Nova senha (opcional)"
      />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </Layout>
  );
}