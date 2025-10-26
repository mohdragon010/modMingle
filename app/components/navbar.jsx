'use client'
import Link from "next/link";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../ThemeProvider"; // تأكد من المسار
import "@/styles/navbar.css";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <nav className="nav flex flex-row justify-between p-4 pr-10 items-center">
      <Link href="/"><h1 className="text-3xl font-bold">ModMingle</h1></Link>
      <ul className="flex flex-row gap-5 items-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/popular">Popular</Link></li>
        <li><Link href="/about">About</Link></li>
        <li>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}
