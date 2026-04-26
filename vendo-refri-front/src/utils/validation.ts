export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
}

export function isValidCPF(cpf: string) {
  return cpf.replace(/\D/g, "").length === 11;
}