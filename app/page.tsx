"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ArrowRight, InstagramLogo, Fingerprint, ChatCenteredDots, ShieldCheck } from "phosphor-react";

/* ──────────────────────────────────────────────────────────────────────────
   BLUSHHH — THE EDITORIAL LANDING PAGE
   Colors: Pure White (#ffffff) & Blush Logo Pink (#b94c6a)
   Aesthetics: Old Money Editorial meets Tinder Intensity
   ────────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-rose selection:text-white overflow-x-hidden font-sans">
      
      {/* ── STICKY EDITORIAL NAV ── */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 h-20 flex items-center justify-between ${
          isScrolled ? "bg-white/90 backdrop-blur-md border-b border-blush-100 h-16" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="blushhh" width={40} height={40} className="hover:scale-105 transition-transform duration-500" />
          <span className="font-serif text-2xl text-rose lowercase tracking-tighter hidden sm:inline-block">blushhh</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/about" className="metadata text-rose hover:opacity-70 transition-opacity">Philosophy</Link>
          <Link href="/stories" className="metadata text-rose hover:opacity-70 transition-opacity">Stories</Link>
          <Link href="/safety" className="metadata text-rose hover:opacity-70 transition-opacity">Safety</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="metadata text-ink-muted hover:text-rose transition-editorial px-2">Log In</Link>
          <Link href="/signup">
            <Button variant="rose" className="h-10 px-6 text-[10px] tracking-[0.2em] rounded-sm shadow-none">
              JOIN NOW
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="hero-entrance space-y-10 order-2 lg:order-1">
              <div className="inline-block px-4 py-1.5 border border-rose rounded-sm">
                <span className="metadata text-[9px] tracking-[0.4em]">EXCLUSIVE FOR KIET STUDENTS</span>
              </div>
              
              <h1 className="font-serif text-6xl sm:text-7xl xl:text-9xl text-ink leading-[0.9] tracking-tighter">
                Write your own <br />
                <span className="italic text-rose">love story.</span>
              </h1>

              <p className="font-sans font-light text-xl text-ink-muted max-w-lg leading-relaxed antialiased">
                Blushhh is an intimate, editorial-only circle for KIET. 
                Move slowly, speak intentionally, and find the connection 
                that actually belongs in your journal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="h-16 px-14 text-sm tracking-[0.2em] w-full bg-rose text-white border-0 rounded-sm hover:bg-deep-rose transition-editorial hover:translate-y-[-2px]">
                    OPEN YOUR DIARY →
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="h-16 px-10 text-[10px] tracking-[0.2em] w-full text-rose border border-rose/20 rounded-sm hover:bg-rose/5 transition-editorial">
                    OUR PHILOSOPHY
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] fade-in">
                {/* Hero Image - Generated */}
                <Image 
                  src="/hero.png" 
                  alt="College Intimacy" 
                  fill 
                  className="object-cover rounded-sm border border-blush-100 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 border border-rose/10 pointer-events-none -m-4 rounded-sm scale-105" />
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 scroll-breathe opacity-20">
             <div className="metadata text-[9px] text-rose">SCROLL TO DISCOVER</div>
             <div className="w-[1px] h-20 bg-rose" />
          </div>
        </section>

        {/* ── THE 3D FEATURE CIRCLES ── */}
        <section className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <ScrollReveal className="flex flex-col items-center text-center space-y-6" delay={0}>
                  <div className="w-48 h-48 relative hover:scale-105 transition-transform duration-700">
                     <Image src="/logo.svg" alt="Secure Chat" fill className="p-10 opacity-10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <ChatCenteredDots size={64} className="text-rose" weight="light" />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl">Secure Whispers</h3>
                  <p className="font-sans font-light text-ink-muted leading-relaxed text-sm">
                    End-to-end encrypted chats that feel like passing notes in class. 
                    Intimate, private, and purely yours.
                  </p>
                </ScrollReveal>

                <ScrollReveal className="flex flex-col items-center text-center space-y-6" delay={200}>
                  <div className="w-48 h-48 relative hover:scale-105 transition-transform duration-700">
                     <Image src="/logo.svg" alt="Smart Matching" fill className="p-10 opacity-10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Fingerprint size={64} className="text-rose" weight="light" />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl">Intuitive Match</h3>
                  <p className="font-sans font-light text-ink-muted leading-relaxed text-sm">
                    Our system understands the poetry between people. 
                    We match based on soul, not snapshots.
                  </p>
                </ScrollReveal>

                <ScrollReveal className="flex flex-col items-center text-center space-y-6" delay={400}>
                  <div className="w-48 h-48 relative hover:scale-105 transition-transform duration-700">
                     <Image src="/logo.svg" alt="Verified Safety" fill className="p-10 opacity-10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck size={64} className="text-rose" weight="light" />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl">KIET Verified</h3>
                  <p className="font-sans font-light text-ink-muted leading-relaxed text-sm">
                    Only KIET domains are allowed. A curated community 
                    of students you can actually trust.
                  </p>
                </ScrollReveal>
             </div>
          </div>
        </section>

        {/* ── EDITORIAL IMAGE SPREAD ── */}
        <section className="py-24 px-6 border-y border-blush-100">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal className="aspect-[4/5] relative overflow-hidden group border border-blush-100" delay={0}>
                 <Image src="/detail.png" alt="Detail" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute bottom-6 left-6 metadata text-white drop-shadow-sm">VOLUME 01</div>
              </ScrollReveal>
              <ScrollReveal className="aspect-[4/5] relative overflow-hidden group border border-blush-100 lg:mt-24" delay={200}>
                 <Image src="/abstract.png" alt="Abstract" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute bottom-6 left-6 metadata text-white drop-shadow-sm">MOODBOARD</div>
              </ScrollReveal>
              <ScrollReveal className="aspect-[4/5] relative overflow-hidden group border border-blush-100" delay={400}>
                 <div className="p-10 flex flex-col justify-center h-full bg-rose text-white space-y-6 text-center">
                    <span className="metadata text-white/60">THE QUOTE</span>
                    <h2 className="font-serif text-4xl italic leading-tight">
                      &ldquo;It&apos;s not an app, it&apos;s an archive of meaningful glances.&rdquo;
                    </h2>
                    <div className="h-px w-10 bg-white/30 mx-auto" />
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* ── THE PROCESS — TINDER-SPEED, EDITORIAL SOUL ── */}
        <section className="py-40 px-6">
           <div className="max-w-4xl mx-auto space-y-32">
              <ScrollReveal className="flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <span className="metadata">STEP 01</span>
                    <h2 className="font-serif text-4xl md:text-5xl">The Signature Letter</h2>
                    <p className="font-sans font-light text-ink-muted text-lg">
                      Instead of a swipe, you send a letter. 
                      Express yourself with honesty. Words have more 
                      gravity than profiles.
                    </p>
                 </div>
                 <div className="w-full md:w-1/2 aspect-square relative border border-blush-100 bg-blush-50 p-12">
                     <div className="w-full h-full border-b-2 border-rose/10 flex items-end pb-4 font-serif text-rose/40 italic text-2xl">
                        Dear stranger...
                     </div>
                 </div>
              </ScrollReveal>

              <ScrollReveal className="flex flex-col md:flex-row-reverse items-center gap-16">
                 <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <span className="metadata">STEP 02</span>
                    <h2 className="font-serif text-4xl md:text-5xl">Anonymous Bloom</h2>
                    <p className="font-sans font-light text-ink-muted text-lg">
                      Your identity remains a secret until you feel ready. 
                      Let the conversation build the bridge, not the optics.
                    </p>
                 </div>
                 <div className="w-full md:w-1/2 aspect-square relative border border-blush-100 bg-blush-50 flex items-center justify-center">
                     <div className="w-32 h-32 border-2 border-rose/20 rounded-full animate-ping opacity-20" />
                     <div className="absolute font-serif text-5xl text-rose/10">?</div>
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* ── FINAL EDITORIAL CTA ── */}
        <section className="py-40 px-6 bg-white relative overflow-hidden">
           <div className="absolute inset-0 bg-rose/[0.02] -z-10" />
           <ScrollReveal className="max-w-xl mx-auto text-center space-y-12 flex flex-col items-center">
              <Image src="/logo.svg" alt="blushhh" width={100} height={100} />
              <h2 className="font-serif text-5xl md:text-7xl leading-tight text-ink">
                Ready to find <br />
                <span className="italic text-rose">your muse?</span>
              </h2>
              <p className="font-sans font-light text-xl text-ink-muted leading-relaxed">
                Join the exclusive circle of Blushhh at KIET. 
                Your next meaningful encounter is just 
                one thoughtful letter away.
              </p>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="h-20 px-20 text-sm tracking-[0.3em] w-full bg-rose text-white border-0 rounded-none hover:bg-deep-rose transition-editorial">
                  START YOUR CHAPTER
                </Button>
              </Link>
           </ScrollReveal>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-blush-100 py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-20">
          
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="blushhh" width={32} height={32} />
              <span className="font-serif text-2xl text-rose lowercase tracking-tighter">blushhh</span>
            </div>
            <p className="font-sans font-light text-ink-muted max-w-sm leading-relaxed">
              Handcrafted with intention for the students of KIET Group of Institutions. 
              The editorial sanctuary for meaningful connection.
            </p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-rose transition-editorial"><InstagramLogo size={24} weight="light" /></a>
               {/* Add more icons if needed */}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
             <div className="space-y-6">
                <h4 className="metadata text-[10px]">COMMUNITY</h4>
                <ul className="space-y-3 font-sans font-light text-sm text-ink-muted antialiased">
                   <li><Link href="/guidelines" className="hover:text-rose">Guidelines</Link></li>
                   <li><Link href="/safety" className="hover:text-rose">Safety</Link></li>
                   <li><Link href="/stories" className="hover:text-rose">Stories</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="metadata text-[10px]">COMPANY</h4>
                <ul className="space-y-3 font-sans font-light text-sm text-ink-muted antialiased">
                   <li><Link href="/about" className="hover:text-rose">About</Link></li>
                   <li><Link href="/contact" className="hover:text-rose">Contact</Link></li>
                   <li><Link href="/press" className="hover:text-rose">Press</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="metadata text-[10px]">LEGAL</h4>
                <ul className="space-y-3 font-sans font-light text-sm text-ink-muted antialiased">
                   <li><Link href="/privacy" className="hover:text-rose">Privacy</Link></li>
                   <li><Link href="/terms" className="hover:text-rose">Terms</Link></li>
                </ul>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-blush-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="metadata text-[9px] text-ink-ghost tracking-[0.3em]">
             © 2026 BLUSHHH EDITORIAL · ALL RIGHTS RESERVED
           </p>
           <div className="flex gap-8">
              <span className="metadata text-[9px] text-rose/40">DESIGNED IN GHAZIABAD</span>
              <span className="metadata text-[9px] text-rose/40">KIET VERIFIED</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
