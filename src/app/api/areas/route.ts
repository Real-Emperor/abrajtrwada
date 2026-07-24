import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { AL_AIN_AREAS } from "@/lib/site-config"

export const dynamic = "force-dynamic"

// GET /api/areas — returns all VISIBLE areas (built-in + custom, excluding hidden)
// Used by the public website to display the area list
export async function GET() {
  try {
    // Fetch all area covers (built-in)
    const covers = await db.areaCover.findMany()
    const coverMap = new Map(covers.map(c => [c.areaValue, c]))

    // Fetch all visible custom areas
    const customs = await db.areaCustom.findMany({
      where: { hidden: false },
      orderBy: { sortOrder: "asc" },
    })

    // Build visible built-in areas (exclude those marked hidden)
    const visibleBuiltIn = AL_AIN_AREAS
      .filter(a => {
        const cover = coverMap.get(a.value)
        return !cover?.hidden
      })
      .map(a => ({
        value: a.value,
        labelEn: a.labelEn,
        labelAr: a.labelAr,
        coverImage: coverMap.get(a.value)?.coverImage || null,
        lat: a.lat,
        lng: a.lng,
        isCustom: false,
      }))

    // Build visible custom areas
    const visibleCustom = customs.map(a => ({
      value: a.areaValue,
      labelEn: a.labelEn,
      labelAr: a.labelAr,
      coverImage: a.coverImage,
      lat: a.lat,
      lng: a.lng,
      isCustom: true,
    }))

    return NextResponse.json({ areas: [...visibleBuiltIn, ...visibleCustom] })
  } catch (error) {
    console.error("GET /api/areas error:", error)
    // Fallback to built-in areas if DB fails
    return NextResponse.json({
      areas: AL_AIN_AREAS.map(a => ({
        value: a.value,
        labelEn: a.labelEn,
        labelAr: a.labelAr,
        coverImage: null,
        lat: a.lat,
        lng: a.lng,
        isCustom: false,
      })),
    })
  }
}
