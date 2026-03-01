"use client";

import { useState } from "react";
import {
  getCropFactor,
  getEquivalentFocalLength,
  getEquivalentAperture,
  getFieldOfView,
  SensorDimensions,
} from "@/lib/optics";
import InfoTooltip from "@/components/InfoTooltip";

const SENSOR_PRESETS: Record<string, SensorDimensions> = {
  "Full Frame (36×24)": { width: 36, height: 24 },
  "APS-C (Sony/Nikon 1.5x)": { width: 23.6, height: 15.7 },
  "APS-C (Canon 1.6x)": { width: 22.3, height: 14.9 },
  "Micro Four Thirds (2x)": { width: 17.3, height: 13 },
  "1-inch (~2.7x)": { width: 13.2, height: 8.8 },

  // iPhone 17 Pro (same sensor classes)
  'iPhone 16/17 Pro — Wide (1/1.28")': { width: 9.8, height: 7.3 },
  'iPhone 16/17 Pro — Ultrawide (1/2.55")': { width: 5.76, height: 4.29 },
  'iPhone 16/17 Pro — Telephoto (1/3.06")': { width: 4.6, height: 3.45 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function LensCalculator() {
  const [fullFrameFocal, setFullFrameFocal] = useState(50);
  const [fullFrameAperture, setFullFrameAperture] = useState(1.4);
  const [preset, setPreset] = useState("APS-C (Sony/Nikon 1.5x)");
  const [customSensor, setCustomSensor] = useState<SensorDimensions>(
    SENSOR_PRESETS[preset],
  );

  const sensor = customSensor;

  const cropFactor = getCropFactor(sensor);
  const equivalentFocal = getEquivalentFocalLength(fullFrameFocal, sensor);
  const equivalentAperture = getEquivalentAperture(fullFrameAperture, sensor);

  const horizontalFoV = getFieldOfView(equivalentFocal, sensor.width);
  const verticalFoV = getFieldOfView(equivalentFocal, sensor.height);

  function handlePresetChange(value: string) {
    setPreset(value);
    setCustomSensor(SENSOR_PRESETS[value]);
  }

  return (
    <main className="bg-neutral-950 text-neutral-100 flex items-center justify-center px-6">
      <div className="w-full max-w-lg space-y-10">
        {/* Form */}
        <div className="space-y-8">
          {/* Focal Length */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-400 flex items-center">
              Full Frame Focal Length (mm)
              <InfoTooltip>
                Enter the focal length as if using a 35mm full-frame camera.
                Example: 50mm for standard view, 85mm for portrait.
              </InfoTooltip>
            </label>
            <input
              type="number"
              value={fullFrameFocal}
              onChange={(e) =>
                setFullFrameFocal(clamp(Number(e.target.value), 1, 2000))
              }
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

          {/* Aperture */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-400 flex items-center">
              Full Frame Aperture (f-number)
              <InfoTooltip>
                The f-number on a full-frame camera. Used to compute
                depth-of-field equivalence only. Exposure does not change.
              </InfoTooltip>
            </label>
            <input
              type="number"
              step="0.1"
              value={fullFrameAperture}
              onChange={(e) =>
                setFullFrameAperture(clamp(Number(e.target.value), 0.7, 64))
              }
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>

          {/* Preset */}
          <div className="relative">
            <select
              value={preset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full appearance-none bg-neutral-900 border border-neutral-800 
               rounded-lg px-4 py-3 pr-10
               focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            >
              {Object.keys(SENSOR_PRESETS).map((key) => (
                <option key={key}>{key}</option>
              ))}
            </select>

            {/* Custom arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
          </div>

          {/* Custom Sensor */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-400 flex items-center">
              Custom Sensor Dimensions (mm)
              <InfoTooltip>
                Override preset values. Enter physical sensor width and height
                in millimeters.
              </InfoTooltip>
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={sensor.width}
                onChange={(e) =>
                  setCustomSensor({
                    ...sensor,
                    width: clamp(Number(e.target.value), 1, 100),
                  })
                }
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
              />
              <input
                type="number"
                value={sensor.height}
                onChange={(e) =>
                  setCustomSensor({
                    ...sensor,
                    height: clamp(Number(e.target.value), 1, 100),
                  })
                }
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Crop Factor</span>
            <span>{cropFactor.toFixed(2)}×</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Equivalent Focal Length</span>
            <span>{equivalentFocal.toFixed(2)} mm</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Equivalent Aperture (DoF)</span>
            <span>f/{equivalentAperture.toFixed(2)}</span>
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
            <div className="flex justify-between">
              <span>Horizontal FoV</span>
              <span>{horizontalFoV.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between">
              <span>Vertical FoV</span>
              <span>{verticalFoV.toFixed(2)}°</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
