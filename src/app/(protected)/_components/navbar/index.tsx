"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Calendar, Home, Trophy, User } from "lucide-react";
import { FaBars, FaXmark } from "react-icons/fa6";
import "./style.css";

interface NavItemProps {
  url: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ url, label, icon, isActive }: NavItemProps) => {
  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link href={url} className="nav-link">
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  );
};

export default function Navbar() {
  const items = [
    {
      url: "/home",
      label: "Início",
      icon: <Home className="h-5 w-5" />,
    },
    {
      url: "/classification",
      label: "Classificação",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      url: "/games",
      label: "Jogos",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      url: "/profile",
      label: "Perfil",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <Link href="/" className="logo">
          <Image src="logo.png" width={50} height={50} alt="Logo do sistema" />
        </Link>

        <ul className={`nav-items ${openMenu ? "open" : ""}`}>
          {items.map((item, index) => (
            <NavItem
              key={index}
              url={item.url}
              label={item.label}
              icon={item.icon}
              isActive={pathname === item.url}
            />
          ))}
        </ul>

        <button className="btn-mobile" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FaXmark /> : <FaBars />}
        </button>
      </nav>
    </header>
  );
}
