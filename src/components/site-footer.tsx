"use client"

import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG, getTelLink, getWhatsAppLink, AL_AIN_AREAS, PROPERTY_CATEGORIES } from "@/lib/site-config"

// TikTok SVG icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
    </svg>
  )
}

export function SiteFooter() {
  const { t, locale } = useI18n()
  const year = new Date().getFullYear()

  const socials = [
    { icon: Facebook, url: SITE_CONFIG.social.facebook, label: "Facebook" },
    { icon: Instagram, url: SITE_CONFIG.social.instagram, label: "Instagram" },
    { icon: TikTokIcon, url: SITE_CONFIG.social.tiktok, label: "TikTok" },
  ].filter(s => s.url) // Only show socials that have URLs

  return (
    <footer className="bg-[#0a0f1e] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={SITE_CONFIG.logoPath}
                alt="Abraj Trwada Real Estate Logo"
                className="h-12 w-12 rounded-lg object-cover ring-2 ring-[#c9a84c]/30"
              />
              <div>
                <div className="text-base font-bold">
                  {locale === "ar" ? SITE_CONFIG.brandName.ar : SITE_CONFIG.brandName.en}
                </div>
                <div className="text-[11px] text-white/60">{t("common.brandTagline")}</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {locale === "ar"
                ? "شركتك العقارية الموثوقة في العين. نقدم خدمات الإدارة والإيجار والوساطة والاستثمار العقاري."
                : "Your trusted real estate partner in Al Ain. We offer lease & management, brokerage, and investment services."}
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-colors"
                  aria-label={`${s.label} — Abraj Trwada`}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4">{t("common.footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#home" className="hover:text-[#c9a84c] transition-colors">{t("common.nav.home")}</a></li>
              <li><a href="#search" className="hover:text-[#c9a84c] transition-colors">{t("common.nav.search")}</a></li>
              <li><a href="#about" className="hover:text-[#c9a84c] transition-colors">{t("common.nav.about")}</a></li>
              <li><a href="#news" className="hover:text-[#c9a84c] transition-colors">{t("common.nav.news")}</a></li>
              <li><a href="#contact" className="hover:text-[#c9a84c] transition-colors">{t("common.nav.contact")}</a></li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4">{t("common.footer.areas")}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {AL_AIN_AREAS.slice(0, 6).map(area => (
                <li key={area.value}>
                  <a href={`#areas`} className="hover:text-[#c9a84c] transition-colors">
                    {locale === "ar" ? area.labelAr : area.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4">{t("common.footer.contactUs")}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span>{locale === "ar" ? SITE_CONFIG.address.ar : SITE_CONFIG.address.en}</span>
              </li>
              <li>
                <a href={getTelLink()} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors">
                  <Phone className="h-4 w-4 text-[#c9a84c] flex-shrink-0" />
                  <span dir="ltr">{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone2}`} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors">
                  <Phone className="h-4 w-4 text-[#c9a84c] flex-shrink-0" />
                  <span dir="ltr">{SITE_CONFIG.phone2Display}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone3}`} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors">
                  <Phone className="h-4 w-4 text-[#c9a84c] flex-shrink-0" />
                  <span dir="ltr">{SITE_CONFIG.phone3Display}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors break-all">
                  <Mail className="h-4 w-4 text-[#c9a84c] flex-shrink-0" />
                  <span className="text-xs">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span className="text-xs">{locale === "ar" ? SITE_CONFIG.workingHours.ar : SITE_CONFIG.workingHours.en}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 text-center md:text-start">
            © {year} {locale === "ar" ? SITE_CONFIG.brandName.ar : SITE_CONFIG.brandName.en}. {t("common.footer.rightsReserved")}.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <a
              href={SITE_CONFIG.phronesisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/60 hover:text-[#c9a84c] transition-colors group"
              title="Phronesis Studio — Studio of Practical Wisdom"
            >
              <img
                src={SITE_CONFIG.phronesisLogoPath}
                alt="Phronesis Studio"
                className="h-6 w-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span>
                {locale === "ar"
                  ? "تم تصميم وتطوير هذا الموقع بواسطة Phronesis Studio"
                  : "Website crafted by Phronesis Studio"}
              </span>
            </a>
            <div className="flex gap-4 text-xs text-white/60">
              <a href="#" className="hover:text-[#c9a84c] transition-colors">{t("common.footer.privacyPolicy")}</a>
              <a href="#" className="hover:text-[#c9a84c] transition-colors">{t("common.footer.termsOfService")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
