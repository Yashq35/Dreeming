import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

const XLSX_PATH = path.resolve(process.cwd(), 'Suriname_Automotive_Database_2026_ENRICHED_v3.xlsx')
const OUT_DIR = path.resolve(process.cwd(), 'data')

// Column indices for "All Vehicles" sheet (66 columns, 0-indexed)
const COL = {
  MAKE: 0, MODEL: 1, LOCAL_NAME: 2, CHASSIS: 3, GENERATION: 4,
  YEAR_FROM: 5, YEAR_TO: 6, BODY_TYPE: 7, DOORS: 8, SEATS: 9,
  ORIGIN: 10, JDM_IMPORT: 11,
  ENGINE_CODE: 12, DISPLACEMENT: 13, ENGINE_CONFIG: 14, FUEL_TYPE: 15,
  ASPIRATION: 16, HORSEPOWER: 17, POWER_KW: 18, TORQUE: 19,
  COMPRESSION: 20, TRANSMISSION: 21, GEARS: 22, DRIVETRAIN: 23,
  LENGTH: 24, WIDTH: 25, HEIGHT: 26, WHEELBASE: 27, GROUND_CLEAR: 28,
  CURB_WEIGHT: 29, FUEL_TANK: 30, WADING_DEPTH: 31,
  TOW_CAP: 32, PAYLOAD: 33, CARGO_VOL: 34,
  TOP_SPEED: 35, ZERO_TO_100: 36, FUEL_CITY: 37, FUEL_HWY: 38, CO2: 39,
  SUSP_FRONT: 40, SUSP_REAR: 41, BRAKES_FRONT: 42, BRAKES_REAR: 43,
  OEM_TYRE: 44, RIM_INCH: 45, TYRE_PROFILE: 46, UNDERBODY: 47,
  AC: 48, AIRBAGS: 49, ABS: 50, ESC: 51, AWD_SYSTEM: 52,
  SDR_SCORE: 53, PARTS_RISK: 54, PARTS_NOTE: 55,
  MAIN_IMPORTER: 56, STOCK_DEPTH: 57,
  SURINAME_VERDICT: 58, BEST_FOR: 59, RECOMMENDED: 60, BUYER_NOTES: 61,
  WIKI_ARTICLE: 62, WIKI_URL: 63, IMAGE_SEARCH: 64, IMAGE_URL: 65,
} as const

function str(val: unknown): string {
  const s = String(val ?? '').trim()
  return s === 'N/A' ? '' : s
}

function num(val: unknown): number | null {
  const s = str(val)
  if (!s || s === '0') return null
  const n = parseFloat(s.replace(/[^0-9.-]/g, ''))
  return isNaN(n) ? null : n
}

function numZeroOk(val: unknown): number | null {
  const s = str(val)
  if (!s) return null
  const n = parseFloat(s.replace(/[^0-9.-]/g, ''))
  return isNaN(n) ? null : n
}

function bool(val: unknown): boolean {
  const s = str(val).toLowerCase()
  return s === 'yes' || s === 'true' || s === '1' || s === 'standard'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '')
}

function buildSlug(make: string, localName: string, generation: string): string {
  let name = localName.trim()
  // Strip leading make name if repeated
  if (name.toLowerCase().startsWith(make.toLowerCase())) {
    name = name.slice(make.length).trim()
  }

  // Extract generation identifier
  let genSuffix = ''
  const ordMatch = generation.match(/(\d+)[a-z]* gen/i)
  const genMatch = generation.match(/gen\s*(\d+)/i)
  const codeMatch = generation.match(/\b([A-Z][A-Z0-9]{2,})\b/)
  if (ordMatch) {
    genSuffix = `gen${ordMatch[1]}`
  } else if (genMatch) {
    genSuffix = `gen${genMatch[1]}`
  } else if (codeMatch) {
    genSuffix = codeMatch[1].toLowerCase()
  }

  const base = slugify(`${make} ${name}`)
  return genSuffix ? `${base}-${genSuffix}` : base
}

function ensureUniqueSlug(slug: string, seen: Set<string>): string {
  if (!seen.has(slug)) {
    seen.add(slug)
    return slug
  }
  let i = 2
  while (seen.has(`${slug}-${i}`)) i++
  const unique = `${slug}-${i}`
  seen.add(unique)
  return unique
}

