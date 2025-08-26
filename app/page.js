export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-slate-50">
      <div className="space-y-4 p-10 rounded-2xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold tracking-tight">Tailwind ✅</h1>
        <p className="text-slate-600">
          If this card has rounded corners & a shadow, Tailwind works.
        </p>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Hover me
        </button>
        <div className="text-sm sm:text-lg">
          Resize window → this text grows on small+ screens.
        </div>
      </div>
    </main>
  );
}
