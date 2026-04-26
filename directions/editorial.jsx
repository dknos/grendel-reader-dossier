// =====================================================================
// DIRECTION 2: EDITORIAL LITERARY
// Magazine-grade typography. Heavy display serif, refined body serif,
// generous whitespace, photo-led full-bleed. Quiet luxury.
// Palette: paper #F4F0E8, ink #161514, accent oxblood #6E1F1A, gilt #B68C3E
// Dark: deep #14110D, paper #E9DFC8 ink, oxblood accent
// =====================================================================

const ED = {
  paper:  '#F3EFE5',
  paper2: '#EAE3D2',
  ink:    '#15130F',
  ink2:   '#3A352B',
  faint:  '#807565',
  ox:     '#6E1F1A',
  gilt:   '#9C7A2E',

  darkBg:    '#13110D',
  darkPaper: '#1B1813',
  darkInk:   '#E9DFC8',
  darkFaint: '#7E7460',
  darkOx:    '#C56C44',
  darkGilt:  '#D4A24A',
};

function EdBg({ dark, full }) {
  return (
    <div style={{
      position:'absolute', inset:0,
      background: dark ? ED.darkBg : ED.paper,
    }}>
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:dark?0.18:0.08, mixBlendMode:dark?'screen':'multiply', pointerEvents:'none'}}>
        <filter id="edgrain"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="2"/></filter>
        <rect width="100%" height="100%" filter="url(#edgrain)"/>
      </svg>
    </div>
  );
}

// Placeholder photo block — striped cinematic still
function EdPlate({ height, label, dark, accentHue = 20 }) {
  return (
    <div style={{
      position:'relative', height, overflow:'hidden',
      background: dark
        ? `linear-gradient(180deg, hsl(${accentHue},20%,12%) 0%, hsl(${accentHue},25%,6%) 100%)`
        : `linear-gradient(180deg, hsl(${accentHue},25%,30%) 0%, hsl(${accentHue},30%,14%) 100%)`,
    }}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 26px)`,
      }}/>
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(ellipse 60% 50% at 50% 60%, transparent 0%, ${dark?'#000B':'#0009'} 100%)`,
      }}/>
      <div style={{
        position:'absolute', bottom: 12, left: 14, right: 14,
        fontFamily:'"GT America Mono", "JetBrains Mono", monospace',
        fontSize: 9, letterSpacing:'0.2em', color:'#F4F0E8AA',
        display:'flex', justifyContent:'space-between',
      }}>
        <span>{label}</span><span>—</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2A — COVER
