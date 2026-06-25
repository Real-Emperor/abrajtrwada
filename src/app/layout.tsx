import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { I18nProvider } from "@/i18n/provider"
import { Toaster } from "@/components/ui/sonner"
import { SITE_CONFIG } from "@/lib/site-config"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.brandName.en} — Real Estate & Investment in Al Ain, UAE`,
    template: `%s | ${SITE_CONFIG.brandName.en}`,
  },
  description:
    "Abraj Trwada Real Estate - L.L.C. offers premium villas, apartments, shops, offices, warehouses, farms, and land for rent and sale in Al Ain, UAE. Real estate lease, management, brokerage, and investment services. Bilingual Arabic-English with WhatsApp instant contact.",
  keywords: [
    "Abraj Trwada",
    "Abraj Trwada Real Estate",
    "أبراج ترادا العقارية",
    "real estate Al Ain",
    "villas for rent Al Ain",
    "apartments for rent Al Ain",
    "property for sale Al Ain",
    "real estate UAE",
    "property management Al Ain",
    "real estate investment UAE",
    "عقارات العين",
    "فلل للإيجار العين",
    "شقق للإيجار العين",
  ],
  authors: [{ name: SITE_CONFIG.brandName.en }],
  openGraph: {
    title: `${SITE_CONFIG.brandName.en} — Real Estate & Investment in Al Ain, UAE`,
    description: "Premium properties for rent and sale in Al Ain, UAE. Lease, management, brokerage, and investment services.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_AE",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_CONFIG.domainUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <I18nProvider>
            {children}
            <Toaster position="top-center" richColors />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