function extractVehicles(wb: XLSX.WorkBook): object[] {
  const ws = wb.Sheets['All Vehicles']
  if (!ws) throw new Error('Sheet "All Vehicles" not found')

  const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: '' })
  const vehicles: object[] = []
  const slugsSeen = new Set<string>()
  let currentCategory: 'city' | 'workhorse' | 'luxury' = 'city'

  // Skip row 0 (title) and row 1 (headers), start from row 2
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i]
    const make = str(row[COL.MAKE])

    if (!make) continue

    // Section header detection
    if (make.includes('▶') || make.startsWith('▶')) {
      const upper = make.toUpperCase()
      if (upper.includes('CITY')) currentCategory = 'city'
      else if (upper.includes('DISTRICT') || upper.includes('WORKHORSE')) currentCategory = 'workhorse'
      else if (upper.includes('LUXURY')) currentCategory = 'luxury'
      continue
    }

    // Skip if no model (malformed row)
    const model = str(row[COL.MODEL])
    if (!model) continue

    const localName = str(row[COL.LOCAL_NAME]) || model
    const generation = str(row[COL.GENERATION])
    const rawSlug = buildSlug(make, localName, generation)
    const slug = ensureUniqueSlug(rawSlug, slugsSeen)

    const vehicle = {
      slug,
      category: currentCategory,
      make,
      model,
      localName,
      chassisCode: str(row[COL.CHASSIS]),
      generation,
      yearFrom: numZeroOk(row[COL.YEAR_FROM]),
      yearTo: numZeroOk(row[COL.YEAR_TO]),
      bodyType: str(row[COL.BODY_TYPE]),
      doors: str(row[COL.DOORS]),
      seats: numZeroOk(row[COL.SEATS]),
      origin: str(row[COL.ORIGIN]),
      jdmImport: bool(row[COL.JDM_IMPORT]),

      engineCode: str(row[COL.ENGINE_CODE]),
      displacement: num(row[COL.DISPLACEMENT]),
      engineConfig: str(row[COL.ENGINE_CONFIG]),
      fuelType: str(row[COL.FUEL_TYPE]),
      aspiration: str(row[COL.ASPIRATION]),
      horsepower: num(row[COL.HORSEPOWER]),
      powerKw: num(row[COL.POWER_KW]),
      torqueNm: num(row[COL.TORQUE]),
      compression: str(row[COL.COMPRESSION]),
      transmission: str(row[COL.TRANSMISSION]),
      gears: str(row[COL.GEARS]),
      drivetrain: str(row[COL.DRIVETRAIN]),

      lengthMm: num(row[COL.LENGTH]),
      widthMm: num(row[COL.WIDTH]),
      heightMm: num(row[COL.HEIGHT]),
      wheelbaseMm: num(row[COL.WHEELBASE]),
      groundClearMm: num(row[COL.GROUND_CLEAR]),
      curbWeightKg: num(row[COL.CURB_WEIGHT]),
      fuelTankL: num(row[COL.FUEL_TANK]),
      wadingDepthMm: num(row[COL.WADING_DEPTH]),
      towCapKg: num(row[COL.TOW_CAP]),
      payloadKg: num(row[COL.PAYLOAD]),
      cargoVolL: num(row[COL.CARGO_VOL]),

      topSpeedKmh: num(row[COL.TOP_SPEED]),
      zeroTo100s: num(row[COL.ZERO_TO_100]),
      fuelCityL100: num(row[COL.FUEL_CITY]),
      fuelHwyL100: num(row[COL.FUEL_HWY]),
      co2GKm: num(row[COL.CO2]),

      suspFront: str(row[COL.SUSP_FRONT]),
      suspRear: str(row[COL.SUSP_REAR]),
      brakesFront: str(row[COL.BRAKES_FRONT]),
      brakesRear: str(row[COL.BRAKES_REAR]),
      oemTyreSize: str(row[COL.OEM_TYRE]),
      rimInch: num(row[COL.RIM_INCH]),
      tyreProfile: str(row[COL.TYRE_PROFILE]),
      underbody: str(row[COL.UNDERBODY]),

      ac: bool(row[COL.AC]),
      airbags: numZeroOk(row[COL.AIRBAGS]),
      abs: bool(row[COL.ABS]),
      escVsc: bool(row[COL.ESC]),
      awdSystem: str(row[COL.AWD_SYSTEM]),

      sdrScore: numZeroOk(row[COL.SDR_SCORE]) ?? 0,
      partsRisk: str(row[COL.PARTS_RISK]) || 'Medium',
      partsDroughtNote: str(row[COL.PARTS_NOTE]),
      mainImporter: str(row[COL.MAIN_IMPORTER]),
      stockDepth: numZeroOk(row[COL.STOCK_DEPTH]),

      surinameVerdict: str(row[COL.SURINAME_VERDICT]),
      bestFor: str(row[COL.BEST_FOR]),
      recommended: str(row[COL.RECOMMENDED]) || 'No',
      buyerNotes: str(row[COL.BUYER_NOTES]),

      wikipediaArticle: str(row[COL.WIKI_ARTICLE]),
      wikipediaUrl: str(row[COL.WIKI_URL]),
      imageSearchQuery: str(row[COL.IMAGE_SEARCH]),
      imageUrl: str(row[COL.IMAGE_URL]),
    }

    vehicles.push(vehicle)
  }

  return vehicles
}

