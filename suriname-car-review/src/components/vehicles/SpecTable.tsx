'use client'

import type { Vehicle } from '@/types/vehicle'
import { SpecRow, SpecGroupHeader } from './SpecRow'
import { getGroundClearanceStatus } from '@/lib/utils'

type Highlight = 'good' | 'warn' | 'bad' | null

function gcH(mm: number | null): Highlight {
  const s = getGroundClearanceStatus(mm)
  return s === 'good' ? 'good' : s === 'fair' ? 'warn' : 'bad'
}

function riskH(risk: string): Highlight {
  if (risk === 'Low') return 'good'
  if (risk === 'Medium') return 'warn'
  return 'bad'
}

function LeftCol({ v }: { v: Vehicle }) {
  return (
    <div>
      <SpecGroupHeader title="Identity" />
      <SpecRow label="Make" value={v.make} />
      <SpecRow label="Model" value={v.model} />
      <SpecRow label="Local Name" value={v.localName} />
      <SpecRow label="Chassis Code" value={v.chassisCode} />
      <SpecRow label="Generation" value={v.generation} />
      <SpecRow label="Years" value={v.yearFrom ? `${v.yearFrom}–${v.yearTo ?? 'present'}` : null} />
      <SpecRow label="Body Type" value={v.bodyType} />
      <SpecRow label="Doors" value={v.doors} />
      <SpecRow label="Seats" value={v.seats} />
      <SpecRow label="Origin" value={v.origin} />
      <SpecRow label="JDM Import" value={v.jdmImport ? 'Yes' : 'No'} highlight={v.jdmImport ? 'good' : null} />
      <SpecGroupHeader title="Engine & Performance" />
      <SpecRow label="Engine Code" value={v.engineCode} />
      <SpecRow label="Displacement" value={v.displacement} unit="cc" />
      <SpecRow label="Config" value={v.engineConfig} />
      <SpecRow label="Fuel Type" value={v.fuelType} />
      <SpecRow label="Aspiration" value={v.aspiration} />
      <SpecRow label="Horsepower" value={v.horsepower} unit="hp" />
      <SpecRow label="Power" value={v.powerKw} unit="kW" />
      <SpecRow label="Torque" value={v.torqueNm} unit="Nm" />
      <SpecRow label="Compression" value={v.compression} />
      <SpecRow label="Transmission" value={v.transmission} />
      <SpecRow label="Gears" value={v.gears} />
      <SpecRow label="Drivetrain" value={v.drivetrain} />
      <SpecGroupHeader title="Economy & Emissions" />
      <SpecRow label="Top Speed" value={v.topSpeedKmh} unit="km/h" />
      <SpecRow label="0–100 km/h" value={v.zeroTo100s} unit="s" />
      <SpecRow label="Fuel (City)" value={v.fuelCityL100} unit="L/100km" />
      <SpecRow label="Fuel (Hwy)" value={v.fuelHwyL100} unit="L/100km" />
      <SpecRow label="CO₂" value={v.co2GKm} unit="g/km" />
    </div>
  )
}

function RightCol({ v }: { v: Vehicle }) {
  return (
    <div>
      <SpecGroupHeader title="Dimensions & Clearance" />
      <SpecRow label="Length" value={v.lengthMm} unit="mm" />
      <SpecRow label="Width" value={v.widthMm} unit="mm" />
      <SpecRow label="Height" value={v.heightMm} unit="mm" />
      <SpecRow label="Wheelbase" value={v.wheelbaseMm} unit="mm" />
      <SpecRow label="Ground Clearance" value={v.groundClearMm} unit="mm" highlight={gcH(v.groundClearMm)} />
      <SpecRow label="Curb Weight" value={v.curbWeightKg} unit="kg" />
      <SpecRow label="Fuel Tank" value={v.fuelTankL} unit="L" />
      <SpecGroupHeader title="Off-Road & Flood Capability" />
      <SpecRow label="Wading Depth" value={v.wadingDepthMm} unit="mm" highlight={v.wadingDepthMm && v.wadingDepthMm > 400 ? 'good' : v.wadingDepthMm ? 'warn' : 'bad'} />
      <SpecRow label="Tow Capacity" value={v.towCapKg} unit="kg" />
      <SpecRow label="Payload" value={v.payloadKg} unit="kg" />
      <SpecRow label="Cargo Volume" value={v.cargoVolL} unit="L" />
      <SpecRow label="Underbody" value={v.underbody} />
      <SpecRow label="AWD System" value={v.awdSystem} />
      <SpecGroupHeader title="Chassis & Tyres" />
      <SpecRow label="Susp. Front" value={v.suspFront} />
      <SpecRow label="Susp. Rear" value={v.suspRear} />
      <SpecRow label="Brakes Front" value={v.brakesFront} />
      <SpecRow label="Brakes Rear" value={v.brakesRear} />
      <SpecRow label="OEM Tyre Size" value={v.oemTyreSize} />
      <SpecRow label="Rim" value={v.rimInch} unit={`"`} />
      <SpecRow label="Tyre Profile" value={v.tyreProfile} />
      <SpecGroupHeader title="Safety" />
      <SpecRow label="Airbags" value={v.airbags} />
      <SpecRow label="ABS" value={v.abs ? 'Standard' : 'No'} highlight={v.abs ? 'good' : 'warn'} />
      <SpecRow label="ESC / VSC" value={v.escVsc ? 'Standard' : 'No'} highlight={v.escVsc ? 'good' : 'warn'} />
      <SpecRow label="A/C" value={v.ac ? 'Standard' : 'No'} />
      <SpecGroupHeader title="Parts & Importers" />
      <SpecRow label="Parts Risk" value={v.partsRisk} highlight={riskH(v.partsRisk)} />
      <SpecRow label="Main Importer" value={v.mainImporter} />
      <SpecRow label="Stock Depth" value={v.stockDepth !== null ? `${v.stockDepth}/5` : null} />
    </div>
  )
}

export function SpecTable({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
      <LeftCol v={v} />
      <RightCol v={v} />
    </div>
  )
}
