import Link from "next/link";
import packageJson from "@/../package.json";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span>Copyright © 2025</span>
            <Link
              href="https://iworx.pro"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              iWorx.Pro
            </Link>
            <span>. All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 dark:text-gray-400">v{packageJson.version}</span>
            <Link
              href="/privacy"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
