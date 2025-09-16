import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary-900/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-ring"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-ring"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-ring"
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
