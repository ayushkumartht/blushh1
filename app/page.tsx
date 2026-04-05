"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { motion } from "framer-motion";
import { Heart, ChatCenteredDots, ShieldCheck, ArrowRight, InstagramLogo } from "phosphor-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

/* ──────────────────────────────────────────────────────────────────────────
   BLUSHHH — CINEMATIC REDESIGN
   Theme: Light, Pure White (#ffffff) & Brand Pink (#b94c6a)
   Integration: 21st Dev style animations & Bento Gallery
   ────────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-rose selection:text-white relative">
      <div className="page-frame" aria-hidden="true" />
      
      {/* ── MINIMALIST NAV ── */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 h-20 flex items-center justify-between ${
          isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-blush-50 h-16" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="blushhh" width={32} height={32} className="hover:rotate-12 transition-transform duration-500" />
          <span className="text-xl font-bold tracking-tighter text-rose">blushhh</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/about" className="text-[10px] uppercase tracking-[0.2em] font-medium text-rose hover:opacity-100 opacity-60 transition-all">Mission</Link>
          <Link href="/stories" className="text-[10px] uppercase tracking-[0.2em] font-medium text-rose hover:opacity-100 opacity-60 transition-all">Journal</Link>
          <Link href="/safety" className="text-[10px] uppercase tracking-[0.2em] font-medium text-rose hover:opacity-100 opacity-60 transition-all">Privacy</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[10px] uppercase tracking-[0.1em] font-medium text-ink/60 hover:text-rose transition-colors">Log In</Link>
          <Link href="/signup">
            <Button variant="rose" className="h-9 px-6 text-[10px] tracking-[0.2em] rounded-full shadow-none border-0">
              JOIN NOW
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* ── CINEMATIC HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <BackgroundBeams className="absolute inset-0 z-0 h-full w-full" />
          
          <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/5 border border-rose/10 text-[10px] font-black tracking-[0.2em] text-rose uppercase mb-4 anim-float"
            >
              <ShieldCheck size={14} weight="fill" /> Verified for KIET Institutions
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-ink"
              >
                Start something <br />
                <motion.span 
                   animate={{ 
                     letterSpacing: ["-0.05em", "0em", "-0.05em"],
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="text-rose italic serif font-light lowercase"
                >
                  extraordinary.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="max-w-xl mx-auto text-lg md:text-2xl font-light text-ink/40 leading-relaxed antialiased"
              >
                The exclusive digital space for the KIET group of institutions. <br />
                Handcrafted for meaningful moments that matter.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
            >
              <Link href="/signup" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="h-16 px-16 text-[10px] tracking-[0.4em] font-black w-full bg-rose text-white border-0 rounded-full hover:bg-deep-rose transition-all shadow-xl shadow-rose/20 uppercase ring-offset-background active:ring-2 ring-rose/50">
                    CREATE ACCOUNT
                  </Button>
                </motion.div>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <motion.div whileHover={{ x: 5 }}>
                  <Button variant="ghost" size="lg" className="h-16 px-12 text-[10px] tracking-[0.4em] font-black text-ink/40 hover:text-rose transition-all uppercase flex items-center gap-3">
                    OUR MISSION <ArrowRight size={16} />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Background Floating Elements */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hover:opacity-40 transition-opacity duration-1000 cursor-default">
             <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-rose to-transparent animate-pulse" />
             <span className="text-[9px] font-black tracking-[0.5em] text-ink uppercase [writing-mode:vertical-lr]">SCROLL TO BLUSH</span>
          </div>
        </section>

        {/* ── BENTO GALLERY — VISUAL STORYTELLING ── */}
        <section className="py-20 bg-white px-6">
           <div className="max-w-7xl mx-auto space-y-20">
              <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="md:col-span-2 md:row-span-2 relative rounded-[3rem] overflow-hidden border border-blush-100 shadow-xl group aspect-[4/5] md:aspect-auto"
                 >
                    <Image src="/hero.png" alt="Library" fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                       <span className="text-[10px] font-black tracking-[0.2em] uppercase">STORY 01</span>
                       <p className="text-xl serif italic font-light">The Library Encounter</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="md:col-span-2 relative rounded-[3rem] overflow-hidden border border-blush-100 shadow-xl group aspect-video md:aspect-auto"
                 >
                    <Image src="/detail.png" alt="Journal" fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                    <div className="absolute inset-0 bg-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                    <div className="absolute top-10 right-10 flex flex-col items-end text-ink opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0 text-right">
                       <span className="text-[10px] font-black tracking-[0.2em] uppercase">THE BLUEPRINT</span>
                       <p className="text-xl serif italic font-light">Handcrafted moments.</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="relative rounded-[3rem] overflow-hidden border border-blush-100 shadow-xl group aspect-square md:aspect-auto"
                 >
                    <Image src="/abstract.png" alt="Silk" fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="relative rounded-[3rem] bg-blush-50 border border-blush-100 shadow-xl flex flex-col items-center justify-center p-12 text-center space-y-6 group overflow-hidden aspect-square md:aspect-auto"
                 >
                    <div className="absolute inset-0 bg-rose opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <Heart size={48} className="text-rose group-hover:text-white transition-colors relative z-10" weight="fill" />
                    <p className="text-sm font-black tracking-widest text-ink/40 uppercase group-hover:text-white/80 transition-colors relative z-10">500+ <br /> Verified KIETians</p>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* ── PHILOSOPHY SECTION — CLEAN WHITE SPACE ── */}
        <section className="py-40 bg-white px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <ScrollReveal className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-rose/40">PROTOCOL 01</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-ink leading-tight">
                Designed for those <br />
                who value <span className="italic serif text-rose font-light">depth.</span>
              </h2>
              <p className="text-xl font-light text-ink/60 leading-loose">
                We reimagined dating as an editorial experience. No chaos, 
                no generic algorithms. A curated grid where your personality 
                takes center stage.
              </p>
              <div className="pt-4 flex items-center gap-4 text-[10px] uppercase font-black tracking-widest text-rose">
                <span className="w-10 h-[1px] bg-rose/20" />
                Built for the KIET group of institutions
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-blush-50 rounded-2xl border border-blush-100 flex items-center justify-center group overflow-hidden">
                <Heart size={48} className="text-rose/20 group-hover:scale-110 group-hover:text-rose transition-all duration-700" />
              </div>
              <div className="aspect-[4/5] bg-blush-50 rounded-2xl border border-blush-100 flex items-center justify-center group overflow-hidden mt-10">
                <ChatCenteredDots size={48} className="text-rose/20 group-hover:scale-110 group-hover:text-rose transition-all duration-700" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── THE ECOSYSTEM — GRID INFO ── */}
        <section className="py-40 bg-blush-50/30 border-y border-blush-50 px-6">
          <div className="max-w-6xl mx-auto space-y-24">
            <ScrollReveal className="text-center space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-rose/30">CORE ARCHITECTURE</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-ink opacity-80 uppercase">The blushhh experience</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: Heart, title: "The Blush System", desc: "Matches based on shared interests and campus vibes. It's about that feeling when you cross paths at the main gate." },
                { icon: ChatCenteredDots, title: "Ephemeral Chat", desc: "Chatting that feels secure and intentional. Your privacy is our handcrafted priority." },
                { icon: ShieldCheck, title: "Verified Pulse", desc: "Strictly kiet.edu verification ensures you only connect with real hearts on campus." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="space-y-6"
                >
                  <item.icon size={32} className="text-rose" />
                  <h3 className="text-2xl font-black tracking-tight text-ink">{item.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-ink/60">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE BLUEPRINT — HOW IT WORKS ── */}
        <section className="py-40 bg-white px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="relative aspect-square lg:aspect-[4/5] bg-blush-50 rounded-[3rem] overflow-hidden border border-blush-100 shadow-2xl"
            >
              <Image src="/detail.png" alt="How it works" fill className="object-cover scale-110 hover:scale-100 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>

            <div className="space-y-16">
              <ScrollReveal className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-rose/40">THE BLUEPRINT</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-ink leading-[1.1]">
                  Handcrafted <br />for the <span className="text-rose italic serif font-light">moment.</span>
                </h2>
              </ScrollReveal>

              <div className="space-y-12">
                {[
                  { step: "01", title: "Institutional Verify", desc: "Seamless and secure authentication via your kiet.edu credentials. Exclusivity is our foundation." },
                  { step: "02", title: "Curate Your Story", desc: "Craft an editorial profile that goes beyond the bio. Share your vibe through a curated grid." },
                  { step: "03", title: "The Campus Blush", desc: "Connect with purpose. Every interaction is intentional, secure, and ephemeral." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex gap-8 group"
                  >
                    <span className="text-xl font-black text-rose/20 group-hover:text-rose transition-colors shrink-0">{item.step}</span>
                    <div className="space-y-2">
                       <h4 className="text-lg font-black tracking-tight text-ink">{item.title}</h4>
                       <p className="text-sm font-light text-ink/50 leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── THE EDITORIAL — STORIES ── */}
        <section className="relative min-h-screen py-40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image src="/hero.png" alt="Story" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:hidden" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/50 to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/40 backdrop-blur-3xl p-16 md:p-24 rounded-[3rem] border border-white/50 shadow-2xl space-y-10"
            >
              <div className="w-16 h-[1px] bg-rose" />
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-ink leading-none">
                A space where <br />
                stories <span className="text-rose italic serif font-light">breathe.</span>
              </h2>
              <p className="text-xl font-light text-ink/70 leading-relaxed max-w-md italic">
                &ldquo;We wanted a place where connections felt as real as a conversation in the library. 
                Quiet, intentional, and profoundly human.&rdquo;
              </p>
              <div className="pt-6">
                <Button variant="outline" className="rounded-full px-10 h-14 text-[10px] tracking-[0.2em] font-black border-ink/10 hover:border-rose hover:text-rose transition-all">
                  READ THE JOURNAL
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── THE PULSE — STATS ── */}
        <section className="py-60 relative overflow-hidden bg-ink text-petal">
          <div className="absolute inset-0 z-0 opacity-20 transition-opacity hover:opacity-30 duration-700">
             <Image src="/abstract.png" alt="Silk" fill className="object-cover" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
               {[
                 { val: "16,000+", label: "ACTIVE STUDENTS" },
                 { val: "100%", label: "KIET VERIFIED" },
                 { val: "500k+", label: "MEANINGFUL BLUSHES" },
                 { val: "24/7", label: "SECURE PULSE" }
               ].map((stat, i) => (
                 <motion.div 
                   key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center space-y-4"
                 >
                   <span className="text-6xl md:text-7xl font-black tracking-tighter text-rose">{stat.val}</span>
                   <span className="text-[10px] tracking-[1em] font-black opacity-40">{stat.label}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* ── FINAL ADVENTURE CTA ── */}
        <section className="py-80 px-6 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 z-0">
             <Image src="/grid_bg.png" alt="The Grid" fill className="object-cover opacity-[0.03]" />
           </div>
           
           <ScrollReveal className="max-w-2xl text-center space-y-12 relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-rose/5 rounded-full flex items-center justify-center">
                 <Heart size={32} className="text-rose anim-float animate-pulse" />
              </div>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-ink">
                Ready to find <br /> <span className="text-rose">your story?</span>
              </h2>
              <p className="max-w-md mx-auto text-lg md:text-xl font-light text-ink/60 antialiased italic serif">
                &ldquo;Sometimes the most epic stories start with a single blush.&rdquo;
              </p>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="h-20 px-24 text-[10px] tracking-[0.5em] font-black w-full bg-rose text-white border-0 rounded-full hover:bg-deep-rose transition-all shadow-2xl shadow-rose/20 uppercase">
                  JOIN THE CIRCLE
                </Button>
              </Link>
           </ScrollReveal>
        </section>
      </main>

      <footer className="py-32 bg-white border-t border-blush-50 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-20 text-center">
          
          <div className="flex flex-col items-center gap-6">
             <Image src="/logo.svg" alt="blushhh" width={64} height={64} className="hover:rotate-12 transition-transform duration-500" />
             <span className="text-3xl font-black tracking-tighter text-rose">blushhh</span>
             <p className="text-[10px] tracking-[0.4em] font-black text-ink/30 uppercase max-w-xs leading-loose">
               The first intimate editorial for the KIET group of institutions.
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-24 opacity-60">
             <div className="space-y-6 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-widest font-black text-rose">Foundation</span>
                <Link href="/about" className="text-[11px] font-medium hover:text-rose transition-colors">Mission</Link>
                <Link href="/safety" className="text-[11px] font-medium hover:text-rose transition-colors">Safety</Link>
             </div>
             <div className="space-y-6 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-widest font-black text-rose">Journal</span>
                <Link href="/stories" className="text-[11px] font-medium hover:text-rose transition-colors">Campus Vibes</Link>
                <Link href="/press" className="text-[11px] font-medium hover:text-rose transition-colors">Editorial</Link>
             </div>
             <div className="space-y-6 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-widest font-black text-rose">Privacy</span>
                <Link href="/privacy" className="text-[11px] font-medium hover:text-rose transition-colors">Policy</Link>
                <Link href="/terms" className="text-[11px] font-medium hover:text-rose transition-colors">Terms</Link>
             </div>
             <div className="space-y-6 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-widest font-black text-rose">Social</span>
                <Link href="https://instagram.com" className="text-[11px] font-medium hover:text-rose transition-colors flex items-center gap-2">
                  <InstagramLogo size={16} /> Instagram
                </Link>
                <Link href="/twitter" className="text-[11px] font-medium hover:text-rose transition-colors">Twitter</Link>
             </div>
          </div>

          <div className="pt-10 space-y-4">
            <div className="text-[9px] uppercase tracking-[0.5em] font-black text-ink/20">
               © 2026 BLUSHHH EDITORIAL · GHAZIABAD
            </div>
            <div className="text-[8px] tracking-[0.1em] font-bold text-ink/10 uppercase">
              Handcrafted with heart for kiet students only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
