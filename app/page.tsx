import Script from "next/script";
import LensCalculator from "@/components/LensCalculator";

const SITE_URL = "https://lensequi.gabrielbg.dev";

export default function Home() {
  return (
    <>
      {/* Structured Data for Google */}
      <Script
        id="lens-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Lens Equivalence Calculator",
            url: SITE_URL,
            applicationCategory: "PhotographyApplication",
            operatingSystem: "All",
            description:
              "Online calculator to convert full-frame focal length and aperture to equivalent values for APS-C, Micro Four Thirds, and smartphone sensors.",
          }),
        }}
      />

      <main className="min-h-screen px-6 py-12">
        {/* Primary SEO Heading */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Lens Equivalence Calculator
          </h1>
          <p className="mt-4 text-neutral-400 text-sm md:text-base">
            Convert focal length and aperture between full-frame, APS-C, Micro
            Four Thirds, and smartphone sensors.
          </p>
        </header>

        {/* Calculator Tool */}
        <section className="max-w-2xl mx-auto">
          <LensCalculator />
        </section>

        {/* SEO Content Section (This is what ranks) */}
        <section className="max-w-3xl mx-auto mt-24 space-y-8 text-sm md:text-base text-neutral-400">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-100">
            What Is Lens Equivalence?
          </h2>

          <p>
            Lens equivalence allows photographers to compare focal length and
            depth of field across different sensor formats. A 50mm lens on
            full-frame does not produce the same field of view on APS-C, Micro
            Four Thirds, or smartphone sensors due to crop factor.
          </p>

          <p>
            This calculator converts full-frame focal length and aperture into
            equivalent values for smaller sensors, preserving field of view and
            depth-of-field equivalence.
          </p>

          <h3 className="text-lg font-semibold text-neutral-100">
            Crop Factor Formula
          </h3>

          <p>
            Crop factor is calculated by dividing the full-frame diagonal
            (43.27mm) by the diagonal of the target sensor. Equivalent focal
            length equals full-frame focal length divided by crop factor.
          </p>

          <h3 className="text-lg font-semibold text-neutral-100">
            Aperture Equivalence
          </h3>

          <p>
            Aperture equivalence adjusts f-number based on crop factor to
            maintain similar depth of field characteristics. While exposure
            remains unchanged, depth of field scales with sensor size.
          </p>

          <h3 className="text-lg font-semibold text-neutral-100">
            Why 35mm Equivalent Matters
          </h3>

          <p>
            35mm equivalent focal length provides a standardized reference point
            across cameras, allowing consistent lens comparisons between
            professional mirrorless systems and smartphone cameras.
          </p>
        </section>
      </main>
    </>
  );
}
