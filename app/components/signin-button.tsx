"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
  return <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => signIn()}>Sign In</button>
}