"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-6xl mx-auto pb-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-16 md:pt-28 md:gap-10 min-h-[85vh] md:min-h-screen"
          >
            {/* Left: sticky label */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gray-950 flex items-center justify-center border border-gray-800">
                <div
                  className="h-4 w-4 rounded-full border-2 border-gray-700"
                  style={{ backgroundColor: item.subtitle ? '#f59e0b' : '#374151' }}
                />
              </div>
              {/* Label on md+ */}
              <div className="hidden md:flex flex-col pl-20 gap-2">
                {item.subtitle && (
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
                    {item.subtitle}
                  </span>
                )}
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-400 leading-relaxed mt-1 max-w-xs">
                    {item.description}
                  </p>
                )}
                {item.cta && (
                  <div className="mt-3">{item.cta}</div>
                )}
              </div>
            </div>

            {/* Right: content */}
            <div className="relative pl-20 pr-2 md:pl-6 w-full">
              {/* Title on mobile only */}
              <div className="md:hidden mb-6">
                {item.subtitle && (
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-1">
                    {item.subtitle}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-white mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{item.description}</p>
                )}
                {item.cta && <div className="mb-4">{item.cta}</div>}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-amber-500 via-amber-400 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
