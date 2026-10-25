import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { Brand } from './ui'
import { project } from '../data/project'

const links = [['Overview', 'overview'], ['Dashboard', 'dashboard'], ['Analysis', 'analysis'], ['Insights', 'insights'], ['Workflow', 'workflow']]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside) }
  }, [open])
  return <header ref={header} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="container nav-inner">
      <Brand />
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}
      </nav>
      <a className="button button-small button-dark nav-download" href={project.report} download><Download size={15} />Download PBIX</a>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {links.map(([name, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{name}</a>)}
      <a href={project.report} download onClick={() => setOpen(false)}><Download size={16} />Download PBIX</a>
    </nav>
  </header>
}
