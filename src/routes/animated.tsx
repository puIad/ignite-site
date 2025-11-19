import '../App.css'

import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/sections/hero'
import { WhatIsIgniteSection } from '@/components/sections/what-is-ignite'
import { PreviousEditionsSection } from '@/components/sections/previous-editions'
import { FooterSection } from '@/components/sections/footer'
import { SpeakersRegistration } from '@/components/sections/speakers-registration'

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'motion/react';

export const Route = createFileRoute('/animated')({
  component: RouteComponent,
})

function RouteComponent() {

  const containerRef = useRef(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section transforms
  const section1Y = useTransform(scrollYProgress, [0, 0.33], [0, -100]);
  const section1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 0.5, 0]);
  const section1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.95]);

  const section2Y = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [100, 0, -100]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [0, 1, 1, 0]);
  const section2Scale = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [0.95, 1, 1, 0.95]);
  const section2Rotate = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [2, 0, 0, -2]);

  const section3Y = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 0.5, 1]);
  const section3Scale = useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1]);

  const section4Y = useTransform(scrollYProgress, [0.55, 0.65, 0.8], [100, 0, -100]);
  const section4Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const section4Scale = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0.95, 1, 1, 0.95]);
  const section4Rotate = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [-2, 0, 0, 2]);

  // Section 5 transforms
  const section5Y = useTransform(scrollYProgress, [0.75, 0.9], [100, 0]);
  const section5Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.9], [0, 0.5, 1]);
  const section5Scale = useTransform(scrollYProgress, [0.75, 0.9], [0.9, 1]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (isSnapping) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const section2Height = windowHeight * 1.4;

      // Calculate section positions
      const section1End = windowHeight;
      const section2End = section1End + section2Height;
      const section3End = section2End + windowHeight;
      const section4End = section3End + windowHeight;

      // Section 2 snap
      if (scrollTop > windowHeight * 0.1 && scrollTop < section1End && currentSection !== 1) {
        setIsSnapping(true);
        setCurrentSection(1);
        window.scrollTo({ top: section1End, behavior: 'smooth' });
        timeoutId = setTimeout(() => setIsSnapping(false), 800);
      }
      // Section 3 snap
      else if (scrollTop > section1End + section2Height * 0.1 && scrollTop < section2End && currentSection !== 2) {
        setIsSnapping(true);
        setCurrentSection(2);
        window.scrollTo({ top: section2End, behavior: 'smooth' });
        timeoutId = setTimeout(() => setIsSnapping(false), 800);
      }
      // Section 4 snap
      else if (scrollTop > section2End + windowHeight * 0.1 && scrollTop < section3End && currentSection !== 3) {
        setIsSnapping(true);
        setCurrentSection(3);
        window.scrollTo({ top: section3End, behavior: 'smooth' });
        timeoutId = setTimeout(() => setIsSnapping(false), 800);
      }
      // Section 5 snap
      else if (scrollTop > section3End + windowHeight * 0.1 && scrollTop < section4End && currentSection !== 4) {
        setIsSnapping(true);
        setCurrentSection(4);
        window.scrollTo({ top: section4End, behavior: 'smooth' });
        timeoutId = setTimeout(() => setIsSnapping(false), 800);
      }
      // Back tracking
      else if (scrollTop < section1End * 0.9 && currentSection !== 0) {
        setCurrentSection(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSnapping, currentSection]);
  return (
    <div ref={containerRef} className="relative">
      {/* Section 1 */}
      <motion.section
        style={{
          y: section1Y,
          opacity: section1Opacity,
          scale: section1Scale,
        }}
        className="h-screen bg-primary from-purple-600 to-blue-600 flex items-center justify-center sticky top-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <HeroSection />
        </motion.div>
      </motion.section>

      {/* Section 2 - 1.4x screen height */}
      <motion.section
        style={{
          y: section2Y,
          opacity: section2Opacity,
          scale: section2Scale,
          rotateX: section2Rotate,
        }}
        className="bg-white flex items-center justify-center sticky top-0"
      >
        <WhatIsIgniteSection />
      </motion.section>

      {/* Section 3 */}
      <motion.section
        style={{
          y: section3Y,
          opacity: section3Opacity,
          scale: section3Scale,
        }}
        className="h-screen bg-primary flex items-center justify-center sticky top-0"
      >
        <PreviousEditionsSection />
      </motion.section>
      <motion.section
        style={{
          y: section4Y,
          opacity: section4Opacity,
          scale: section4Scale,
          rotateX: section4Rotate,
        }}
        className="h-screen bg-primary flex items-center justify-center sticky top-0"
      >
        <SpeakersRegistration />
      </motion.section>

      {/* Section 5 */}
      <motion.section
        style={{
          y: section5Y,
          opacity: section5Opacity,
          scale: section5Scale,
        }}
        className="h-screen bg-white flex items-center justify-center sticky top-0"
      >
        <FooterSection />
      </motion.section>
    </div>
  )
}
{/* <HeroSection /> */ }
{/* <WhatIsIgniteSection /> */ }
{/* <PreviousEditionsSection /> */ }
{/* <SpeakersRegistration /> */ }
{/* <FooterSection /> */ }
