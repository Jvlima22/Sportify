import Header from "./_components/header/page";
import AuthProvider from "./_providers/session-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <main className="w-full">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
