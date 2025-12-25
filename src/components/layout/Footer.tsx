import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>Copyright © 2025</span>
            <Link
              href="https://axelit.com"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              axelit
            </Link>
            <span>. All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">v1.0.0</span>
            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-gray-900 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
