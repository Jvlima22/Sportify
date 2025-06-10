"use client";

import { User, Calendar, Trophy, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2">
      <nav className="flex justify-around items-center">
        <button
          onClick={() => router.push("/home")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive("/home")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Início</span>
        </button>

        <button
          onClick={() => router.push("/classification")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive("/classification")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <Trophy className="h-5 w-5" />
          <span className="text-xs font-medium">Classificação</span>
        </button>

        <button
          onClick={() => router.push("/games")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive("/games")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-medium">Jogos</span>
        </button>

        <button
          onClick={() => router.push("/profile")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive("/profile")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Perfil</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
