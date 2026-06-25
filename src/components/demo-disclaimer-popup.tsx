"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, Clock, AlertTriangle } from "lucide-react"

// Purge deadline: June 28, 2026 at 6:00 AM UAE Time (48 hours from June 26, 6 AM)
const PURGE_DEADLINE = new Date("2026-06-28T06:00:00+04:00").getTime()

export function DemoDisclaimerPopup() {
  const [open, setOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Show popup on first visit (check localStorage)
  useEffect(() => {
    const agreed = localStorage.getItem("demo-disclaimer-agreed")
    if (!agreed) {
      setOpen(true)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now()
      const diff = PURGE_DEADLINE - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAgree = () => {
    localStorage.setItem("demo-disclaimer-agreed", "true")
    setOpen(false)
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg p-0 overflow-hidden" >
        {/* Header with Phronesis branding */}
        <div className="bg-[#0a0f1e] text-white p-6 text-center">
          <img
            src="/phronesis-logo.png"
            alt="Phronesis Studio"
            className="h-14 w-14 mx-auto mb-3 object-contain"
          />
          <h2 className="text-lg font-bold tracking-wide">Studio of Phronesis</h2>
          <p className="text-xs text-white/60 mt-1 italic">
            مشروع توضيحي · Demonstration Project
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Arabic notice */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" dir="rtl">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80 leading-relaxed">
              هذا الموقع لأغراض العرض التوضيحي فقط. يُرجى عدم إدخال أي بيانات شخصية. وهو مشروع تجريبي يُبرز مدى دقة العمل وجودته، وسيتم مسح جميع البيانات خلال ٤٨ ساعة من تاريخ ٢٦ يونيو ٢٠٢٦ الساعة ٦:٠٠ صباحًا بتوقيت الإمارات.
            </div>
          </div>

          {/* English notice */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800" dir="ltr">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80 leading-relaxed">
              This website is for demonstration purposes only. Please do not enter any personal information. It is a test project showcasing the precision and accuracy of our work, and all data will be purged within 48 hours from June 26, 2026 at 6:00 AM UAE Time.
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-[#c9a84c]" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                الوقت المتبقي حتى المسح · Time Until Purge
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e3a8a] dark:text-[#c9a84c]">{pad(timeLeft.days)}</div>
                <div className="text-[10px] text-muted-foreground uppercase">يوم · Days</div>
              </div>
              <span className="text-2xl font-bold text-muted-foreground/30">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e3a8a] dark:text-[#c9a84c]">{pad(timeLeft.hours)}</div>
                <div className="text-[10px] text-muted-foreground uppercase">ساعة · Hrs</div>
              </div>
              <span className="text-2xl font-bold text-muted-foreground/30">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e3a8a] dark:text-[#c9a84c]">{pad(timeLeft.minutes)}</div>
                <div className="text-[10px] text-muted-foreground uppercase">دقيقة · Min</div>
              </div>
              <span className="text-2xl font-bold text-muted-foreground/30">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e3a8a] dark:text-[#c9a84c]">{pad(timeLeft.seconds)}</div>
                <div className="text-[10px] text-muted-foreground uppercase">ثانية · Sec</div>
              </div>
            </div>
          </div>

          {/* Crafted by */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-[#c9a84c]" />
            <span>صُنع بإتقان بواسطة استوديو فرونيسس · Crafted with precision by Studio of Phronesis</span>
          </div>

          {/* Agree buttons — both languages */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleAgree}
              className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 dark:bg-[#c9a84c] dark:hover:bg-[#c9a84c]/90 dark:text-[#0a0f1e] font-semibold py-3"
              dir="rtl"
            >
              أنا أوافق
            </Button>
            <Button
              onClick={handleAgree}
              className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 dark:bg-[#c9a84c] dark:hover:bg-[#c9a84c]/90 dark:text-[#0a0f1e] font-semibold py-3"
              dir="ltr"
            >
              I Agree
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
