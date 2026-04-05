"use client"

import { useState } from "react"
import { signIn, sendOtp, verifyOtp, signInWithGoogle } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")

  async function handleGoogleLogin() {
    setIsLoading(true)
    const result = await signInWithGoogle()
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  async function handleSendOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    setEmail(formData.get("email") as string)
    const result = await sendOtp(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setOtpSent(true)
    }
    setIsLoading(false)
  }

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append("email", email)
    const result = await verifyOtp(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md border-0 bg-transparent sm:border sm:border-blush-100 sm:bg-blush-50 p-6 sm:p-10 transition-editorial">
        <CardHeader className="space-y-4 text-center px-0">
          <CardTitle className="text-5xl font-serif text-rose lowercase">blushhh</CardTitle>
          <CardDescription className="metadata text-[10px]">
            Exclusive for KIET Group of Institutions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="mt-8 px-0">
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 h-auto gap-4">
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="otp">Email OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="google" className="space-y-6">
              <div className="text-center space-y-2">
                <p className="font-serif italic text-sm text-ink-muted">
                  The simplest way to connect.
                </p>
              </div>
              <Button 
                onClick={handleGoogleLogin} 
                className="w-full h-12 text-sm tracking-widest"
                disabled={isLoading}
              >
                {isLoading ? "PROCEEDING..." : "CONTINUE WITH GOOGLE →"}
              </Button>
              <p className="text-[10px] uppercase tracking-widest text-center text-ink-ghost">
                Only @kiet.edu addresses allowed
              </p>
            </TabsContent>

            <TabsContent value="otp" className="space-y-6">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="metadata">KIET EMAIL</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your.name@kiet.edu" 
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12" disabled={isLoading}>
                    {isLoading ? "SENDING..." : "GET LOGIN CODE →"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="token" className="metadata">ENTER 6-DIGIT CODE</Label>
                    <Input 
                      id="token" 
                      name="token" 
                      type="text" 
                      placeholder="000000" 
                      maxLength={6}
                      required 
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-12" disabled={isLoading}>
                    {isLoading ? "VERIFYING..." : "LOGIN TO BLUSHHH →"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full text-[11px] h-auto p-0 hover:bg-transparent"
                    onClick={() => setOtpSent(false)}
                  >
                    ← CHANGE EMAIL
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          {error && (
            <p className="mt-6 text-center text-[11px] uppercase tracking-widest text-danger animate-in fade-in slide-in-from-bottom-2 duration-400">
              {error}
            </p>
          )}
        </CardContent>

        <div className="mt-12 text-center">
          <p className="font-serif italic text-xs text-ink-ghost">
            "Your digital diary for college connections."
          </p>
        </div>
      </Card>
    </div>
  )
}
