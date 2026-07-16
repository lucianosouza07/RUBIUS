import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { rubius_api } from "../api/rubius";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

type SignUpPayload = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { authenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) navigate("/dashboard");
  }, [authenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload: SignUpPayload = { email, password };
      await rubius_api.post("/register", payload);
      alert("Conta criada com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (err: any) {
      console.log("handleSubmit: ", err);
      setErrorMsg("Erro ao registrar a conta. Verifique os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-text-primary font-body-md min-h-screen w-full flex items-center justify-center p-md overflow-hidden relative">
      {/* Floating Theme Toggle */}
      <div className="absolute top-md right-md">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full border border-border bg-surface-variant hover:bg-border text-on-surface transition-all flex items-center justify-center shadow-sm"
          aria-label="Alternar Tema"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>

      {/* Auth Container */}
      <main className="w-full max-w-[400px] bg-surface-variant border border-border rounded-xl p-xl flex flex-col gap-xl relative shadow-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-md">
          <div className="w-16 h-16 rounded-lg bg-surface border border-border flex items-center justify-center p-sm mb-sm overflow-hidden">
            <img
              alt="Rubius Logo"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv3WuvMBPqblW8WplCydqfL9qLgU3KncCSwVkzOc9aquZUxu_WCUTO8Dm1UTAq-SmuftJL0-W_JgO3D4DktF6hSzcnpfm90cz-SZkKJmI60djFg9xV9xAKaAXNefZ3HdhimO7JPbE8Pqfa1XagsPnesG4pgRWS2nlwFvT0ljVESVZR65NynCf5mOC1RjbAvadFuWxzakuHMaT2kyUrWWAZitpXvMlWCXfHkhwLZ_kT-j9-W_QhBTSIJsNxfg4uIEd5IYjd3wUozRM"
            />
          </div>
          <h1 className="font-headline text-[22px] font-semibold text-text-primary">
            Criar conta no Rubius
          </h1>
          <p className="font-body text-sm text-text-muted">
            Registre-se para começar.
          </p>
        </div>

        {/* Credentials Form */}
        <form className="flex flex-col gap-lg" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-md">
            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label
                className="font-body text-[11px] font-semibold text-text-muted uppercase"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="w-full h-12 bg-surface border border-border rounded-md px-md font-body text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                id="email"
                placeholder="nome@exemplo.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-xs">
              <label
                className="font-body text-[11px] font-semibold text-text-muted uppercase"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                className="w-full h-12 bg-surface border border-border rounded-md px-md font-body text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                id="password"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full h-12 flex items-center justify-center bg-primary hover:bg-primary-hover text-on-primary rounded-md font-body text-[13px] font-semibold transition-colors disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="font-body text-sm text-text-muted">
            Já tem uma conta?
            <Link
              className="font-body text-[13px] text-primary hover:text-primary-hover transition-colors ml-xs"
              to="/login"
            >
              Entrar na conta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
