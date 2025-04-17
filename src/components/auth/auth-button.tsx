"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import Link from "next/link"
import brand from "@/lib/data/brand.json"

import { signInWithGoogle } from "@/app/actions/auth"
import { usePathname, useSearchParams } from "next/navigation"

export const AuthButton = () => {
  const [showModal, setShowModal] = useState(false)

  const onClick = () => setShowModal(true)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  // If the user is on the homepage ('/'), redirect to '/dashboard'
  const finalCallbackUrl = pathname === "/" ? "/dashboard" : pathname

  // Append 'intent' to the URL if it exists
  const redirectUrl = intent
    ? `${finalCallbackUrl}?intent=${intent}`
    : finalCallbackUrl

  return (
    <>
      <Button variant="brand" size="sm" onClick={onClick}>
        Get started
      </Button>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Login"
          description="Sign in to continue"
        >
          <div className="w-full space-y-6 p-6">
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
                onClick={() => signInWithGoogle(redirectUrl)}
              >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
              >
                <FaApple className="h-5 w-5" />
                <span>Continue with Apple</span>
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-4">
              <p>
                By continuing, you agree to {brand.BRAND}{" "}
                <Link href={"/terms"} className="font-medium text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={"/privacy"} className="font-medium text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
