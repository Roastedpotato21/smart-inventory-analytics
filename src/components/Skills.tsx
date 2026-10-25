import { Eyebrow, Reveal } from './ui'

export function Skills() {
  const tools = ['Microsoft Excel', 'MySQL', 'SQL', 'Power BI', 'GitHub']
  const skills = ['Data Cleaning', 'Data Visualization', 'KPI Analysis', 'Business Insights', 'Dashboard Development']
  return <section className="skills-section" aria-label="Tools and skills"><div className="container"><Reveal className="skills-layout"><div><Eyebrow>TOOLS & SKILLS</Eyebrow><h2>The toolkit behind <br />the analysis.</h2></div><div><div className="skill-group"><span className="small-label">WORKED WITH</span><div>{tools.map(tool => <span className="skill-pill skill-tool" key={tool}><span />{tool}</span>)}</div></div><div className="skill-group"><span className="small-label">PUT INTO PRACTICE</span><div>{skills.map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div></div></div></Reveal></div></section>
}
