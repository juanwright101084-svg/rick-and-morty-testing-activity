export default function PruebasPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold">
          Pruebas automatizadas
        </h1>

        <p className="mb-6 text-gray-300">
          Estas pruebas verifican los componentes, las páginas y las funciones
          de la API para comprobar que la aplicación funciona correctamente.
        </p>

        <a
          href="/coverage/index.html"
          className="inline-block rounded bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Ver reporte de cobertura
        </a>
      </section>
    </main>
  );
}