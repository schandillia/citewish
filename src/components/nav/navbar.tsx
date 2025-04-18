import Link from "next/link"
import { Wrapper } from "@/components/wrapper"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/auth"
import { BrandLogo } from "@/components/nav/brand-logo"
import { AuthButton } from "@/components/auth/auth-button"
import UserNavMenu from "@/components/nav/user-nav-menu"
import { DashboardNavButton } from "@/components/nav/dashboard-nav-button"
// import { DashboardNavButton } from "@/components/dashboard-nav-button"
// import UserNavMenu from "@/components/user-nav-menu"

export const Navbar = async () => {
  const session = await auth()

  const navLinks: {
    href: string
    label: string
    variant:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
  }[] = [
    { href: "/pricing", label: "Pricing", variant: "link" },
    { href: "/cite", label: "Cite", variant: "link" },
  ]

  return (
    <nav className="sticky z-50 h-16 inset-x-0 top-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-brand-900/75 backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            <BrandLogo />
          </Link>

          <div className="h-full flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${buttonVariants({
                  size: "sm",
                  variant: link.variant,
                })} dark:text-brand-50`}
              >
                {link.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <DashboardNavButton />
                <UserNavMenu user={session.user} />
              </>
            ) : (
              <>
                {/* {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${buttonVariants({
                      size: "sm",
                      variant: link.variant,
                    })} dark:text-brand-50`}
                  >
                    {link.label}
                  </Link>
                ))} */}
                <div className="h-8 w-px bg-gray-200" />
                <AuthButton />
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}
