"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { Building2, LogOut, LayoutDashboard, Building, MessageSquare, Calendar, Newspaper, Lock } from "lucide-react"
import { AdminOverview } from "@/components/admin/overview"
import { AdminProperties } from "@/components/admin/properties"
import { AdminInquiries } from "@/components/admin/inquiries"
import { AdminViewings } from "@/components/admin/viewings"
import { AdminNews } from "@/components/admin/news"
import { toast } from "sonner"

type AdminView = "overview" | "properties" | "inquiries" | "viewings" | "news"

export default function AdminPage() {
  const { t, locale } = useI18n()
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<AdminView>("overview")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
    if (token) setAuthed(true)
    setLoading(false)
  }, [])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        setAuthed(true)
        toast.success(locale === "ar" ? "تم تسجيل الدخول" : "Login successful")
      } else {
        toast.error(data.error || t("admin.login.invalidCredentials"))
      }
    } catch {
      toast.error(locale === "ar" ? "فشل تسجيل الدخول" : "Login failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    setAuthed(false)
    setEmail("")
    setPassword("")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="max-w-md w-full p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={SITE_CONFIG.logoPath}
              alt="Abraj Trwada Real Estate Logo"
              className="h-16 w-16 rounded-xl object-cover ring-2 ring-[#c9a84c]/30 mb-3"
            />
            <h1 className="text-2xl font-bold">{t("admin.login.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("admin.login.subtitle")}</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <Label htmlFor="email">{t("admin.login.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="password">{t("admin.login.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1"
                dir="ltr"
              />
            </div>
            <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 dark:bg-[#c9a84c] dark:hover:bg-[#c9a84c]/90 dark:text-[#0a0f1e]">
              <Lock className="h-4 w-4 me-2" />
              {t("admin.login.signIn")}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-muted-foreground hover:text-[#c9a84c]">
              ← {locale === "ar" ? "العودة للموقع" : "Back to website"}
            </a>
          </div>
        </Card>
      </div>
    )
  }

        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                view === item.value
                  ? "bg-[#c9a84c] text-[#0a0f1e] font-semibold"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-2">
          <a href="/" target="_blank" className="block text-xs text-white/60 hover:text-white px-3 py-2">
            {locale === "ar" ? "↗ فتح الموقع" : "↗ Open website"}
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t("admin.login.logout")}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {view === "overview" && <AdminOverview onNavigate={setView} />}
        {view === "properties" && <AdminProperties />}
        {view === "inquiries" && <AdminInquiries />}
        {view === "viewings" && <AdminViewings />}
        {view === "news" && <AdminNews />}
      </main>
    </div>
  )
}