function extractYearByYear(wb: XLSX.WorkBook): object[] {
  const ws = wb.Sheets['Year-by-Year Deep Dive']
  if (!ws) {
    console.warn('Sheet "Year-by-Year Deep Dive" not found, skipping')
    return []
  }

  const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: '' })
  const entries: object[] = []

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i]
    const make = str(row[0])
    if (!make || make.includes('▶') || make === 'Make') continue

    const model = str(row[1])
    if (!model) continue

    entries.push({
      make,
      model,
      year: numZeroOk(row[2]),
      generation: str(row[3]),
      chassisCode: str(row[4]),
      facelifStatus: str(row[5]),
      localName: str(row[6]),
      bodyType: str(row[7]),
      doors: str(row[8]),
      seats: str(row[9]),
      jdmTrims: str(row[10]),
      origin: str(row[11]),
      jdmImportCommon: bool(row[12]),
      engineCode: str(row[13]),
      displacement: str(row[14]),
      engineConfig: str(row[15]),
      fuelType: str(row[16]),
      aspiration: str(row[17]),
      horsepower: str(row[18]),
      torque: str(row[19]),
      transmission: str(row[20]),
      drivetrain: str(row[21]),
      lengthMm: num(row[22]),
      widthMm: num(row[23]),
      heightMm: num(row[24]),
      wheelbaseMm: num(row[25]),
      groundClearMm: num(row[26]),
      curbWeight: str(row[27]),
      fuelTankL: num(row[28]),
      cargoVolL: num(row[29]),
      topSpeedKmh: str(row[30]),
      zeroTo100s: str(row[31]),
      fuelCityL100: num(row[32]),
      fuelHwyL100: num(row[33]),
      suspFront: str(row[34]),
      suspRear: str(row[35]),
      brakesFront: str(row[36]),
      brakesRear: str(row[37]),
      oemTyreSize: str(row[38]),
      rimInch: str(row[39]),
      airbags: str(row[40]),
      abs: str(row[41]),
      escVsc: str(row[42]),
      ac: str(row[43]),
      keyFeatures: str(row[44]),
      sdrScore: numZeroOk(row[45]),
      partsRisk: str(row[46]),
      partsNote: str(row[47]),
      stockDepth: numZeroOk(row[48]),
      commonIssues: str(row[49]),
      surinameVerdict: str(row[50]),
      bestFor: str(row[51]),
      usedPriceUsd: str(row[52]),
      typicalOdometerKm: str(row[53]),
      whatChangedThisYear: str(row[54]),
      recallNotes: str(row[55]),
      wikipediaArticle: str(row[56]),
      wikipediaUrl: str(row[57]),
      imageSearchQuery: str(row[58] ?? ''),
    })
  }

  return entries
}

async function main() {
  console.log('Reading Excel file...')
  const wb = XLSX.readFile(XLSX_PATH)

  console.log('Sheets found:', wb.SheetNames.join(', '))

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }

  const vehicles = extractVehicles(wb)
  console.log(`Extracted ${vehicles.length} vehicles`)

  const yearByYear = extractYearByYear(wb)
  console.log(`Extracted ${yearByYear.length} year-by-year entries`)

  fs.writeFileSync(
    path.join(OUT_DIR, 'vehicles.json'),
    JSON.stringify(vehicles, null, 2),
    'utf-8'
  )
  fs.writeFileSync(
    path.join(OUT_DIR, 'year-by-year.json'),
    JSON.stringify(yearByYear, null, 2),
    'utf-8'
  )

  console.log('Done! Output written to data/')

  // Print slug summary for verification
  const slugs = (vehicles as Array<{slug: string; make: string; localName: string; sdrScore: number}>).map(v => `  ${v.slug} (${v.make} ${v.localName}, SDR: ${v.sdrScore})`)
  console.log('\nSlugs generated:')
  console.log(slugs.join('\n'))
}

main().catch(console.error)
