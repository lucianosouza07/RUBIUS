import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SidebarLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNewChat = () => {
    navigate("/dashboard");
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-surface text-text-primary font-body h-screen overflow-hidden flex flex-col md:flex-row antialiased mx-auto w-full max-w-[1280px]">
      {/* Sidebar Navigation */}
      <aside
        id="sidebar"
        className="hidden md:flex flex-col bg-surface border-r border-border w-sidebar-width h-screen sticky left-0 top-0 transition-all duration-200 z-40"
      >
        <div className="flex flex-col h-full p-md gap-md">
          {/* Logo Header */}
          <div className="flex items-center gap-md py-md px-sm">
            <img
              alt="Rubius Logo"
              className="w-9 h-9 rounded-full object-cover border border-border"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfC9aao1iuqeyxn_kQ8Uis_oTwT_0gA7V6vspa6hiVnOckE0mWezi6P4sOYsTF7dhCpJoKJEI2cijc-LcsTODHhxAKH_5a0m2mzAxqbig-O8nttz83ePzpSwTy7smpOa0YVor9s8dAPvy1KCMOcbcUz50bepdeO35y4uHe8fSAXsT2ebZ-mnauX4Vx4Es9md2R8PnfK2B6UowxFNJk5wKBBGCln5eJEs77G5mha7wvWl-CIUkoQxPkMu3ZGBKjVtSmOEHodFxu6fU"
            />
            <div>
              <h1 className="font-headline text-[22px] font-semibold text-text-primary leading-none">
                Rubius
              </h1>
              <p className="text-[14px] text-text-muted mt-1">
                Assistente da Copa
              </p>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-sm w-full py-3 bg-primary text-white rounded-md text-[13px] font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              add
            </span>
            Novo Chat
          </button>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-md flex flex-col gap-sm">
            <Link
              className={`flex items-center gap-md px-md py-[10px] transition-all rounded-md ${
                isActive("/worldcup-hub")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant hover:text-text-primary"
              }`}
              to="/worldcup-hub"
            >
              <span className="material-symbols-outlined text-[20px]">
                emoji_events
              </span>
              <span className="text-[13px] font-medium">Central Copa</span>
            </Link>
            <Link
              className={`flex items-center gap-md px-md py-[10px] transition-all rounded-md ${
                isActive("/spaces")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant hover:text-text-primary"
              }`}
              to="/spaces"
            >
              <span className="material-symbols-outlined text-[20px]">
                explore
              </span>
              <span className="text-[13px] font-medium">Espaços</span>
            </Link>
            <Link
              className={`flex items-center gap-md px-md py-[10px] transition-all rounded-md ${
                isActive("/chat")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant hover:text-text-primary"
              }`}
              to="/chat"
            >
              <span className="material-symbols-outlined text-[20px]">
                history
              </span>
              <span className="text-[13px] font-medium">Histórico</span>
            </Link>
            <Link
              className={`flex items-center gap-md px-md py-[10px] transition-all rounded-md ${
                isActive("/computer-mode")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant hover:text-text-primary"
              }`}
              to="/computer-mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                desktop_windows
              </span>
              <span className="text-[13px] font-medium">Modo Computador</span>
            </Link>
          </nav>

          {/* Footer Links */}
          <div className="border-t border-border pt-md flex flex-col gap-sm">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex items-center gap-md px-md py-[10px] text-text-muted hover:bg-surface-variant hover:text-text-primary transition-colors rounded-md text-left w-full"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
              <span className="text-[13px] theme-label">
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-md px-md py-[10px] text-text-muted hover:bg-surface-variant hover:text-text-primary transition-all rounded-md text-left w-full"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              <span className="text-[13px] font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* TopAppBar (Mobile Only) */}
      <header className="fixed top-0 w-full z-50 md:hidden bg-surface/80 backdrop-blur-md border-b border-border flex justify-between items-center h-16 px-md">
        <div className="flex items-center gap-sm">
          <img
            alt="Rubius Logo"
            className="w-6 h-6 rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfC9aao1iuqeyxn_kQ8Uis_oTwT_0gA7V6vspa6hiVnOckE0mWezi6P4sOYsTF7dhCpJoKJEI2cijc-LcsTODHhxAKH_5a0m2mzAxqbig-O8nttz83ePzpSwTy7smpOa0YVor9s8dAPvy1KCMOcbcUz50bepdeO35y4uHe8fSAXsT2ebZ-mnauX4Vx4Es9md2R8PnfK2B6UowxFNJk5wKBBGCln5eJEs77G5mha7wvWl-CIUkoQxPkMu3ZGBKjVtSmOEHodFxu6fU"
          />
          <span className="font-headline text-lg font-bold text-text-primary">
            Rubius
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-text-muted"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-surface/95 backdrop-blur-md flex flex-col pt-20 px-md pb-md">
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-sm w-full py-3 bg-primary text-white rounded-md text-[13px] font-medium hover:bg-primary-hover transition-colors mb-md"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            Novo Chat
          </button>
          <nav className="flex-1 flex flex-col gap-sm">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-md px-md py-[12px] rounded-md ${
                isActive("/worldcup-hub")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant"
              }`}
              to="/worldcup-hub"
            >
              <span className="material-symbols-outlined text-[20px]">
                emoji_events
              </span>
              <span className="text-[14px] font-medium">Central Copa</span>
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-md px-md py-[12px] rounded-md ${
                isActive("/spaces")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant"
              }`}
              to="/spaces"
            >
              <span className="material-symbols-outlined text-[20px]">
                explore
              </span>
              <span className="text-[14px] font-medium">Espaços</span>
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-md px-md py-[12px] rounded-md ${
                isActive("/chat")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant"
              }`}
              to="/chat"
            >
              <span className="material-symbols-outlined text-[20px]">
                history
              </span>
              <span className="text-[14px] font-medium">Histórico</span>
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-md px-md py-[12px] rounded-md ${
                isActive("/computer-mode")
                  ? "bg-surface-variant text-text-primary"
                  : "text-text-muted hover:bg-surface-variant"
              }`}
              to="/computer-mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                desktop_windows
              </span>
              <span className="text-[14px] font-medium">Modo Computador</span>
            </Link>
          </nav>
          <div className="border-t border-border pt-md flex flex-col gap-sm">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-md px-md py-[12px] text-text-muted hover:bg-surface-variant hover:text-text-primary transition-colors rounded-md text-left w-full"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
              <span className="text-[14px] theme-label">
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </span>
            </button>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-md px-md py-[12px] text-text-muted hover:bg-surface-variant hover:text-text-primary transition-all rounded-md text-left w-full"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              <span className="text-[14px] font-medium">Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <Outlet />
    </div>
  );
}
