import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/12 bg-primary-900/40 backdrop-blur transition-all duration-500 ease-out">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="rounded-lg p-2 text-neutral-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-ring"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="rounded-lg p-2 text-neutral-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-ring"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="rounded-lg p-2 text-neutral-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-ring"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Student Research Initiative. All rights reserved.</p>
            <p className="mt-1">McGill University</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
