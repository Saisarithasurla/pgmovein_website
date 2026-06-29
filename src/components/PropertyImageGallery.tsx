"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

export default function PropertyImageGallery({
  images,
  propertyName,
  badges,
}: {
  images: string[];
  propertyName: string;
  badges?: React.ReactNode;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-[1.5fr_0.75fr]">
        <button
          type="button"
          onClick={() => setActiveImage(images[0])}
          className="relative min-h-[220px] overflow-hidden rounded-md bg-white text-left sm:min-h-[320px]"
          aria-label={`Open full image for ${propertyName}`}
        >
          <Image src={images[0]} alt={`${propertyName} main property photo`} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover transition-transform duration-300 hover:scale-105" priority />
          {badges}
        </button>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
          {images.slice(1).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className="relative min-h-[112px] overflow-hidden rounded-md bg-white text-left sm:min-h-[152px]"
              aria-label={`Open gallery image ${index + 2} for ${propertyName}`}
            >
              <Image src={image} alt={`${propertyName} gallery photo ${index + 2}`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-300 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/90 p-3 sm:p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-navy shadow-lg transition-all duration-200 hover:bg-saffron hover:text-white sm:right-4 sm:top-4 sm:h-11 sm:w-11"
            aria-label="Close full image"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-md bg-black sm:h-[82vh]">
            <Image src={activeImage} alt={`${propertyName} full size property photo`} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
