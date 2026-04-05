"use client"

import { useState } from "react"
import { signUp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 bg-transparent sm:border sm:border-blush-100 sm:bg-blush-50 p-6 sm:p-10 text-center space-y-6">
          <CardHeader>
            <CardTitle className="text-4xl font-serif text-rose lowercase">Check your email</CardTitle>
            <CardDescription className="text-sm">
              We&apos;ve sent a verification link to your KIET email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button variant="outline" className="w-full h-12 uppercase tracking-widest text-[10px]">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md border-0 bg-transparent sm:border sm:border-blush-100 sm:bg-blush-50 p-6 sm:p-10 transition-editorial">
        <CardHeader className="space-y-4 text-center px-0">
          <CardTitle className="text-5xl font-serif text-rose lowercase">blushhh</CardTitle>
          <CardDescription className="metadata text-[10px] uppercase tracking-widest text-ink/30">
            Join the exclusive KIET circle
          </CardDescription>
        </CardHeader>
        
        <CardContent className="mt-8 px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="space-y-2"
            >
              <Label htmlFor="name" className="metadata text-[9px] uppercase tracking-[0.2em] font-black text-rose/60">FULL NAME</Label>
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Ayush Kumar" 
                required 
                disabled={isLoading}
                className="bg-white/50 border-blush-100 focus:border-rose transition-all"
              />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="space-y-2"
            >
              <Label htmlFor="email" className="metadata text-[9px] uppercase tracking-[0.2em] font-black text-rose/60">KIET EMAIL</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="your.name@kiet.edu" 
                required 
                disabled={isLoading}
                className="bg-white/50 border-blush-100 focus:border-rose transition-all"
              />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="space-y-2"
            >
              <Label htmlFor="password" className="metadata text-[9px] uppercase tracking-[0.2em] font-black text-rose/60">PASSWORD</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                disabled={isLoading}
                className="bg-white/50 border-blush-100 focus:border-rose transition-all"
              />
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
            >
              <Button type="submit" className="w-full h-14 bg-rose hover:bg-deep-rose text-white border-0 shadow-xl shadow-rose/20 uppercase tracking-[0.3em] font-black text-[10px]" disabled={isLoading}>
                {isLoading ? "CREATING ACCOUNT..." : "JOIN THE CIRCLE →"}
              </Button>
            </motion.div>
          </form>

          {error && (
            <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-rose font-black animate-pulse">
              {error}
            </p>
          )}

          <div className="mt-10 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-ink/30 font-bold">
              Already a member? <Link href="/login" className="text-rose hover:underline">Log In</Link>
            </p>
            <p className="font-serif italic text-xs text-ink/30">
              Only @kiet.edu addresses are permitted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
