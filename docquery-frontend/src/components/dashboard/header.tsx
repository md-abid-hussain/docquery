import { Mountain } from "lucide-react"
import Link from "next/link"

export default function Header() {
    return (
        <header className="p-4 flex items-center border-b fixed top-0 w-full z-50 bg-white">
            <Link className="flex items-center justify-center" href="/">
                <Mountain className="h-6 w-6" />
                <span className="ml-2 text-lg font-semibold">DocQuery</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/d/chat">
                    Chat
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/d/ingest">
                    Ingest
                </Link>
            </nav>
        </header>
    )

}