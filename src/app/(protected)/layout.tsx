import Header from "./_components/header/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <main className="w-full">
        <Header />
        {children}
      </main>
  );
}
