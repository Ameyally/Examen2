class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-4">Lo sentimos, ocurrió un error inesperado.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setAlert(null);

      try {
        const result = await authenticateUser(username, password);
        if (result.success) {
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          window.location.href = 'dashboard.html';
        } else {
          setAlert({ type: 'error', message: result.message });
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'Error al conectar con el servidor' });
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-4" data-name="app" data-file="app.js">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-shield-check text-3xl text-white"></div>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Sistema de Gestión</h1>
            <p className="text-[var(--text-secondary)]">Ingresa tus credenciales para continuar</p>
          </div>

          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 icon-user text-lg text-[var(--text-secondary)]"></div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 icon-lock text-lg text-[var(--text-secondary)]"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-sm font-bold text-[var(--primary-color)] mb-3">👤 Usuarios de Prueba Disponibles:</p>
            <div className="space-y-2 text-xs">
              <div className="bg-white p-2 rounded border border-pink-100">
                <p className="font-semibold text-purple-700">🔷 Super Usuarios:</p>
                <p className="text-[var(--text-secondary)]">• super1 / super123</p>
                <p className="text-[var(--text-secondary)]">• super2 / super456</p>
              </div>
              <div className="bg-white p-2 rounded border border-pink-100">
                <p className="font-semibold text-blue-700">🔷 Administradores:</p>
                <p className="text-[var(--text-secondary)]">• admin1 / admin123</p>
                <p className="text-[var(--text-secondary)]">• admin2 / admin456</p>
              </div>
              <div className="bg-white p-2 rounded border border-pink-100">
                <p className="font-semibold text-gray-700">🔷 Usuarios:</p>
                <p className="text-[var(--text-secondary)]">• user1 / user123</p>
                <p className="text-[var(--text-secondary)]">• user2 / user456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);