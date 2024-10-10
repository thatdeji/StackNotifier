export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full mx-auto min-h-screen p-6 max-w-96 md:max-w-100 flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
