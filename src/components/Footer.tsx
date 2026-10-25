import { ArrowUpRight, Github } from 'lucide-react'
import { project } from '../data/project'
import { Brand } from './ui'

export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><Brand /><p>Data Analytics Portfolio Project<br /><span>Built with curiosity. Backed by the data.</span></p><a className="text-link" href={project.github} target="_blank" rel="noreferrer"><Github size={17} />View on GitHub<ArrowUpRight size={16} /></a></div><div className="container footer-bottom"><span>Excel · MySQL · SQL · Power BI</span><span>Synthetic data. Transparent analysis.</span><a href="#top">Back to top ↑</a></div></footer>
}
