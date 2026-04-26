// =====================================================================
// DIRECTION 1: DOSSIER
// Declassified field-file aesthetic. Mono + serif. Stamps, redactions,
// margin annotations, perforated edges, toner-on-newsprint.
// Palette: paper #E9E2D2, ink #1A1815, alarm-red #B12B1F, classified-blue #2A3F66
// =====================================================================

const DOSSIER = {
  paper:   '#E9E2D2',
  paper2:  '#DBD2BC',
  ink:     '#1C1A16',
  ink2:    '#3A352B',
  faint:   '#7A7263',
  red:     '#B12B1F',
  blue:    '#1F3766',
  black:   '#0E0C09',
  // dark variant — green-screen archive terminal
  darkBg:    '#0E1410',
  darkPaper: '#161D17',
  darkInk:   '#C8D4BD',
  darkFaint: '#5A6A55',
  darkRed:   '#E04A3D',
  darkAmber: '#D4A24A',
};

// ---------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------
function DossierGrain({ dark }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', mixBlendMode: dark ? 'overlay' : 'multiply', opacity: dark ? 0.35 : 0.18 }}>
      <filter id="dgrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#dgrain)"/>
    </svg>
  );
}

function DossierStamp({ children, color, rotate = -8, style }) {
  return (
    <div style={{
      display: 'inline-block',
      transform: `rotate(${rotate}deg)`,
      border: `2.5px solid ${color}`,
      color: color,
      padding: '4px 10px 3px',
      fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      borderRadius: 2,
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</div>
  );
}

function DossierLine({ dark, dashed }) {
  return (
    <div style={{
      height: 1,
      borderTop: dashed
        ? `1px dashed ${dark ? DOSSIER.darkFaint : DOSSIER.faint}`
        : `1px solid ${dark ? DOSSIER.darkFaint + '66' : DOSSIER.ink + '33'}`,
    }}/>
  );
}

function DossierBg({ dark }) {
  if (dark) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: DOSSIER.darkBg, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${DOSSIER.darkInk}10 1px, transparent 1px)`,
          backgroundSize: '100% 4px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${DOSSIER.darkPaper} 0%, ${DOSSIER.darkBg} 70%)`,
          pointerEvents: 'none',
        }}/>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', inset: 0, background: DOSSIER.paper, overflow: 'hidden' }}>
      <DossierGrain dark={false}/>
      {/* faint horizontal scan lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${DOSSIER.ink}05 1px, transparent 1px)`,
        backgroundSize: '100% 26px',
        pointerEvents: 'none',
      }}/>
    </div>
  );
}

// ---------------------------------------------------------------------
// 1A — COVER (file folder w/ stamps)
// ---------------------------------------------------------------------
function DossierCover({ dark }) {
  const ink = dark ? DOSSIER.darkInk : DOSSIER.ink;
  const faint = dark ? DOSSIER.darkFaint : DOSSIER.faint;
  const accent = dark ? DOSSIER.darkRed : DOSSIER.red;
  const blue = dark ? DOSSIER.darkAmber : DOSSIER.blue;
  return (
    <div style={{ position: 'relative', minHeight: '100%', paddingTop: 54, color: ink, fontFamily: '"JetBrains Mono", monospace' }}>
      <DossierBg dark={dark}/>
      <div style={{ position: 'relative', padding: '20px 22px 80px' }}>

        {/* TOP MARGINALIA — CASE NUMBER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.15em', color: faint, marginBottom: 14 }}>
          <span>FILE 04-2026 / GRENDEL</span>
          <span>CLASS-IV / EYES ONLY</span>
        </div>

        {/* HEADER BAR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 14, height: 14, border: `1.5px solid ${ink}`, borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 3, background: accent }}/>
          </div>
          <span style={{ fontSize: 11, letterSpacing: '0.22em', fontWeight: 700 }}>OPERATIONS DOSSIER</span>
          <div style={{ flex: 1, borderTop: `1px solid ${ink}` }}/>
          <span style={{ fontSize: 10, color: faint }}>RM-04</span>
        </div>

        {/* STAMPS ROW */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 26, alignItems: 'flex-start' }}>
          <DossierStamp color={accent} rotate={-7}>UNAUTHORIZED</DossierStamp>
          <DossierStamp color={blue} rotate={4} style={{ marginTop: 12 }}>NON-PROFIT FAN WORK</DossierStamp>
        </div>

        {/* TITLE */}
        <div style={{ fontSize: 11, letterSpacing: '0.3em', color: faint, marginBottom: 6 }}>SUBJECT</div>
        <h1 style={{
          fontFamily: '"Newsreader", "IBM Plex Serif", Georgia, serif',
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: '0 0 10px',
        }}>The<br/>Judas<br/>Strain</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 22 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.25em' }}>VOL. 01 — PROJECT GRENDEL</span>
        </div>

        {/* FIELD CARD — placeholder still */}
        <div style={{
          position: 'relative', height: 200, marginBottom: 18,
          background: dark ? '#0A0F0A' : DOSSIER.paper2,
          border: `1px solid ${ink}`,
          padding: 4,
        }}>
          <div style={{
            position: 'absolute', inset: 4,
            background: dark
              ? 'repeating-linear-gradient(45deg, #0E1A0E 0 6px, #0A130A 6px 12px)'
              : 'repeating-linear-gradient(45deg, #C9BE9E 0 6px, #BDB18D 6px 12px)',
          }}/>
          <div style={{
            position: 'absolute', top: 8, left: 10,
            fontSize: 9, letterSpacing: '0.18em', color: faint,
            background: dark ? DOSSIER.darkBg : DOSSIER.paper,
            padding: '2px 6px',
          }}>EXHIBIT A — STILL FRAME</div>
          {/* viewfinder corners */}
          {[[8,8],[8,'auto'],['auto',8],['auto','auto']].map(([t,l],i)=>(
            <div key={i} style={{
              position:'absolute',
              top: t==='auto'?'auto':t, bottom: t==='auto'?8:'auto',
              left:l==='auto'?'auto':l, right:l==='auto'?8:'auto',
              width:14,height:14,
              borderTop: t==='auto'?'none':`2px solid ${accent}`,
              borderBottom: t==='auto'?`2px solid ${accent}`:'none',
              borderLeft: l==='auto'?'none':`2px solid ${accent}`,
              borderRight: l==='auto'?`2px solid ${accent}`:'none',
            }}/>
          ))}
        </div>

        {/* SUMMARY */}
        <div style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 14, lineHeight: 1.55, color: ink, marginBottom: 22 }}>
          A prose adaptation of <span style={{ background: dark ? '#000' : DOSSIER.ink, color: dark ? DOSSIER.ink : DOSSIER.paper, padding: '0 4px' }}>John&nbsp;Sayles</span>'s unproduced 2004 screenplay — twenty-two chapters, written in a grounded literary register. <i>This file does not contain the original screenplay text.</i>
        </div>

        {/* META TABLE */}
        <div style={{ borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${ink}`, padding: '10px 0', fontSize: 11, marginBottom: 22 }}>
          {[
            ['STATUS',    'ONGOING'],
            ['CHAPTERS',  '22'],
            ['LENGTH',    '47,995 W'],
            ['UPDATED',   'APR 24 / 2026'],
            ['CLASSIFIED','THRILLER · GENETIC HORROR'],
          ].map(([k,v],i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom: i<4?`1px dashed ${faint}66`:'none', letterSpacing:'0.08em' }}>
              <span style={{ color: faint }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          width:'100%', padding:'18px 14px',
          background: ink, color: dark ? DOSSIER.darkBg : DOSSIER.paper,
          border:'none', fontFamily:'"JetBrains Mono", monospace',
          fontSize: 13, fontWeight: 700, letterSpacing:'0.22em',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          cursor:'pointer',
        }}>
          <span>OPEN FILE</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>
        <div style={{ marginTop:8, fontSize:10, letterSpacing:'0.15em', color: faint, textAlign:'center' }}>
          RESUME: CH. 03 — THE NUBLAR DROP
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 1B — TABLE OF CONTENTS (chapter ledger)
// ---------------------------------------------------------------------
function DossierTOC({ dark }) {
  const ink = dark ? DOSSIER.darkInk : DOSSIER.ink;
  const faint = dark ? DOSSIER.darkFaint : DOSSIER.faint;
  const accent = dark ? DOSSIER.darkRed : DOSSIER.red;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg dark={dark}/>
      <div style={{ position:'relative', padding: '14px 22px 80px' }}>

        {/* HEADER */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 4, fontSize: 10, letterSpacing:'0.18em', color: faint }}>
          <span>← FILE 04-2026</span>
          <span>22 ENTRIES</span>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 32, letterSpacing:'-0.01em', margin:'8px 0 4px' }}>
          The Judas Strain
        </h2>
        <div style={{ fontSize: 11, letterSpacing:'0.2em', color: faint, marginBottom: 18 }}>
          INDEX · 22 OF 22 LOGGED
        </div>

        {/* PROGRESS METER */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize: 10, letterSpacing:'0.15em', marginBottom: 6, color: faint }}>
            <span>READ PROGRESS</span><span>11%</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(22, 1fr)', gap: 2 }}>
            {window.NOVEL.chapters.map((c, i) => {
              const state = c.read === 'completed' ? 'done' : c.read === 'in-progress' ? 'now' : 'todo';
              return (
                <div key={i} style={{
                  height: 14,
                  background: state==='done' ? ink : state==='now' ? accent : 'transparent',
                  border: `1px solid ${state==='todo' ? faint+'88' : ink}`,
                }}/>
              );
            })}
          </div>
        </div>

        {/* TAGS */}
        <div style={{ display:'flex', flexWrap:'wrap', gap: 6, marginBottom: 22 }}>
          {window.NOVEL.tags.map(t => (
            <span key={t} style={{
              fontSize: 9, letterSpacing:'0.15em', textTransform:'uppercase',
              padding: '3px 8px', border: `1px solid ${ink}`,
            }}>{t}</span>
          ))}
        </div>

        {/* CONTINUE READING ROW */}
        <div style={{
          border: `1px solid ${accent}`, padding: 12, marginBottom: 22,
          background: dark ? `${accent}15` : `${accent}10`,
          position:'relative',
        }}>
          <div style={{ position:'absolute', top:-9, left:10, background: dark?DOSSIER.darkBg:DOSSIER.paper, padding:'0 6px', fontSize:9, letterSpacing:'0.2em', color: accent, fontWeight:700 }}>
            ◉ ACTIVE
          </div>
          <div style={{ fontSize: 10, letterSpacing:'0.18em', color: faint }}>RESUME AT</div>
          <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize: 19, fontWeight: 600, margin:'2px 0 6px' }}>
            03 / The Nublar Drop
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize: 10, color: faint, letterSpacing:'0.1em' }}>
            <span>p. 1,432 / 2,456 W</span>
            <span>58% READ</span>
          </div>
        </div>

        {/* CHAPTER LIST */}
        <DossierLine dark={dark}/>
        {window.NOVEL.chapters.map((c, i) => {
          const state = c.read === 'completed' ? 'done' : c.read === 'in-progress' ? 'now' : 'todo';
          return (
            <div key={c.n} style={{ borderBottom: `1px dashed ${faint}55`, padding: '11px 0', display:'flex', alignItems:'center', gap: 12 }}>
              <div style={{
                width: 22, fontSize: 11, fontWeight: 700,
                color: state==='now' ? accent : state==='done' ? ink : faint,
              }}>
                {String(c.n).padStart(2,'0')}
              </div>
              <div style={{ flex:1 }}>
                <div style={{
                  fontFamily:'"Newsreader", Georgia, serif', fontSize: 16, fontWeight: 500,
                  color: state==='todo' ? faint : ink,
                  textDecoration: state==='done' ? `line-through ${faint}` : 'none',
                }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 9, letterSpacing:'0.12em', color: faint, marginTop: 2 }}>
                  {c.words.toLocaleString()} W · 2026.04.24
                </div>
              </div>
              <div style={{ width: 14, textAlign:'right', fontSize: 11, color: state==='now'?accent:faint }}>
                {state==='done' ? '✓' : state==='now' ? '●' : '·'}
              </div>
            </div>
          );
        })}

        {/* FOOTER */}
        <div style={{ marginTop: 22, fontSize:10, letterSpacing:'0.15em', color: faint, textAlign:'center' }}>
          ────  END OF INDEX  ────
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 1C — CHAPTER READER (typed memo)
// ---------------------------------------------------------------------
function DossierReader({ dark, settings, onTooltip, activeTooltip, onTypeMenu, typeMenuOpen }) {
  const ink = dark ? DOSSIER.darkInk : DOSSIER.ink;
  const faint = dark ? DOSSIER.darkFaint : DOSSIER.faint;
  const accent = dark ? DOSSIER.darkRed : DOSSIER.red;
  const blue = dark ? DOSSIER.darkAmber : DOSSIER.blue;
  const ch = window.NOVEL.sampleChapter;
  const fs = settings.fontSize;
  const lh = settings.lineHeight;

  const renderPara = (text, key) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{
        fontFamily:'"Newsreader", "Source Serif 4", Georgia, serif',
        fontSize: fs,
        lineHeight: lh,
        color: ink,
        margin: '0 0 1.1em',
        textWrap: 'pretty',
      }}>
        {parts.map((p, i) => {
          const m = p.match(/^\{\{(.+)\}\}$/);
          if (!m) return p;
          const term = m[1];
          return (
            <span key={i}
              onClick={() => onTooltip(term)}
              style={{
                color: blue, cursor: 'pointer', position: 'relative',
                textDecoration: `underline dotted ${blue}99`, textUnderlineOffset: 3,
                fontWeight: 500,
              }}>
              {term}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, paddingBottom: 80 }}>
      <DossierBg dark={dark}/>

      {/* TOP CHROME */}
      <div style={{ position:'sticky', top: 54, zIndex: 5,
        background: dark ? DOSSIER.darkBg+'EE' : DOSSIER.paper+'F2',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${ink}`,
        padding: '10px 18px', display:'flex', alignItems:'center', gap: 10,
        fontFamily:'"JetBrains Mono", monospace', fontSize: 10, letterSpacing:'0.15em',
      }}>
        <span style={{ color: faint }}>← INDEX</span>
        <div style={{ flex:1, textAlign:'center', color: ink, fontWeight: 700 }}>
          CH. {String(ch.n).padStart(2,'0')}
        </div>
        <button onClick={onTypeMenu} style={{
          background: typeMenuOpen ? ink : 'transparent',
          color: typeMenuOpen ? (dark?DOSSIER.darkBg:DOSSIER.paper) : ink,
          border: `1px solid ${ink}`, padding: '3px 8px',
          fontFamily:'inherit', fontSize: 10, letterSpacing:'0.15em', cursor:'pointer',
        }}>Aa</button>
      </div>

      {/* TYPE PANEL */}
      {typeMenuOpen && (
        <div style={{
          position: 'absolute', top: 110, right: 14, zIndex: 10,
          background: dark ? DOSSIER.darkPaper : DOSSIER.paper,
          border: `1.5px solid ${ink}`, padding: 14, width: 220,
          fontFamily:'"JetBrains Mono", monospace', fontSize: 11,
          boxShadow: dark?'none':'4px 4px 0 rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: 9, letterSpacing:'0.2em', color: faint, marginBottom: 10 }}>TYPE SETTINGS</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10 }}>
            <span>SIZE</span>
            <div style={{ display:'flex', gap: 4 }}>
              {['S','M','L','XL'].map(s=>(
                <span key={s} style={{
                  border:`1px solid ${ink}`, padding:'2px 7px',
                  background: s==='M'?ink:'transparent', color: s==='M'?(dark?DOSSIER.darkBg:DOSSIER.paper):ink,
                }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10 }}>
            <span>SPACE</span>
            <div style={{ display:'flex', gap: 4 }}>
              {['1','2','3'].map((s,i)=>(
                <span key={s} style={{
                  border:`1px solid ${ink}`, padding:'2px 7px',
                  background: i===1?ink:'transparent', color: i===1?(dark?DOSSIER.darkBg:DOSSIER.paper):ink,
                }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span>THEME</span>
            <div style={{ display:'flex', gap: 4 }}>
              <span style={{ width:18, height:18, background: DOSSIER.paper, border:`1px solid ${ink}` }}/>
              <span style={{ width:18, height:18, background: DOSSIER.darkBg, border:`1px solid ${ink}` }}/>
            </div>
          </div>
        </div>
      )}

      <div style={{ position:'relative', padding:'18px 22px 0' }}>
        {/* CHAPTER MARK */}
        <div style={{ display:'flex', alignItems:'baseline', gap: 12, marginBottom: 4, fontFamily:'"JetBrains Mono", monospace' }}>
          <span style={{ fontSize: 60, fontWeight: 700, color: ink, letterSpacing:'-0.04em', lineHeight:1 }}>03</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize: 9, letterSpacing:'0.22em', color: faint }}>CHAPTER</div>
            <div style={{ fontSize: 9, letterSpacing:'0.22em', color: accent, fontWeight:700 }}>SECTION I</div>
          </div>
        </div>
        <h1 style={{
          fontFamily:'"Newsreader", Georgia, serif', fontWeight: 600,
          fontSize: 30, letterSpacing:'-0.01em', lineHeight: 1.05,
          margin: '4px 0 18px',
        }}>{ch.title}</h1>

        <DossierLine dark={dark}/>

        {/* EPIGRAPH — typed memo */}
        <div style={{
          margin: '16px 0 26px', padding: 14,
          background: dark ? `${accent}10` : `${DOSSIER.ink}06`,
          borderLeft: `3px solid ${accent}`,
          fontFamily:'"JetBrains Mono", monospace', fontSize: 12, lineHeight: 1.55,
        }}>
          <div style={{ fontSize: 9, letterSpacing:'0.22em', color: faint, marginBottom: 6 }}>
            INTERCEPT · BRIEFING ROOM · 04:12
          </div>
          "{ch.epigraph.text}"
          <div style={{ fontSize: 10, color: faint, marginTop: 8 }}>{ch.epigraph.attribution}</div>
        </div>

        {/* PROSE */}
        {ch.paragraphs.map((p, i) => renderPara(p, i))}

        {/* PAGINATION */}
        <DossierLine dark={dark} dashed/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 0 4px', fontFamily:'"JetBrains Mono", monospace', fontSize: 10, letterSpacing:'0.18em' }}>
          <span style={{ color: faint }}>← CH 02</span>
          <span style={{ color: ink, fontWeight: 700 }}>03 / 22</span>
          <span style={{ color: ink }}>CH 04 →</span>
        </div>
      </div>

      {/* GLOSSARY TOOLTIP */}
      {activeTooltip && (
        <div onClick={() => onTooltip(null)} style={{
          position:'absolute', inset: 0, top: 94, zIndex: 20,
          display:'flex', alignItems:'flex-end',
        }}>
          <div style={{
            position:'absolute', inset: 0, top:0, background: dark ? '#000B' : '#0008',
          }}/>
          <div style={{
            position:'relative', width:'100%',
            background: dark ? DOSSIER.darkPaper : DOSSIER.paper2,
            borderTop: `2px solid ${blue}`,
            padding: '18px 22px 38px',
            fontFamily:'"JetBrains Mono", monospace',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10 }}>
              <span style={{ fontSize: 9, letterSpacing:'0.22em', color: blue, fontWeight:700 }}>
                GLOSSARY · {(window.NOVEL.glossary[activeTooltip]?.cat || '').toUpperCase()}
              </span>
              <button onClick={() => onTooltip(null)} style={{ background:'none', border:`1px solid ${ink}`, color: ink, padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>CLOSE ✕</button>
            </div>
            <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 24, margin:'0 0 8px', color: ink }}>
              {activeTooltip}
            </h3>
            <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize: 14, lineHeight: 1.55, color: ink, margin:0 }}>
              {window.NOVEL.glossary[activeTooltip]?.def}
            </p>
            <div style={{ marginTop: 14, fontSize:10, letterSpacing:'0.15em', color: faint }}>
              SEE FULL FILE → APPENDIX
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// 1D — GLOSSARY (appendix)
// ---------------------------------------------------------------------
function DossierGlossary({ dark }) {
  const ink = dark ? DOSSIER.darkInk : DOSSIER.ink;
  const faint = dark ? DOSSIER.darkFaint : DOSSIER.faint;
  const accent = dark ? DOSSIER.darkRed : DOSSIER.red;
  const blue = dark ? DOSSIER.darkAmber : DOSSIER.blue;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg dark={dark}/>
      <div style={{ position:'relative', padding:'14px 22px 80px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, letterSpacing:'0.18em', color: faint }}>
          <span>← FILE 04-2026</span>
          <span>APPENDIX-G</span>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:30, letterSpacing:'-0.01em', margin:'10px 0 4px' }}>
          Glossary
        </h2>
        <div style={{ fontSize:11, letterSpacing:'0.18em', color:faint, marginBottom: 16 }}>
          45 TERMS · 6 CATEGORIES
        </div>

        {/* SEARCH */}
        <div style={{
          display:'flex', alignItems:'center', gap: 8,
          border:`1.5px solid ${ink}`, padding:'10px 12px', marginBottom: 8,
        }}>
          <span style={{ color: faint, fontSize:12 }}>⌕</span>
          <span style={{ fontSize: 12, color: faint }}>filter terms…</span>
          <div style={{ flex:1 }}/>
          <span style={{ fontSize: 9, letterSpacing:'0.2em', color: faint }}>⌘K</span>
        </div>

        {/* CATEGORY CHIPS */}
        <div style={{ display:'flex', gap: 6, flexWrap:'wrap', marginBottom: 22 }}>
          {['ALL','CHARACTER','RAPTOR','CONCEPT','CREATURE','LOCATION','ORG'].map((c,i)=>(
            <span key={c} style={{
              fontSize: 9, letterSpacing:'0.18em',
              padding:'4px 9px', border:`1px solid ${ink}`,
              background: i===0 ? ink : 'transparent',
              color: i===0 ? (dark?DOSSIER.darkBg:DOSSIER.paper) : ink,
            }}>{c}</span>
          ))}
        </div>

        {window.NOVEL.glossaryFull.map((sec, si) => (
          <div key={si} style={{ marginBottom: 26 }}>
            <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 11, letterSpacing:'0.2em', fontWeight:700 }}>
                {sec.cat.toUpperCase()}
              </span>
              <div style={{ flex:1, borderTop:`1px dashed ${faint}` }}/>
              <span style={{ fontSize: 10, color: faint, letterSpacing:'0.15em' }}>
                {String(sec.terms.length).padStart(2,'0')}
              </span>
            </div>
            {sec.terms.map((t, ti) => (
              <div key={ti} style={{ borderBottom: `1px solid ${faint}33`, padding:'12px 0' }}>
                <div style={{ display:'flex', alignItems:'baseline', gap: 8 }}>
                  <span style={{
                    fontFamily:'"Newsreader", Georgia, serif', fontSize: 17, fontWeight: 600, color: ink,
                  }}>{t.name}</span>
                  {t.alias && (
                    <span style={{ fontSize: 9, letterSpacing:'0.15em', color: blue }}>
                      A.K.A. {t.alias.toUpperCase()}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize: 13, lineHeight: 1.5, color: ink, margin:'4px 0 0' }}>
                  {t.short}
                </p>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}

window.DOSSIER_DIR = { Cover: DossierCover, TOC: DossierTOC, Reader: DossierReader, Glossary: DossierGlossary };
