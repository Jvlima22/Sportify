"use client";

import { Calendar, Home, Trophy, User, LogOut, Gem } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";

const items = [
  {
    title: "Início",
    url: "/home",
    icon: Home,
  },
  {
    title: "Classificação",
    url: "/classification",
    icon: Trophy,
  },
  {
    title: "Jogos",
    url: "/games",
    icon: Calendar,
  },
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
];

const SidebarSheet = () => {
  const router = useRouter();
  const session = authClient.useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  return (
    <SheetContent className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <Image src="/Logo.png" alt="Sportify" width={100} height={28} />
      </SheetHeader>

      <Separator />

      <SidebarGroup className="flex flex-col gap-4 border-b border-solid py-5 mt-[-18px]">
        <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-col gap-4">
              <SheetClose asChild>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SheetClose>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Outros</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/subscription"}
              >
                <Link href="/subscription">
                  <Gem />
                  <span>Assinatura</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter className="mt-auto pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage
                      src={session.data?.user.image || undefined}
                      alt={session.data?.user.name}
                    />
                    <AvatarFallback>
                      {session.data?.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{session.data?.user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {session.data?.user.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SheetContent>
  );
};

export default SidebarSheet;
