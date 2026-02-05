export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-gray-600">Acesse o sistema Ingresse Club</p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Usuário</label>
            <input type="text" className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input type="password" className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
