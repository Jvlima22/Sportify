import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={session?.user?.image || "/futebol.png"}
            alt="User"
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Bem-vindo</span>
          <span className="text-xs text-muted-foreground">
            {session?.user?.name || "Usuário"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-accent transition-colors">
          <Bell className="h-5 w-5 text-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-accent transition-colors">
          <Menu className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
