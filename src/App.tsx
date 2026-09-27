import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import { PetalRain } from './PetalRain'

import coverIllustration from './assets/illustrations/invite_cover_illustration.png'
import coupleCurrent from './assets/couple_current.png'
import uluDhoni from './assets/ulu_dhoni.m4a'
import groomCurrent from './assets/groom_current.jfif'
import brideCurrent from './assets/bride_current.png'
import closingIllustration from './assets/illustrations/illustration_end.png'
import kalash from './assets/illustrations/wedding-components/01-kalash.svg'
import greenLeaves from './assets/illustrations/wedding-components/02-green-leaves.svg'
import decorativePanel from './assets/illustrations/wedding-components/03-decorative-panel.svg'
import shubhBibaho from './assets/illustrations/wedding-components/05-shubh-bibaho-sign.svg'
import bananaLeafMeal from './assets/illustrations/wedding-components/06-banana-leaf-meal.svg'
import flowerBouquet from './assets/illustrations/wedding-components/07-flower-bouquet.svg'
import ritualPot from './assets/illustrations/wedding-components/08-white-ritual-pot.svg'
import redKalash from './assets/illustrations/wedding-components/09-red-ritual-kalash.svg'
import decorativeCrown from './assets/illustrations/wedding-components/10-decorative-crown.svg'

import pendulum01 from './assets/illustrations/pendulums/pendulum-01.svg'
import pendulum02 from './assets/illustrations/pendulums/pendulum-02.svg'
import pendulum03 from './assets/illustrations/pendulums/pendulum-03.svg'
import pendulum04 from './assets/illustrations/pendulums/pendulum-04.svg'
import pendulum05 from './assets/illustrations/pendulums/pendulum-05.svg'
import pendulum06 from './assets/illustrations/pendulums/pendulum-06.svg'
import pendulum07 from './assets/illustrations/pendulums/pendulum-07.svg'

gsap.registerPlugin(ScrollTrigger)

const pendulums = [pendulum01, pendulum02, pendulum03, pendulum04, pendulum05, pendulum06, pendulum07]

