import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { rubius_api } from "../api/rubius";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (authenticated) navigate("/dashboard");
  }, [authenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      await rubius_api.post("/login", { email, password });
      setAuthenticated(true);
      navigate("/dashboard");
    } catch (err: any) {
      console.log("handleLogin: ", err);
      setErrorMsg("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <div className="bg-surface text-text-primary font-body min-h-screen flex items-center justify-center p-md w-full h-full relative">
      {/* Floating Theme Toggle */}
      <div className="absolute top-md right-md">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full border border-border bg-surface-variant hover:bg-border text-on-surface transition-all flex items-center justify-center shadow-sm" 
          aria-label="Alternar Tema"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* Auth Container */}
      <main className="w-full max-w-[400px] bg-surface-variant border border-border rounded-xl p-xl flex flex-col gap-xl relative shadow-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-md">
          <div className="w-16 h-16 rounded-lg bg-surface border border-border flex items-center justify-center p-sm mb-sm overflow-hidden">
            <img alt="Rubius Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv3WuvMBPqblW8WplCydqfL9qLgU3KncCSwVkzOc9aquZUxu_WCUTO8Dm1UTAq-SmuftJL0-W_JgO3D4DktF6hSzcnpfm90cz-SZkKJmI60djFg9xV9xAKaAXNefZ3HdhimO7JPbE8Pqfa1XagsPnesG4pgRWS2nlwFvT0ljVESVZR65NynCf5mOC1RjbAvadFuWxzakuHMaT2kyUrWWAZitpXvMlWCXfHkhwLZ_kT-j9-W_QhBTSIJsNxfg4uIEd5IYjd3wUozRM" />
          </div>
          <h1 className="font-headline-md text-headline-md text-text-primary">Bem-vindo ao Rubius</h1>
          <p className="font-body-sm text-body-sm text-text-muted">Acesse sua conta para continuar.</p>
        </div>
        
        {/* Social Auth */}
        <div className="flex flex-col gap-sm">
          <button onClick={handleMockLogin} className="w-full h-12 flex items-center justify-center gap-sm rounded-md border border-border bg-surface hover:bg-surface-variant transition-colors font-label-md text-label-md text-text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>login</span>
            Continuar com Google
          </button>
          <button onClick={handleMockLogin} className="w-full h-12 flex items-center justify-center gap-sm rounded-md border border-border bg-surface hover:bg-surface-variant transition-colors font-label-md text-label-md text-text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>phone_iphone</span>
            Continuar com Apple
          </button>
        </div>
        
        {/* Divider */}
        <div className="flex items-center gap-md">
          <div className="flex-1 h-px bg-border"></div>
          <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest">ou</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        
        {/* Credentials Form */}
        <form className="flex flex-col gap-lg" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-md">
            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-text-muted uppercase" htmlFor="email">E-mail</label>
              <input 
                className="w-full h-12 bg-surface border border-border rounded-md px-md font-body text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-0 focus:outline-none transition-colors" 
                id="email" 
                placeholder="nome@exemplo.com" 
                required 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-text-muted uppercase" htmlFor="password">Senha</label>
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-hover transition-colors" href="#">Esqueceu?</a>
              </div>
              <input 
                className="w-full h-12 bg-surface border border-border rounded-md px-md font-body text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-0 focus:outline-none transition-colors" 
                id="password" 
                placeholder="••••••••" 
                required 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <button 
            className="w-full h-12 flex items-center justify-center bg-primary hover:bg-primary-hover text-on-primary rounded-md font-label-md text-label-md transition-colors font-semibold disabled:opacity-50" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
        
        {/* Footer */}
        <div className="text-center">
          <p className="font-body-sm text-body-sm text-text-muted">
            Não tem uma conta? 
            <Link to="/register" className="font-label-md text-label-md text-primary hover:text-primary-hover transition-colors ml-xs">Criar conta</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
