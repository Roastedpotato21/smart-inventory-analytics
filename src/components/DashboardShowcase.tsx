import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Download, Maximize2, Monitor, X } from 'lucide-react'
import { project } from '../data/project'
import { Eyebrow, Reveal } from './ui'

export function DashboardShowcase() {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!open) return
    const element = dialog.current
    element?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element?.close(); document.body.style.overflow = previous }
  }, [open])
  return <section id="dashboard" className="dashboard-section section">
    <div className="container">
      <Reveal className="section-heading dashboard-heading"><div><Eyebrow light number="02">THE BIG PICTURE</Eyebrow><h2>Power BI Dashboard<span className="title-dot">.</span></h2></div><p>Pricing, inventory and sales patterns,<br className="desktop-break" /> brought together in a single report.</p></Reveal>
      <Reveal delay={0.1}>
        <div className="report-frame">
          <div className="report-toolbar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span><Monitor size={14} />Smart Inventory Analytics / Power BI</span><span className="report-static">STATIC PREVIEW</span></div>
          <button className="dashboard-preview" onClick={() => setOpen(true)} aria-label="Enlarge the original Power BI dashboard screenshot"><img src={project.dashboard} width="1917" height="1028" alt="Original Power BI Desktop screenshot showing category filters, total units sold, inventory distribution, average category prices, insights and recommendations." loading="lazy" /><span className="preview-zoom"><Maximize2 size={17} />Explore the full image</span></button>
          <div className="report-caption"><span className="live-dot" />Original project artifact<span className="caption-divider">/</span><span>Click the image to take a closer look</span></div>
        </div>
      </Reveal>
      <Reveal className="dashboard-actions"><div className="button-row"><a className="button button-mint" href={project.report} download><Download size={17} />Download Power BI Report</a><a className="text-link text-link-light" href={project.dashboard} target="_blank" rel="noreferrer">View Full Image<ArrowUpRight size={17} /></a></div><p><InfoIcon />Open the downloaded PBIX using Power BI Desktop.</p></Reveal>
    </div>
    <dialog ref={dialog} className="dashboard-dialog" aria-labelledby="dashboard-dialog-title" onClose={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="dialog-content"><div className="dialog-header"><h3 id="dashboard-dialog-title">Power BI Dashboard · Original screenshot</h3><button aria-label="Close dashboard preview" className="dialog-close" onClick={() => setOpen(false)} autoFocus><X size={22} /></button></div><img src={project.dashboard} width="1917" height="1028" alt="Enlarged original Smart Inventory Analytics Power BI Desktop dashboard." /><div className="dialog-footer"><span>Static preview · use the PBIX for report interactions</span><a href={project.dashboard} target="_blank" rel="noreferrer">Open original image<ArrowUpRight size={15} /></a></div></div>
    </dialog>
  </section>
}

function InfoIcon() { return <span className="info-circle" aria-hidden="true">i</span> }