function App() {
  const pageRef = useRef<HTMLElement>(null)
  const uluAudioRef = useRef<HTMLAudioElement>(null)
  const [invitationLanguage, setInvitationLanguage] = useState<'bn' | 'en'>('bn')
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const rsvpCloseRef = useRef<HTMLButtonElement>(null)
  const invitationScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = invitationScrollRef.current
    if (!node) return
    const scroller: HTMLDivElement = node
    const phone = window.matchMedia('(max-width: 700px), (hover: none) and (pointer: coarse)')
    let startX = 0
    let startY = 0
    let lastY = 0
    let axis: 'x' | 'y' | null = null

    function onTouchStart(event: TouchEvent) {
      if (!phone.matches) return
      const touch = event.touches[0]
      if (!touch) return
      startX = touch.clientX
      startY = touch.clientY
      lastY = touch.clientY
      axis = null
    }

    function onTouchMove(event: TouchEvent) {
      if (!phone.matches) return
      const touch = event.touches[0]
      if (!touch) return
      if (axis === null) {
        const dx = touch.clientX - startX
        const dy = touch.clientY - startY
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        axis = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x'
      }
      if (axis !== 'y' || !event.cancelable) return
      event.preventDefault()
      const delta = lastY - touch.clientY
      lastY = touch.clientY
      const root = document.documentElement
      const previous = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, window.scrollY + delta)
      root.style.scrollBehavior = previous
    }

    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  useEffect(() => {
    if (!rsvpOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    rsvpCloseRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setRsvpOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [rsvpOpen])

  function startUluDhoni() {
    const audio = uluAudioRef.current
    if (!audio) return
    audio.volume = 1
    audio.currentTime = 0
    void audio.play().catch(() => undefined)
  }

  function stopUluDhoni() {
    const audio = uluAudioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.corridor-panel')
      const timeline = gsap.timeline({ scrollTrigger: { trigger: '.corridor-scroll', pin: '.corridor-scene', start: 'top top', end: 'bottom bottom', scrub: 2 } })
      panels.forEach((panel, index) => {
        const panelStart = index === 0 ? 0 : index * 1.9
        timeline.fromTo(panel, { z: index === 0 ? 80 : -850, y: index === 0 ? 0 : 34, rotateX: index === 0 ? 0 : (index % 2 ? 5 : -5), rotateY: index === 0 ? 0 : (index % 2 ? -9 : 9), scale: index === 0 ? 1 : 1.12, filter: 'blur(0px)', autoAlpha: index === 0 ? 1 : 0 }, { z: 80, y: 0, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 1, ease: 'none' }, panelStart)
        if (index < panels.length - 1) {
          timeline.to(panel, { z: 480, scale: 0.88, filter: 'blur(0px)', rotateY: index % 2 ? 9 : -9, autoAlpha: 0, duration: 0.9, ease: 'none' }, panelStart + 1)
          timeline.fromTo('.corridor-transition', { autoAlpha: 0, scaleX: 0, rotate: index % 2 ? -5 : 5 }, { autoAlpha: 0.28, scaleX: 1, duration: 0.24, ease: 'power2.in' }, panelStart + 1)
          timeline.to('.corridor-transition', { autoAlpha: 0, scaleX: 0, duration: 0.42, ease: 'power3.out' }, panelStart + 1.18)
        }
      })
      gsap.to('.pendulum', { rotation: () => gsap.utils.random(-7, 7), transformOrigin: '50% 0%', duration: () => gsap.utils.random(2.8, 5.2), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: () => gsap.utils.random(-2, 0), stagger: { each: 0.18, from: 'random' } })
      gsap.from('.hero-stamp, .hero-title, .hero-subtitle', { autoAlpha: 0, y: 28, duration: 1, stagger: 0.14, ease: 'power3.out' })
      gsap.to('.corridor-glow', { opacity: 0.8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: '.corridor-scroll', start: 'top top', end: 'bottom bottom', scrub: true } })
    }, page)
    return () => context.revert()
  }, [])

  return (
    <main className="wedding-page" ref={pageRef}>
      <PetalRain />
      <audio ref={uluAudioRef} src={uluDhoni} loop preload="auto" className="hidden" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="অন্বেষা and ঋতম, home"><span className="wordmark-mark">ম</span><span className="bengali-name">অন্বেষা <span className="vermillion-mark" aria-hidden="true">卐</span> ঋতম</span></a>
      </header>

      <section className="corridor-scroll" id="story" aria-label="Our wedding story"><div className="corridor-scene"><div className="corridor-glow" aria-hidden="true" /><div className="corridor-transition pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[min(42vw,34rem)] -translate-x-1/2 scale-x-0 bg-[radial-gradient(ellipse_at_center,rgba(255,225,157,0.55),rgba(196,137,59,0.12)_42%,transparent_72%)] opacity-0 mix-blend-screen transition-[opacity,transform] duration-700 ease-out" aria-hidden="true"><span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber-100/65 shadow-[0_0_20px_6px_rgba(255,220,140,0.35)]" /><span className="absolute inset-y-0 left-1/4 w-px bg-amber-100/20" /><span className="absolute inset-y-0 right-1/4 w-px bg-amber-100/20" /></div><section className="hero corridor-panel corridor-intro" id="home" aria-labelledby="hero-title"><div className="hero-paper" /><div className="hero-arch" /><img className="hero-corner hero-corner-left" src={greenLeaves} alt="" aria-hidden="true" /><img className="hero-corner hero-corner-right" src={flowerBouquet} alt="" aria-hidden="true" /><div className="hero-copy"><p className="hero-kicker">দুই পরিবার · এক আনন্দ</p><div className="hero-stamp"><span>শুভ</span><b>বিবাহ</b></div><h1 className="hero-title" id="hero-title"><span>অন্বেষা</span><span>ঋতম</span></h1><p className="hero-subtitle">আমাদের জীবনের নতুন অধ্যায়ে<br />আপনাকে সাদর আমন্ত্রণ</p><p className="hero-date">২১ নভেম্বর ২০২৬ · কলকাতা</p><a className="hero-link" href="#story">ভেতরে আসুন <span aria-hidden="true">↓</span></a></div><p className="hero-side-note">শুভ বিবাহ · ২০২৬</p><div className="hero-bottomline"><span>Scroll to enter</span><span>কলকাতা · ২২°৩৪′ N</span></div></section><div className="pendulum-row" aria-hidden="true">{pendulums.map((pendulum) => <img className="pendulum" key={pendulum} src={pendulum} alt="" />)}</div>
        <article className="corridor-panel panel-cover">
          <img className="panel-art cover-art" src={coverIllustration} alt="Illustrated wedding invitation cover" />
          <div className="panel-copy">
            <h2>ভালোবাসার
              <br /><i>বাড়িতে স্বাগতম</i>
            </h2>
            <p>একটি চিঠি, যা আপনাকে আমাদের গল্পের ভেতরে নিয়ে যাবে।</p>
          </div>
          <img className="distributed-art cover-kalash" src={kalash} alt="" aria-hidden="true" />
        </article>
        <article className="corridor-panel panel-story">
          <div className="panel-copy">
            <h2>ঋতম
              <br /><i>আমুদে মানুষ</i>
            </h2>
            <p>রসিক, মিষ্টি স্বভাবের, আর ভীষণ ভালো মনের মানুষ।</p>
            <p className="bengali-line">যাঁর হাসিতে আড্ডা আরও জমে ওঠে</p>
          </div>
          <img className="panel-art groom-art" src={groomCurrent} alt="Portrait of the groom" />
          <img className="floating-component story-flower" src={flowerBouquet} alt="" aria-hidden="true" />
          <img className="distributed-art story-leaves" src={greenLeaves} alt="" aria-hidden="true" />
          <img className="distributed-art story-panel-art" src={decorativePanel} alt="" aria-hidden="true" />
        </article>
        <article className="corridor-panel panel-portrait">
          <img className="panel-art bride-art" src={brideCurrent} alt="Portrait of the bride" />
          <div className="panel-copy">
            <h2>অন্বেষা
              <br />
              <i>মিষ্টি মনের মানুষ</i>
            </h2>
            <p>মিষ্টি, প্রাণবন্ত আর একটু লাজুক একজন মানুষ।</p>
            <p className="bengali-line">যাঁর হাসিতে চারপাশটা আরও উজ্জ্বল হয়ে ওঠে</p>
          </div>
          <img className="distributed-art portrait-crown" src={decorativeCrown} alt="" aria-hidden="true" />
        </article>
        <article className="corridor-panel panel-celebration" id="celebrations">
          <div className="panel-copy">
            <h2>শুভক্ষণ</h2>
            <p>অবশেষে সেই সময় এসে গেছে, যখন উলুধ্বনি শোনা যাবে।</p>
          </div>
          <img className="panel-art couple-art" src={coupleCurrent} alt="Portrait of the couple" onPointerEnter={startUluDhoni} onPointerDown={startUluDhoni} onClick={startUluDhoni} onPointerLeave={stopUluDhoni} />
          <img className="distributed-art celebration-meal" src={bananaLeafMeal} alt="" aria-hidden="true" />
          <img className="distributed-art celebration-pot" src={ritualPot} alt="" aria-hidden="true" />
        </article>
        <article className="corridor-panel invitation-panel" id="invitation" aria-labelledby="invitation-title">
          <img className="invitation-corner invitation-corner-left" src={kalash} alt="" aria-hidden="true" />
          <img className="invitation-corner invitation-corner-right" src={decorativePanel} alt="" aria-hidden="true" />
          <div className="invitation-shell">
            <div className="invitation-topline">
              <span className="panel-index">আমন্ত্রণ · Invitation</span>
              <div className="inline-flex rounded-full border border-amber-900/20 bg-white/50 p-1 shadow-sm">
              <button type="button" aria-pressed={invitationLanguage === 'bn'} onClick={() => setInvitationLanguage('bn')} className={`rounded-full px-3 py-1 text-xs font-semibold transition ${invitationLanguage === 'bn' ? 'bg-[#8f4735] text-[#fff4d8] shadow' : 'text-[#725546] hover:bg-white/70'}`}>বাংলা</button>
              <button type="button" aria-pressed={invitationLanguage === 'en'} onClick={() => setInvitationLanguage('en')} className={`rounded-full px-3 py-1 text-xs font-semibold transition ${invitationLanguage === 'en' ? 'bg-[#8f4735] text-[#fff4d8] shadow' : 'text-[#725546] hover:bg-white/70'}`}>English</button>
            </div>
          </div>
          <div className="invitation-rule" />
          <div className="invitation-scroll" ref={invitationScrollRef} aria-live="polite">
            {invitationLanguage === 'bn' ? 
              <div className="invitation-copy bengali-invitation">
                <h2 id="invitation-title">শ্রীশ্রী প্রজাপতয়ে নমঃ</h2>
                <p>
                  <strong>পরম শ্রদ্ধেয়েষু,</strong>
                  <br />
                  <strong>সশ্রদ্ধ প্রণাম ও সাদর সম্ভাষণ জানাই।</strong>
                </p>
                <p>
                  বৈদিক মন্ত্রোচ্চারণ, শঙ্খধ্বনি ও সানাইয়ের মধুর সুরে আমাদের পুত্র 
                  <strong>ঋতম চট্টোপাধ্যায়</strong>-এর সহিত <strong>অন্বেষা পাল</strong>-এর শুভ পরিণয় সম্পন্ন হইয়াছে। দুই পরিবারের স্নেহ, আশীর্বাদ ও শুভকামনায় নবদম্পতির জীবনে আরম্ভ হইয়াছে এক নূতন অধ্যায়।
                </p>
                <p>
                  এই আনন্দঘন শুভক্ষণে নবদম্পতিকে আশীর্বাদ করিবার জন্য আপনাকে ও আপনার পরিবারবর্গকে আমাদের 
                  <strong>বিবাহোত্তর বৌভাতের অনুষ্ঠানে</strong> সাদর আমন্ত্রণ জানাইতেছি। আপনার সানুগ্রহ উপস্থিতিতে আমাদের আনন্দোৎসব পরিপূর্ণ হইবে।
                </p>
                <p>
                  <strong>অনুষ্ঠানের দিন:</strong> 
                  ১৫ই নভেম্বর, ২০২৬, রবিবার<br />
                  <strong>সময়:</strong> 
                  সন্ধ্যা ৬টা হইতে<br />
                  <strong>স্থান:</strong> ব্যারাকপুর রবীন্দ্র ভবন, ব্যারাকপুর, উত্তর ২৪ পরগনা
                </p>
                <p>
                  আপনাদের শুভাগমন ও আশীর্বাদে নবদম্পতির নবজীবন হউক মধুময়, শান্তিময় ও আনন্দে পরিপূর্ণ। এই আন্তরিক প্রার্থনায় আপনাদের সকলের উপস্থিতি একান্তভাবে কামনা করি।
                </p>
                <p>
                  <strong>ইতি,</strong><br />
                  <strong>স্বপ্নময় চট্টোপাধ্যায়</strong><br />
                  ব্যারাকপুর
                </p>
                <div className="invitation-people">
                  <p>
                    <strong>বর</strong><br />
                    ঋতম চট্টোপাধ্যায়<br />
                    পিতা: স্বপ্নময় চট্টোপাধ্যায়<br />
                    মাতা: পূর্ণিমা চট্টোপাধ্যায়<br />
                    নিবাস: ব্যারাকপুর
                  </p>
                  <p>
                    <strong>বধূ</strong><br />
                    অন্বেষা পাল<br />
                    পিতা: সজল কুমার পাল<br />
                    মাতা: সুচন্দ্রা পাল<br />
                    নিবাস: হিন্দমোটর
                  </p>
                </div>
              </div> : 
              <div className="invitation-copy english-invitation">
                <h2 id="invitation-title">Wedding Reception Invitation</h2>
                <p><strong>With the blessings of the Almighty</strong></p>
                <p>Dear Family and Friends,</p>
                <p>
                  With grateful hearts, we are delighted to share that our son, 
                  <strong>Ritam Chatterjee</strong>, and 
                  <strong>Anwesha Pal</strong> have been united in marriage. Surrounded by the love and blessings of both families, they have begun a beautiful new chapter together.
                </p>
                <p>We warmly invite you and your family to join us for their wedding reception and bless the newlyweds. Your presence will make this joyful occasion all the more special.</p>
                <p>
                  <strong>Sunday, 15 November 2026</strong><br />
                  <strong>From 6:00 p.m.</strong><br />
                  <strong>Barrackpore Rabindra Bhavan</strong><br />
                  Barrackpore, North 24 Parganas
                </p>
                <p>We look forward to celebrating with you and sharing an evening filled with warmth, happiness, and cherished memories.</p>
                <p>
                  With warm regards,<br />
                  <strong>Swapnamoy Chatterjee</strong><br />
                  Barrackpore
                </p>
                <div className="invitation-people">
                  <p><strong>Groom</strong><br />
                    <strong>Ritam Chatterjee</strong><br />
                    Son of Swapnamoy Chatterjee and Purnima Chatterjee<br />
                    Barrackpore
                  </p>
                  <p>
                    <strong>Bride</strong><br />
                    <strong>Anwesha Pal</strong><br />
                    Daughter of Sajal Kumar Pal and Suchandra Pal<br />
                    Hind Motor
                  </p>
                </div>
              </div>}
            </div>
          </div>
        </article>
        <section className="closing-slide corridor-panel corridor-outro" id="welcome" aria-labelledby="closing-title">
          <img className="closing-slide-art" src={closingIllustration} alt="Illustrated wedding couple invitation" />
          <div className="closing-slide-copy">
            <span className="panel-index">শেষ পাতা</span>
            <h2 id="closing-title">এসো,<br /><i>একসাথে হই।</i></h2>
            <p>আপনাদের অপেক্ষায় রইলাম।</p>
            <button type="button" onClick={() => setRsvpOpen(true)} className="mt-7 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#f3d18b]/80 bg-[#fff4d8] px-7 py-2.5 font-[family-name:var(--bengali)] text-sm font-semibold tracking-[0.16em] text-[#5c3428] shadow-[0_12px_28px_rgba(24,32,20,0.32)] transition hover:-translate-y-0.5 hover:bg-white">RSVP</button>
            <span className="closing-names bengali-name mt-6 block">
              অন্বেষা <span className="vermillion-mark" aria-hidden="true">卐</span> ঋতম
            </span>
          </div>
          <img className="closing-decor closing-sign" src={shubhBibaho} alt="" aria-hidden="true" />
          <img className="closing-decor closing-kalash" src={redKalash} alt="" aria-hidden="true" />
        </section>
      </div></section>
      {rsvpOpen && createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-5">
          <button type="button" aria-label="Close RSVP" className="absolute inset-0 cursor-pointer bg-[#241910]/72 backdrop-blur-[3px]" onClick={() => setRsvpOpen(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="rsvp-title" className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#e7c98a] bg-[#fff8ea] px-8 py-9 text-center font-[family-name:var(--typewriter)] text-[#3d2a22] shadow-[0_28px_70px_rgba(18,12,8,0.45)]">
            <span className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-[#8f4735]/25" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-5 rounded-[1.35rem] border border-[#c4893b]/20" aria-hidden="true" />
            <p className="relative font-[family-name:var(--bengali)] text-[11px] tracking-[0.22em] text-[#8f4735]">উপস্থিতি জানান</p>
            <h2 id="rsvp-title" className="relative mt-3 text-5xl leading-none font-normal tracking-wide text-[#8f4735]">RSVP</h2>
            <p className="relative mt-4 text-base tracking-wide text-[#725546]">Call to confirm your presence</p>
            <div className="relative mt-7 grid gap-3">
              <a href="tel:+919876543210" className="rounded-2xl border border-[#8f4735]/20 bg-white/70 px-4 py-3 text-lg tracking-wide text-[#5c3428] shadow-sm transition hover:border-[#8f4735]/45 hover:bg-white">(+91 9876543210)</a>
              <a href="tel:+919907654321" className="rounded-2xl border border-[#8f4735]/20 bg-white/70 px-4 py-3 text-lg tracking-wide text-[#5c3428] shadow-sm transition hover:border-[#8f4735]/45 hover:bg-white">(+91 9907654321)</a>
            </div>
            <button ref={rsvpCloseRef} type="button" onClick={() => setRsvpOpen(false)} className="relative mt-7 cursor-pointer rounded-full bg-[#8f4735] px-7 py-2.5 text-sm tracking-[0.14em] text-[#fff4d8] shadow transition hover:bg-[#74392b]">Close</button>
          </div>
        </div>,
        document.body,
      )}
      <footer className="site-footer"><span className="bengali-name">অন্বেষা <span className="vermillion-mark" aria-hidden="true">卐</span> ঋতম</span><p>ভালোবাসায়, কলকাতা · ২১ নভেম্বর ২০২৬</p></footer>
    </main>
  )
}

export default App