// ---------------------------------------------------------------------
function EdCover({ dark }) {
  const ink = dark ? ED.darkInk : ED.ink;
  const faint = dark ? ED.darkFaint : ED.faint;
  const ox = dark ? ED.darkOx : ED.ox;
  const gilt = dark ? ED.darkGilt : ED.gilt;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, paddingBottom: 60 }}>
      <EdBg dark={dark}/>
      <div style={{ position:'relative' }}>
        {/* Masthead */}
        <div style={{ padding:'14px 22px 6px', display:'flex', justifyContent:'space-between', alignItems:'baseline', borderBottom: `1px solid ${ink}33` }}>
          <span style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em', textTransform:'uppercase' }}>
            drivenemo / vol I
          </span>
          <span style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em', color: faint }}>№ 04
          </span>
        </div>

        {/* Hero plate */}
        <div style={{ position:'relative' }}>
          <EdPlate height={420} label="STILL · ISLA NUBLAR · 04:12" dark={dark} accentHue={dark?12:20}/>
          {/* huge title overprint */}
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'22px 22px 28px' }}>
            <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.3em', color:'#F4F0E8CC', marginBottom: 14 }}>
              A NOVEL · 22 CHAPTERS
            </div>
            <h1 style={{
              fontFamily: '"Recoleta", "Playfair Display", "Source Serif 4", Georgia, serif',
              fontWeight: 500, fontStyle:'italic',
              fontSize: 64, lineHeight: 0.92, letterSpacing:'-0.025em',
              margin: 0, color:'#F4F0E8',
            }}>
              The Judas<br/>Strain<span style={{ color: gilt, fontStyle:'normal' }}>.</span>
            </h1>
          </div>
        </div>

        {/* Byline strip */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 22px', borderBottom:`1px solid ${ink}22` }}>
          <div>
            <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: faint }}>WRITTEN BY</div>
            <div style={{ fontFamily:'"Recoleta", "Playfair Display", Georgia, serif', fontSize: 18, fontStyle:'italic', fontWeight: 500 }}>drivenemo</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: faint }}>AFTER</div>
            <div style={{ fontFamily:'"Recoleta", "Playfair Display", Georgia, serif', fontSize: 14, fontStyle:'italic' }}>John Sayles, 2004</div>
          </div>
        </div>

        {/* Pull quote */}
        <div style={{ padding:'34px 28px 14px' }}>
          <div style={{ fontSize: 80, lineHeight: 0.6, color: ox, fontFamily:'"Recoleta", Georgia, serif', fontStyle:'italic' }}>“</div>
          <p style={{
            fontFamily:'"Recoleta", "Playfair Display", Georgia, serif',
            fontWeight: 400, fontStyle:'italic',
            fontSize: 22, lineHeight: 1.25, letterSpacing:'-0.01em',
            color: ink, margin: '0 0 14px', textWrap:'balance',
          }}>
            There is no animal on this island that wants you alive. Don't make it personal.
          </p>
          <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.2em', color: faint }}>
            — Captain Jeb Overton
          </div>
        </div>

        {/* Inline meta */}
        <div style={{ padding:'14px 22px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12, borderTop:`1px solid ${ink}22`, borderBottom:`1px solid ${ink}22`, margin:'0 0 24px' }}>
          {[
            ['LENGTH','47,995 W'],
            ['CHAPTERS','22'],
            ['UPDATED','APR · 26'],
          ].map(([k,v])=>(
            <div key={k}>
              <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.22em', color: faint, marginBottom:2 }}>{k}</div>
              <div style={{ fontFamily:'"Recoleta", "Playfair Display", Georgia, serif', fontSize: 16, fontWeight:500 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding:'0 22px' }}>
          <button style={{
            width:'100%', padding:'18px 18px', border:`1.5px solid ${ink}`,
            background: ink, color: dark?ED.darkBg:ED.paper,
            display:'flex', alignItems:'center', justifyContent:'space-between',
            fontFamily:'"GT America Mono", monospace', fontSize: 12, letterSpacing:'0.25em',
            cursor:'pointer',
          }}>
            <span>BEGIN READING</span>
            <span>↗</span>
          </button>
          <button style={{
            width:'100%', marginTop: 10, padding:'16px 18px', border:`1px solid ${ink}66`,
            background:'transparent', color: ink,
            display:'flex', alignItems:'center', justifyContent:'space-between',
            fontFamily:'"GT America Mono", monospace', fontSize: 12, letterSpacing:'0.25em',
            cursor:'pointer',
          }}>
            <span>RESUME — CH. 03</span>
            <span style={{ color: ox }}>58%</span>
          </button>
        </div>

        {/* Tags */}
        <div style={{ padding:'24px 22px 0', display:'flex', gap: 10, flexWrap:'wrap' }}>
          {window.NOVEL.tags.map(t=>(
            <span key={t} style={{
              fontFamily:'"Recoleta", "Playfair Display", Georgia, serif', fontStyle:'italic',
              fontSize: 13, color: ox,
            }}>· {t}</span>
          ))}
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2B — TOC
// ---------------------------------------------------------------------
function EdTOC({ dark }) {
  const ink = dark ? ED.darkInk : ED.ink;
  const faint = dark ? ED.darkFaint : ED.faint;
  const ox = dark ? ED.darkOx : ED.ox;
  const gilt = dark ? ED.darkGilt : ED.gilt;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, paddingBottom: 60 }}>
      <EdBg dark={dark}/>
      <div style={{ position:'relative', padding:'18px 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em', color: faint, marginBottom: 22 }}>
          <span>← COVER</span>
          <span>CONTENTS</span>
        </div>

        <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.3em', color: faint }}>VOLUME ONE</div>
        <h1 style={{
          fontFamily:'"Recoleta", "Playfair Display", Georgia, serif',
          fontWeight: 500, fontStyle:'italic',
          fontSize: 52, lineHeight: 0.95, letterSpacing:'-0.02em',
          margin: '4px 0 6px',
        }}>
          Contents<span style={{ color: gilt }}>.</span>
        </h1>
        <p style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontSize: 16, fontStyle:'italic', color: faint, margin:'0 0 28px', maxWidth: 280 }}>
          Twenty-two chapters, in three movements.
        </p>

        {/* Continue */}
        <div style={{
          position:'relative', padding:'18px 18px',
          background: dark ? `${ox}18` : `${ox}0E`,
          border: `1px solid ${ox}44`, marginBottom: 28,
        }}>
          <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: ox }}>CONTINUE READING</div>
          <div style={{
            fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
            fontWeight: 500, fontStyle:'italic', fontSize: 26, lineHeight: 1.05,
            margin:'4px 0 10px', letterSpacing:'-0.015em',
          }}>The Nublar Drop</div>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <div style={{ flex:1, height:2, background: faint+'33', position:'relative' }}>
              <div style={{ position:'absolute', inset:0, width:'58%', background: ox }}/>
            </div>
            <span style={{ fontFamily:'"GT America Mono", monospace', fontSize:10, color: ox, letterSpacing:'0.15em' }}>58%</span>
          </div>
        </div>

        {/* Movement headers + chapters */}
        {[
          { mvmt: 'I', title: 'The Saturday Error', range: [1,7] },
          { mvmt: 'II', title: 'The Conversation of Death', range: [8,15] },
          { mvmt: 'III', title: 'The Broken Leash', range: [16,22] },
        ].map((mvmt, mi) => (
          <div key={mi} style={{ marginBottom: 30 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 14, marginBottom: 14 }}>
              <span style={{
                fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
                fontStyle:'italic', fontWeight: 500,
                fontSize: 26, color: ox,
              }}>{mvmt.mvmt}</span>
              <span style={{
                fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em', color: faint,
              }}>MOVEMENT</span>
              <div style={{ flex:1, borderTop: `1px solid ${ink}33` }}/>
            </div>
            {window.NOVEL.chapters.slice(mvmt.range[0]-1, mvmt.range[1]).map(c => {
              const state = c.read === 'completed' ? 'done' : c.read === 'in-progress' ? 'now' : 'todo';
              return (
                <div key={c.n} style={{ display:'flex', alignItems:'baseline', gap: 12, padding:'10px 0' }}>
                  <span style={{
                    fontFamily:'"GT America Mono", monospace', fontSize:10, color: faint, width: 22, letterSpacing:'0.1em',
                  }}>{String(c.n).padStart(2,'0')}</span>
                  <span style={{
                    fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
                    fontWeight: state==='now'?500:400,
                    fontStyle: state==='done'?'normal':'italic',
                    fontSize: 19, color: state==='todo'?faint:ink,
                    letterSpacing:'-0.01em', flex:1,
                    textDecoration: state==='done' ? `line-through ${faint}` : 'none',
                  }}>{c.title}</span>
                  {state==='now' && <span style={{ color: ox, fontSize: 12 }}>●</span>}
                  {state==='done' && <span style={{ color: faint, fontSize: 12 }}>✓</span>}
                </div>
              );
            })}
          </div>
        ))}

        <div style={{ textAlign:'center', fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', color: faint, fontSize: 22 }}>
          ✦
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2C — READER
// ---------------------------------------------------------------------
function EdReader({ dark, settings, onTooltip, activeTooltip, onTypeMenu, typeMenuOpen }) {
  const ink = dark ? ED.darkInk : ED.ink;
  const faint = dark ? ED.darkFaint : ED.faint;
  const ox = dark ? ED.darkOx : ED.ox;
  const gilt = dark ? ED.darkGilt : ED.gilt;
  const ch = window.NOVEL.sampleChapter;
  const fs = settings.fontSize;
  const lh = settings.lineHeight;

  const renderPara = (text, key, isFirst) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    let firstChar = null;
    let body = parts;
    if (isFirst) {
      const first = parts[0];
      firstChar = first[0];
      parts[0] = first.slice(1);
    }
    return (
      <p key={key} style={{
        fontFamily:'"Source Serif 4", "Recoleta", Georgia, serif',
        fontSize: fs,
        lineHeight: lh,
        color: ink,
        margin: '0 0 1.2em',
        textWrap:'pretty',
        textAlign:'left',
      }}>
        {firstChar && (
          <span style={{
            float:'left',
            fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
            fontWeight: 500, fontStyle:'italic',
            fontSize: 76, lineHeight: 0.85,
            marginRight: 8, marginTop: 4, marginBottom: -4,
            color: ox,
          }}>{firstChar}</span>
        )}
        {body.map((p, i) => {
          const m = p.match(/^\{\{(.+)\}\}$/);
          if (!m) return p;
          const term = m[1];
          return (
            <span key={i} onClick={() => onTooltip(term)} style={{
              borderBottom: `1px solid ${gilt}AA`, color: ink, cursor:'pointer',
              padding:'0 1px',
            }}>{term}</span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, paddingBottom: 80 }}>
      <EdBg dark={dark}/>

      {/* TOP NAV — minimal */}
      <div style={{
        position:'sticky', top:54, zIndex: 5,
        background: dark ? ED.darkBg+'EE' : ED.paper+'EE',
        backdropFilter:'blur(8px)',
        padding:'12px 22px', display:'flex', alignItems:'center', justifyContent:'space-between',
        fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em',
      }}>
        <span style={{ color: faint }}>← contents</span>
        {/* progress dots */}
        <div style={{ display:'flex', gap: 3 }}>
          {[...Array(22)].map((_,i)=>(
            <div key={i} style={{
              width: 4, height: 4, borderRadius: 99,
              background: i<2 ? ink : i===2 ? ox : faint+'55',
            }}/>
          ))}
        </div>
        <button onClick={onTypeMenu} style={{
          background:'transparent', border:'none', color: typeMenuOpen?ox:ink,
          fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
          fontStyle:'italic', fontSize: 18, cursor:'pointer',
        }}>Aa</button>
      </div>

      {/* TYPE PANEL */}
      {typeMenuOpen && (
        <div style={{
          position:'absolute', top: 110, right: 14, zIndex: 10,
          width: 220, padding: 18,
          background: dark ? ED.darkPaper : ED.paper2,
          border: `1px solid ${ink}33`,
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        }}>
          <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: faint, marginBottom: 14 }}>READING</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', fontSize: 14, marginBottom: 6 }}>Type size</div>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <span style={{ fontFamily:'"Source Serif 4",Georgia,serif', fontSize: 12 }}>A</span>
              <div style={{ flex:1, height:2, background:faint+'33', position:'relative' }}>
                <div style={{ position:'absolute', left:0, top:-5, width:12, height:12, borderRadius:99, background: ox, transform:'translateX(60px)' }}/>
              </div>
              <span style={{ fontFamily:'"Source Serif 4",Georgia,serif', fontSize: 22 }}>A</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', fontSize: 14, marginBottom: 8 }}>Theme</div>
            <div style={{ display:'flex', gap: 8 }}>
              {[ED.paper, ED.paper2, ED.darkPaper, ED.darkBg].map((c,i)=>(
                <div key={i} style={{
                  width: 32, height: 32, background: c,
                  border: `1px solid ${ink}33`,
                  outline: i===0 ? `2px solid ${ox}` : 'none', outlineOffset:2,
                }}/>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', fontSize: 14, marginBottom: 8 }}>Font</div>
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              <div style={{ fontFamily:'"Source Serif 4",Georgia,serif', fontSize: 14 }}>Source Serif <span style={{ color: ox, fontFamily:'monospace', fontSize: 10 }}>● ON</span></div>
              <div style={{ fontFamily:'Georgia,serif', fontSize: 14, color: faint }}>Georgia</div>
              <div style={{ fontFamily:'system-ui,sans-serif', fontSize: 14, color: faint }}>System Sans</div>
            </div>
          </div>
        </div>
      )}

      {/* Hero plate */}
      <EdPlate height={240} label="STILL · CH. 03" dark={dark} accentHue={dark?20:30}/>

      {/* Title block */}
      <div style={{ padding:'30px 22px 0', position:'relative' }}>
        <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.3em', color: ox, marginBottom: 10 }}>
          CHAPTER · 03
        </div>
        <h1 style={{
          fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
          fontWeight: 500, fontStyle:'italic',
          fontSize: 44, lineHeight: 0.95, letterSpacing:'-0.025em',
          margin:'0 0 22px',
        }}>
          The Nublar<br/>Drop<span style={{ color: gilt }}>.</span>
        </h1>

        {/* epigraph */}
        <div style={{
          borderLeft:`2px solid ${ox}`, paddingLeft: 14, margin:'0 0 26px',
        }}>
          <p style={{
            fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
            fontStyle:'italic', fontWeight: 400,
            fontSize: 16, lineHeight: 1.4, color: ink, margin: 0,
          }}>{ch.epigraph.text}</p>
          <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.2em', color: faint, marginTop: 8 }}>
            — captain jeb overton
          </div>
        </div>

        {ch.paragraphs.map((p, i) => renderPara(p, i, i===0))}

        {/* End mark */}
        <div style={{ textAlign:'center', fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', color: gilt, fontSize: 28, margin:'24px 0 8px' }}>✦</div>

        {/* footer nav */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: 18, borderTop:`1px solid ${ink}22` }}>
          <div>
            <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: faint }}>NEXT</div>
            <div style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', fontSize: 18 }}>The Diggers</div>
          </div>
          <div style={{
            fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontStyle:'italic', fontSize: 18, color: ox,
          }}>→</div>
        </div>
      </div>

      {/* Tooltip */}
      {activeTooltip && (
        <div onClick={() => onTooltip(null)} style={{
          position:'absolute', inset:0, top: 54, zIndex: 20,
          display:'flex', alignItems:'flex-end',
          background: dark?'#000A':'#0006',
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%',
            background: dark ? ED.darkPaper : ED.paper2,
            borderTop:`3px solid ${gilt}`,
            padding:'24px 24px 38px',
          }}>
            <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.25em', color: gilt, marginBottom: 10 }}>
              GLOSSARY · {(window.NOVEL.glossary[activeTooltip]?.cat||'').toUpperCase()}
            </div>
            <h3 style={{
              fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
              fontStyle:'italic', fontWeight: 500,
              fontSize: 30, lineHeight: 1, letterSpacing:'-0.02em',
              margin:'0 0 12px',
            }}>{activeTooltip}<span style={{color:ox}}>.</span></h3>
            <p style={{
              fontFamily:'"Source Serif 4",Georgia,serif',
              fontSize: 14, lineHeight: 1.55, color: ink, margin: 0,
            }}>{window.NOVEL.glossary[activeTooltip]?.def}</p>
            <button onClick={()=>onTooltip(null)} style={{
              marginTop: 18, padding:'10px 14px',
              background:'transparent', border:`1px solid ${ink}55`, color: ink,
              fontFamily:'"GT America Mono", monospace', fontSize:10, letterSpacing:'0.25em', cursor:'pointer',
            }}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// 2D — GLOSSARY
// ---------------------------------------------------------------------
function EdGlossary({ dark }) {
  const ink = dark ? ED.darkInk : ED.ink;
  const faint = dark ? ED.darkFaint : ED.faint;
  const ox = dark ? ED.darkOx : ED.ox;
  const gilt = dark ? ED.darkGilt : ED.gilt;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: ink, paddingBottom: 60 }}>
      <EdBg dark={dark}/>
      <div style={{ position:'relative', padding:'18px 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.25em', color: faint, marginBottom: 22 }}>
          <span>← CONTENTS</span>
          <span>APPENDIX</span>
        </div>
        <div style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.3em', color: faint }}>BACKMATTER</div>
        <h1 style={{
          fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
          fontWeight: 500, fontStyle:'italic',
          fontSize: 52, lineHeight: 0.95, letterSpacing:'-0.02em',
          margin: '4px 0 6px',
        }}>Glossary<span style={{ color: gilt }}>.</span></h1>
        <p style={{ fontFamily:'"Recoleta","Playfair Display",Georgia,serif', fontSize: 16, fontStyle:'italic', color: faint, margin:'0 0 26px' }}>
          Forty-five terms across six categories.
        </p>

        {/* search */}
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'12px 14px', borderBottom:`1px solid ${ink}55`,
          marginBottom: 22,
        }}>
          <span style={{ color: faint, fontSize:14 }}>⌕</span>
          <span style={{
            fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
            fontStyle:'italic', fontSize: 16, color: faint,
          }}>filter terms…</span>
        </div>

        {window.NOVEL.glossaryFull.map((sec, si) => (
          <div key={si} style={{ marginBottom: 32 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 14, marginBottom: 14 }}>
              <h3 style={{
                fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
                fontWeight: 500, fontStyle:'italic',
                fontSize: 26, letterSpacing:'-0.015em', margin: 0, color: ink,
              }}>{sec.cat}<span style={{ color: ox }}>.</span></h3>
              <div style={{ flex:1, borderTop: `1px solid ${ink}33` }}/>
              <span style={{ fontFamily:'"GT America Mono", monospace', fontSize: 10, letterSpacing:'0.2em', color: faint }}>
                {sec.terms.length} ENTRIES
              </span>
            </div>
            {sec.terms.map((t, ti) => (
              <div key={ti} style={{ padding:'12px 0', borderBottom:`1px solid ${ink}18` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 4 }}>
                  <span style={{
                    fontFamily:'"Recoleta","Playfair Display",Georgia,serif',
                    fontStyle:'italic', fontWeight: 500, fontSize: 20, letterSpacing:'-0.01em', color: ink,
                  }}>{t.name}</span>
                  {t.alias && (
                    <span style={{ fontFamily:'"GT America Mono", monospace', fontSize: 9, letterSpacing:'0.18em', color: gilt }}>
                      {t.alias.toUpperCase()}
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily:'"Source Serif 4",Georgia,serif',
                  fontSize: 13.5, lineHeight: 1.5, color: ink, margin: 0,
                }}>{t.short}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

window.ED_DIR = { Cover: EdCover, TOC: EdTOC, Reader: EdReader, Glossary: EdGlossary };
