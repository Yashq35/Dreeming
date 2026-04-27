export type VehicleCategory = 'city' | 'workhorse' | 'luxury'
export type PartsRisk = 'Low' | 'Medium' | 'High' | 'Critical'
export type RecommendedStatus = 'Yes' | 'No' | 'Conditional'
export type SDRBand = 'great' | 'good' | 'fair' | 'poor' | 'critical'

export interface Vehicle {
  slug: string
  category: VehicleCategory
  make: string
  model: string
  localName: string
  chassisCode: string
  generation: string
  yearFrom: number | null
  yearTo: number | null
  bodyType: string
  doors: string
  seats: number | null
  origin: string
  jdmImport: boolean

  engineCode: string
  displacement: number | null
  engineConfig: string
  fuelType: string
  aspiration: string
  horsepower: number | null
  powerKw: number | null
  torqueNm: number | null
  compression: string
  transmission: string
  gears: string
  drivetrain: string

  lengthMm: number | null
  widthMm: number | null
  heightMm: number | null
  wheelbaseMm: number | null
  groundClearMm: number | null
  curbWeightKg: number | null
  fuelTankL: number | null
  wadingDepthMm: number | null
  towCapKg: number | null
  payloadKg: number | null
  cargoVolL: number | null

  topSpeedKmh: number | null
  zeroTo100s: number | null
  fuelCityL100: number | null
  fuelHwyL100: number | null
  co2GKm: number | null

  suspFront: string
  suspRear: string
  brakesFront: string
  brakesRear: string
  oemTyreSize: string
  rimInch: number | null
  tyreProfile: string
  underbody: string

  ac: boolean
  airbags: number | null
  abs: boolean
  escVsc: boolean
  awdSystem: string

  sdrScore: number
  partsRisk: string
  partsDroughtNote: string
  mainImporter: string
  stockDepth: number | null

  surinameVerdict: string
  bestFor: string
  recommended: string
  buyerNotes: string

  wikipediaArticle: string
  wikipediaUrl: string
  imageSearchQuery: string
  imageUrl: string
}

export interface YearEntry {
  make: string
  model: string
  year: number | null
  generation: string
  chassisCode: string
  facelifStatus: string
  localName: string
  bodyType: string
  doors: string
  seats: string
  jdmTrims: string
  origin: string
  jdmImportCommon: boolean
  engineCode: string
  displacement: string
  engineConfig: string
  fuelType: string
  aspiration: string
  horsepower: string
  torque: string
  transmission: string
  drivetrain: string
  lengthMm: number | null
  widthMm: number | null
  heightMm: number | null
  wheelbaseMm: number | null
  groundClearMm: number | null
  curbWeight: string
  fuelTankL: number | null
  cargoVolL: number | null
  topSpeedKmh: string
  zeroTo100s: string
  fuelCityL100: number | null
  fuelHwyL100: number | null
  suspFront: string
  suspRear: string
  brakesFront: string
  brakesRear: string
  oemTyreSize: string
  rimInch: string
  airbags: string
  abs: string
  escVsc: string
  ac: string
  keyFeatures: string
  sdrScore: number | null
  partsRisk: string
  partsNote: string
  stockDepth: number | null
  commonIssues: string
  surinameVerdict: string
  bestFor: string
  usedPriceUsd: string
  typicalOdometerKm: string
  whatChangedThisYear: string
  recallNotes: string
  wikipediaArticle: string
  wikipediaUrl: string
  imageSearchQuery: string
}

export interface FilterState {
  makes: string[]
  categories: VehicleCategory[]
  sdrMin: number
  sdrMax: number
  partsRisk: string[]
  jdmOnly: boolean
  recommendedOnly: boolean
  bodyTypes: string[]
  search: string
}

export type SortKey = 'sdrScore' | 'make' | 'groundClearMm' | 'horsepower' | 'yearFrom'
export type SortDir = 'asc' | 'desc'
