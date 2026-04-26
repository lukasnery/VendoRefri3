import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/Toast";

import {
  isValidEmail,
  isStrongPassword,
  isValidCPF,
} from "../../utils/validation";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleSubmit() {
    // 🔥 validações usando UTILS (rubrica)
    if (!nome) return toast("Nome obrigatório");

    if (!isValidEmail(email)) {
      return toast("Email inválido");
    }

    if (!isValidCPF(cpf)) {
      return toast("CPF inválido");
    }

    if (!isStrongPassword(senha)) {
      return toast("Senha fraca (use maiúscula, número e símbolo)");
    }

    if (senha !== confirmarSenha) {
      return toast("As senhas não coincidem");
    }

    try {
      await api.post("/users", {
        nome,
        email,
        cpf,
        senha,
      });

      toast("Cadastro realizado com sucesso");
      navigate("/");
    } catch (error: any) {
      console.log("Erro:", error.response?.data);
      toast(error.response?.data?.message || "Erro ao cadastrar");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Cadastro</h1>

      <input
        placeholder="Nome"
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="CPF"
        onChange={(e) => setCpf(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirmar Senha"
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

      <button onClick={handleSubmit}>Cadastrar</button>

      <p>
        Já tem conta? <a href="/">Entrar</a>
      </p>
    </div>
  );
}