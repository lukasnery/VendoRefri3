import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { toast } from "../../components/Toast";
import { isValidEmail } from "../../utils/validation";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!isValidEmail(email)) {
      return toast("Email inválido");
    }

    if (!senha) {
      return toast("Senha obrigatória");
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      login(response.data.token, response.data.user);

      toast("Login realizado com sucesso");

      navigate("/dashboard");
    } catch (error: any) {
      toast(error.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p>
        Não tem conta? <a href="/register">Cadastrar</a>
      </p>
    </div>
  );
}