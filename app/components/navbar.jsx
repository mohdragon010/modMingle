import Link from "next/link";
import "@/styles/navbar.css"
export default function Navbar() {
    return (
        <nav className="nav flex flex-row justify-between p-4 pr-10">
            <h1 className="text-3xl font-bold">ModMingle</h1>
            <ul className="flex flex-row gap-5">
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/popular">
                        Popular
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    )
}