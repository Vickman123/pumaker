import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Lock, Mail, KeyRound, ShieldAlert } from 'lucide-react';
import { Logo } from '../components/Logo';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@pumaker.unam.mx');
  const [password, setPassword] = useState('Pumaker2026!AdminSecure');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.adminLogin({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('pumaker_admin_token', res.token);
        localStorage.setItem('pumaker_admin_user', JSON.stringify(res.user));
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Credenciales de acceso incorrectas.');
      }
    } catch {
      setError('Error al comunicar con el servidor backend. Verifica que esté activo en el puerto 3000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Logo className="justify-center mb-3" />
          <h1 className="text-xl font-black text-puma-dark">
            Acceso Administrativo PUMAKER
          </h1>
          <p className="text-xs text-slate-500">
            Ingreso exclusivo para administradores y moderadores de contenido.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Institucional</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-xs !py-3 font-bold flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
          </button>
        </form>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-500 text-center">
          Credenciales predeterminadas para desarrollo local: <br />
          <strong className="text-slate-700">admin@pumaker.unam.mx</strong> / <strong className="text-slate-700">Pumaker2026!AdminSecure</strong>
        </div>
      </div>
    </div>
  );
};
