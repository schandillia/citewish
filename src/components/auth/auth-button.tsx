"use client"

// import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"

export const AuthButton = () => {
  const [showModal, setShowModal] = useState(false)

  const onClick = () => setShowModal(true)

  return (
    <>
      <Button variant="brand" size="sm" onClick={onClick}>
        Get started
      </Button>

      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <p>test</p>
        </Modal>
      )}
    </>
  )
}
