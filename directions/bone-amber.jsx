// =====================================================================
// DIRECTION 3: BONE & AMBER
// Natural-history field journal. Warm parchment, ink illustrations, 
// catalog numbering, hand-stitched binding.
// Palette: amber #E8D6A8, ink #1F1A12, deep red #7A2218, sap-green #4A5524
// Dark: dusk #1A140C, lamplight amber accents
// =====================================================================

const BA = {
  paper:   '#E9D7AB',
  paper2:  '#DCC78F',
  ink:     '#1E1A12',
  ink2:    '#3A2E1E',
  faint:   '#8B7948',
  red:     '#7A2218',
  green:   '#4A5524',
  amber:   '#C77A1F',

  darkBg:    '#15110A',
  darkPaper: '#1F1A11',
  darkInk:   '#E0C786',
  darkFaint: '#7A6537',
  darkRed:   '#D24A2C',
  darkAmber: '#E5A33A',
};

function BaBg({ dark }) {
  return (
    <div style={{ position:'absolute', inset:0, background: dark ? BA.darkBg : BA.paper, overflow:'hidden' }}>
      {/* speckled foxing */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity: dark?0.25:0.15, mixBlendMode: dark?'screen':'multiply' }}>
        <filter id="bgrain"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" seed="6"/><feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.4  0 0 0 0 0.1  0 0 0 1 0"/></filter>
        <rect width="100%" height="100%" filter="url(#bgrain)"/>
      </svg>
      {/* edge vignette */}
      <div style={{ position:'absolute', inset:0, background: dark
        ? 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)'
        : 'radial-gradient(ellipse at center, transparent 60%, rgba(120,80,30,0.18) 100%)'
      }}/>
    </div>
  );
}

function BaRule({ dark, double }) {
  const c = dark ? BA.darkFaint : BA.faint;
  if (double) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:2, margin:'8px 0' }}>
        <div style={{ height:1, background: c }}/>
        <div style={{ height:1, background: c, opacity:0.5 }}/>
      </div>
    );
  }
  return <div style={{ height:1, background: c+'55' }}/>;
}

// hand-drawn-ish raptor silhouette (geometric — not real anatomy)
function BaIcon({ size = 60, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ display:'block' }}>
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 38 Q14 22 26 22 L34 18 L40 22 Q46 24 50 28 L52 32 L48 32 L48 36 L44 38 L42 36 L40 40 L38 38 L34 42 L34 46 L32 46 L32 42 L26 44 L20 44 L18 42 L14 44 L12 42 L10 44 L8 42 Z"/>
        <circle cx="42" cy="26" r="0.8" fill={color}/>
        <path d="M40 22 L46 18"/>
        <path d="M14 44 L12 50 M18 42 L18 50 M26 44 L26 52 M32 46 L32 54"/>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------
// 3A — COVER
// ---------------------------------------------------------------------
function BaCover({ dark }) {
  const ink = dark ? BA.darkInk : BA.ink;
  const faint = dark ? BA.darkFaint : BA.faint;
  const red = dark ? BA.darkRed : BA.red;
  const amber = dark ? BA.darkAmber : BA.amber;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop:54, color: ink, paddingBottom: 60 }}>
      <BaBg dark={dark}/>
      <div style={{ position:'relative', padding:'24px 28px' }}>

        {/* Top imprint */}
        <div style={{ textAlign:'center', marginBottom: 14 }}>
          <div style={{ fontFamily:'"IM Fell English",serif', fontSize:11, letterSpacing:'0.4em', color: faint }}>
            DRIVENEMO · MONOGRAPH
          </div>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap: 10, marginTop: 6 }}>
            <div style={{ flex:1, height:1, background: ink+'55' }}/>
            <span style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 12, color: faint }}>vol. I</span>
            <div style={{ flex:1, height:1, background: ink+'55' }}/>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign:'center', marginBottom: 22 }}>
          <div style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 16, color: red, marginBottom: 4 }}>
            being an account of
          </div>
          <h1 style={{
            fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif',
            fontWeight: 400, fontSize: 56, lineHeight: 0.95, letterSpacing:'0.005em',
            margin: '0 0 6px', color: ink,
          }}>
            The Judas<br/>Strain
          </h1>
          <div style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 14, color: BA.ink2 }}>
            <i>or,</i> The Field Notes of <span style={{ color: red }}>N. Harris</span>
          </div>
        </div>

        {/* Plate frame — illustrated specimen */}
        <div style={{
          position:'relative', height: 280,
          padding: 6, marginBottom: 22,
          background: dark?BA.darkPaper:BA.paper2,
          border:`1px double ${ink}`,
        }}>
          <div style={{
            position:'absolute', inset: 6,
            background: dark
              ? 'radial-gradient(ellipse at 50% 40%, #2A2418 0%, #15110A 100%)'
              : 'radial-gradient(ellipse at 50% 40%, #D9C58A 0%, #B89E5C 100%)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{
              transform:'scale(2.6)', opacity: dark?0.85:0.7,
              filter: dark?'drop-shadow(0 0 6px rgba(229,163,58,0.4))':'none',
            }}>
              <BaIcon size={80} color={dark?BA.darkAmber:BA.ink2}/>
            </div>
          </div>
          {/* corner labels */}
          <div style={{ position:'absolute', top: 12, left: 14, fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 11, color: dark?BA.darkAmber:BA.ink, background: dark?BA.darkPaper:BA.paper2, padding:'2px 6px' }}>
            Pl. I
          </div>
          <div style={{ position:'absolute', bottom: 12, right: 14, fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 11, color: dark?BA.darkAmber:BA.ink, background: dark?BA.darkPaper:BA.paper2, padding:'2px 6px' }}>
            <i>Deinonychus draxi</i>
          </div>
        </div>

        {/* species label card */}
        <div style={{
          textAlign:'center', padding:'12px 18px', marginBottom: 22,
          border: `1px solid ${ink}66`, borderLeft:'none', borderRight:'none',
        }}>
          <div style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 15, color: ink }}>
            "engraved from life on the heights of <span style={{ color: red }}>Grendel Castle</span>,<br/>this two-and-twentieth of April"
          </div>
        </div>

        {/* Catalog table */}
        <div style={{ marginBottom: 26, fontFamily:'"IM Fell English",serif' }}>
          <BaRule dark={dark} double/>
          {[
            ['CHAPTERS', '22'],
            ['LEAVES',   '47,995 W'],
            ['STATE',    'In progress'],
            ['IMPRINT',  'Apr. mmxxvi'],
          ].map(([k,v],i)=>(
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'6px 4px', borderBottom: i<3?`1px dotted ${faint}`:'none', fontSize: 13 }}>
              <span style={{ fontStyle:'italic', color: faint }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <BaRule dark={dark} double/>
        </div>

        {/* CTA — wax seal style */}
        <button style={{
          width:'100%', padding:'16px 18px', cursor:'pointer',
          background: red, color: BA.paper, border:`1px solid ${ink}`,
          fontFamily:'"IM Fell English",serif', fontSize: 16, fontStyle:'italic',
          letterSpacing:'0.06em',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          boxShadow: '2px 2px 0 ' + ink,
        }}>
          <span>Open the volume</span>
          <span style={{ fontSize: 22 }}>❦</span>
        </button>
        <div style={{ textAlign:'center', marginTop: 12, fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 13, color: faint }}>
          last leaf marked: ch. iii, line 14
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 3B — TOC
// ---------------------------------------------------------------------
function BaTOC({ dark }) {
  const ink = dark ? BA.darkInk : BA.ink;
  const faint = dark ? BA.darkFaint : BA.faint;
  const red = dark ? BA.darkRed : BA.red;
  const amber = dark ? BA.darkAmber : BA.amber;
  const roman = (n) => {
    const map = [['x',10],['ix',9],['v',5],['iv',4],['i',1]];
    let s = ''; let v = n;
    map.forEach(([r,n2])=>{ while(v>=n2){s+=r; v-=n2;} });
    return s;
  };
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop:54, color: ink, paddingBottom: 60 }}>
      <BaBg dark={dark}/>
      <div style={{ position:'relative', padding:'18px 28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize:13, color: faint, marginBottom: 12 }}>
          <span>← cover</span>
          <span>fol. ii</span>
        </div>

        <h2 style={{
          fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif',
          fontWeight: 400, fontSize: 48, lineHeight: 0.95,
          textAlign:'center', margin:'10px 0 4px',
        }}>Contents</h2>
        <div style={{ textAlign:'center', fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 14, color: faint, marginBottom: 18 }}>
          a chronicle in xxii chapters
        </div>
        <BaRule dark={dark} double/>

        {/* Reading bookmark — ribbon */}
        <div style={{
          position:'relative', margin:'20px -8px',
          background: red, color: BA.paper,
          padding:'14px 18px',
          fontFamily:'"IM Fell English",serif',
        }}>
          <div style={{
            position:'absolute', right: -8, top: 0,
            width:0, height:0,
            borderTop:`8px solid ${dark?BA.darkBg:BA.paper}`,
            borderLeft:`8px solid ${red}`,
          }}/>
          <div style={{
            position:'absolute', right: -8, bottom: 0,
            width:0, height:0,
            borderBottom:`8px solid ${dark?BA.darkBg:BA.paper}`,
            borderLeft:`8px solid ${red}`,
          }}/>
          <div style={{ fontStyle:'italic', fontSize: 12, opacity: 0.85 }}>your bookmark rests at</div>
          <div style={{ fontSize: 22, marginTop: 2 }}>iii. The Nublar Drop</div>
          <div style={{ fontSize: 12, fontStyle:'italic', marginTop: 4 }}>line 14 of 168 — 58 pp.</div>
        </div>

        {/* Chapter list — leaders */}
        <div style={{ fontFamily:'"IM Fell English",serif', marginTop: 18 }}>
          {window.NOVEL.chapters.map(c => {
            const state = c.read === 'completed' ? 'done' : c.read === 'in-progress' ? 'now' : 'todo';
            return (
              <div key={c.n} style={{
                display:'flex', alignItems:'baseline', gap: 6,
                padding:'9px 0',
                color: state==='todo' ? faint : ink,
              }}>
                <span style={{ width: 28, fontStyle:'italic', fontSize:13, color: state==='now'?red:faint, textAlign:'right' }}>
                  {roman(c.n)}.
                </span>
                <span style={{
                  fontSize: 17,
                  textDecoration: state==='done' ? `line-through ${faint}` : 'none',
                  fontWeight: state==='now'?500:400,
                }}>{c.title}</span>
                <span style={{
                  flex:1, borderBottom: `1px dotted ${faint}88`,
                  margin:'0 6px', transform:'translateY(-4px)',
                }}/>
                <span style={{ fontSize: 13, color: state==='now'?red:faint, fontStyle:'italic' }}>
                  {state==='done' ? '✓' : state==='now' ? '●' : (c.n*7).toString().padStart(3,'0')}
                </span>
              </div>
            );
          })}
        </div>

        {/* tail ornament */}
        <div style={{ textAlign:'center', marginTop: 24, fontFamily:'"IM Fell English",serif', fontSize: 22, color: red }}>
          ❦ &nbsp; ✦ &nbsp; ❦
        </div>
        <div style={{ textAlign:'center', marginTop: 8, fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 12, color: faint }}>
          — finis indicis —
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 3C — READER
// ---------------------------------------------------------------------
function BaReader({ dark, settings, onTooltip, activeTooltip, onTypeMenu, typeMenuOpen }) {
  const ink = dark ? BA.darkInk : BA.ink;
  const faint = dark ? BA.darkFaint : BA.faint;
  const red = dark ? BA.darkRed : BA.red;
  const amber = dark ? BA.darkAmber : BA.amber;
  const ch = window.NOVEL.sampleChapter;
  const fs = settings.fontSize;
  const lh = settings.lineHeight;

  const renderPara = (text, key, isFirst) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{
        fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif',
        fontSize: fs,
        lineHeight: lh,
        color: ink,
        margin: '0 0 1em',
        textIndent: isFirst ? 0 : '1.5em',
        textAlign:'justify',
        hyphens:'auto',
      }}>
        {parts.map((p, i) => {
          if (i===0 && isFirst && parts.length) {
            const m = p.match(/^\{\{(.+)\}\}$/);
            if (!m) {
              return (
                <span key={i}>
                  <span style={{ fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif', fontVariant:'small-caps', letterSpacing:'0.04em', fontWeight: 600 }}>
                    {p.slice(0, p.indexOf(' ', 2)).toLowerCase()}
                  </span>
                  {p.slice(p.indexOf(' ', 2))}
                </span>
              );
            }
          }
          const m = p.match(/^\{\{(.+)\}\}$/);
          if (!m) return p;
          const term = m[1];
          return (
            <span key={i} onClick={() => onTooltip(term)} style={{
              fontStyle:'italic', color: red, cursor:'pointer',
              borderBottom: `1px dotted ${red}88`,
            }}>{term}</span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop:54, color: ink, paddingBottom: 80 }}>
      <BaBg dark={dark}/>

      {/* Top chrome */}
      <div style={{
        position:'sticky', top: 54, zIndex: 5,
        background: dark? BA.darkBg+'EE' : BA.paper+'F0',
        backdropFilter:'blur(8px)',
        padding:'10px 22px', display:'flex', alignItems:'center', justifyContent:'space-between',
        fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 14,
        borderBottom: `1px solid ${ink}33`,
      }}>
        <span style={{ color: faint }}>← contents</span>
        <span style={{ color: ink }}>iii.</span>
        <button onClick={onTypeMenu} style={{
          background:'transparent', border:`1px solid ${ink}55`, color: typeMenuOpen?red:ink,
          padding:'2px 10px', fontFamily:'inherit', fontStyle:'italic', fontSize: 14, cursor:'pointer',
          borderRadius: 99,
        }}>aa</button>
      </div>

      {typeMenuOpen && (
        <div style={{
          position:'absolute', top: 110, right: 14, zIndex: 10,
          width: 220, padding: 16,
          background: dark?BA.darkPaper:BA.paper2,
          border:`1px double ${ink}`,
          fontFamily:'"IM Fell English",serif',
        }}>
          <div style={{ fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color: faint, marginBottom: 12 }}>READING</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontStyle:'italic', fontSize: 14, marginBottom: 4 }}>type</div>
            <div style={{ display:'flex', alignItems:'baseline', gap: 8 }}>
              {[14,16,18,20].map((s,i)=>(
                <span key={s} style={{
                  fontSize: s, fontFamily:'"IM Fell DW Pica",Georgia,serif',
                  color: i===1?red:ink,
                  fontWeight: i===1?500:400,
                  borderBottom: i===1?`1px solid ${red}`:'none',
                  cursor:'pointer',
                }}>A</span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontStyle:'italic', fontSize: 14, marginBottom: 6 }}>parchment</div>
            <div style={{ display:'flex', gap: 6 }}>
              {[BA.paper, BA.paper2, BA.darkPaper, BA.darkBg].map((c,i)=>(
                <div key={i} style={{
                  width: 28, height: 28, background: c,
                  border:`1px solid ${ink}77`,
                  outline: i===0?`2px solid ${red}`:'none', outlineOffset:2,
                }}/>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontStyle:'italic', fontSize: 14, marginBottom: 4 }}>justification</div>
            <div style={{ display:'flex', gap: 6 }}>
              <span style={{ padding:'2px 10px', border:`1px solid ${ink}`, fontStyle:'italic', background: ink, color: dark?BA.darkBg:BA.paper }}>justified</span>
              <span style={{ padding:'2px 10px', border:`1px solid ${ink}`, fontStyle:'italic' }}>ragged</span>
            </div>
          </div>
        </div>
      )}

      {/* Header — chapter card */}
      <div style={{ padding:'30px 28px 0', textAlign:'center' }}>
        <div style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 16, color: faint, letterSpacing:'0.1em' }}>
          chapter the third
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 14, margin:'10px 0' }}>
          <div style={{ width: 30, height: 1, background: ink }}/>
          <BaIcon size={32} color={red}/>
          <div style={{ width: 30, height: 1, background: ink }}/>
        </div>
        <h1 style={{
          fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif',
          fontWeight: 400, fontSize: 38, lineHeight: 1, margin:'4px 0 6px',
        }}>The Nublar Drop</h1>
        <div style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 14, color: faint }}>
          in which a man is set down upon an island
        </div>
        <div style={{ margin:'18px auto 0', width: 60, height: 1, background: ink }}/>
      </div>

      {/* Body */}
      <div style={{ padding:'24px 28px 0' }}>

        {/* Epigraph */}
        <div style={{
          textAlign:'center', margin:'0 0 24px',
          fontFamily:'"IM Fell English",serif', fontStyle:'italic',
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.45, color: ink, margin:'0 12px 8px' }}>
            "{ch.epigraph.text}"
          </p>
          <div style={{ fontSize: 12, color: faint }}>{ch.epigraph.attribution}</div>
        </div>

        {ch.paragraphs.map((p, i) => renderPara(p, i, i===0))}

        {/* margin tail ornament */}
        <div style={{ textAlign:'center', margin:'24px 0 14px', fontFamily:'"IM Fell English",serif', color: red, fontSize: 24 }}>
          ❦
        </div>

        {/* page footer with leaf number + nav */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          paddingTop: 12, borderTop: `1px solid ${ink}33`,
          fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 14,
        }}>
          <span style={{ color: faint }}>← ii.</span>
          <span style={{ color: ink }}>fol. iii — leaf 14 / 168</span>
          <span style={{ color: red }}>iv. →</span>
        </div>
      </div>

      {/* Tooltip — hand-pinned card */}
      {activeTooltip && (
        <div onClick={() => onTooltip(null)} style={{
          position:'absolute', inset:0, top:54, zIndex: 20,
          display:'flex', alignItems:'center', justifyContent:'center',
          background: dark?'#000B':'#0007', padding: 18,
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            position:'relative', width:'100%', maxWidth: 320,
            background: dark?BA.darkPaper:BA.paper2,
            border:`1px double ${ink}`, padding: 22,
            fontFamily:'"IM Fell English",serif',
            transform:'rotate(-1deg)',
            boxShadow:'4px 6px 0 rgba(0,0,0,0.25)',
          }}>
            {/* pin */}
            <div style={{
              position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)',
              width:14, height:14, borderRadius:99,
              background: red, border:`1px solid ${ink}`,
              boxShadow:'inset 1px 1px 2px rgba(255,255,255,0.4)',
            }}/>
            <div style={{ fontSize:11, letterSpacing:'0.25em', textTransform:'uppercase', color: red, marginBottom: 6 }}>
              {window.NOVEL.glossary[activeTooltip]?.cat}
            </div>
            <h3 style={{
              fontFamily:'"IM Fell DW Pica",Georgia,serif',
              fontWeight: 400, fontSize: 28, margin:'0 0 8px', color: ink,
            }}>{activeTooltip}</h3>
            <p style={{ fontStyle:'italic', fontSize: 14, lineHeight: 1.45, color: ink, margin: 0 }}>
              {window.NOVEL.glossary[activeTooltip]?.def}
            </p>
            <div style={{ marginTop: 14, fontStyle:'italic', fontSize: 12, color: faint, textAlign:'right' }}>
              — see appendix →
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// 3D — GLOSSARY (catalog of plates)
// ---------------------------------------------------------------------
function BaGlossary({ dark }) {
  const ink = dark ? BA.darkInk : BA.ink;
  const faint = dark ? BA.darkFaint : BA.faint;
  const red = dark ? BA.darkRed : BA.red;
  const amber = dark ? BA.darkAmber : BA.amber;
  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop:54, color: ink, paddingBottom: 60 }}>
      <BaBg dark={dark}/>
      <div style={{ position:'relative', padding:'18px 28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize:13, color: faint }}>
          <span>← contents</span>
          <span>app. G</span>
        </div>
        <h2 style={{
          fontFamily:'"IM Fell DW Pica","IM Fell English",Georgia,serif',
          fontWeight: 400, fontSize: 44, textAlign:'center', margin:'10px 0 4px',
        }}>Glossarium</h2>
        <div style={{ textAlign:'center', fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize:13, color: faint, marginBottom: 18 }}>
          a catalogue of persons, beasts, & terms
        </div>
        <BaRule dark={dark} double/>

        {/* search */}
        <div style={{
          display:'flex', alignItems:'center', gap: 10, marginTop: 18, marginBottom: 8,
          padding:'10px 14px', border:`1px solid ${ink}55`,
          fontFamily:'"IM Fell English",serif', fontStyle:'italic', color: faint,
        }}>
          <span style={{ fontSize: 14 }}>⌕</span>
          <span>seek a term…</span>
        </div>

        {/* Index letters */}
        <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 4px', fontFamily:'"IM Fell DW Pica",Georgia,serif', fontSize: 14, color: faint }}>
          {'ABCDEGHIJMNOPSTX'.split('').map(l => (
            <span key={l} style={{ color: 'AISP'.includes(l) ? red : faint, cursor:'pointer' }}>{l}</span>
          ))}
        </div>
        <BaRule dark={dark}/>

        {window.NOVEL.glossaryFull.map((sec, si) => (
          <div key={si} style={{ marginTop: 24 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 14, marginBottom: 12 }}>
              <h3 style={{
                fontFamily:'"IM Fell DW Pica",Georgia,serif',
                fontWeight: 400, fontSize: 24, margin: 0,
              }}>{sec.cat}</h3>
              <div style={{ flex:1, borderTop:`1px dotted ${faint}` }}/>
              <span style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 13, color: faint }}>
                {sec.terms.length} entries
              </span>
            </div>
            {sec.terms.map((t, ti) => (
              <div key={ti} style={{
                padding:'10px 0', borderBottom: ti<sec.terms.length-1 ? `1px dotted ${faint}88` : 'none',
                display:'flex', gap: 14,
              }}>
                <div style={{ width: 36, textAlign:'center', paddingTop: 2 }}>
                  <BaIcon size={28} color={red}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap: 8 }}>
                    <span style={{
                      fontFamily:'"IM Fell DW Pica",Georgia,serif',
                      fontSize: 18, color: ink,
                    }}>{t.name}</span>
                    {t.alias && (
                      <span style={{ fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 12, color: red }}>
                        ({t.alias})
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily:'"IM Fell DW Pica",Georgia,serif',
                    fontSize: 13.5, lineHeight: 1.5, color: ink, margin:'2px 0 0',
                    textAlign:'justify',
                  }}>{t.short}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ textAlign:'center', marginTop: 24, fontFamily:'"IM Fell English",serif', fontStyle:'italic', fontSize: 13, color: faint }}>
          — finis glossarii —
        </div>
      </div>
    </div>
  );
}

window.BA_DIR = { Cover: BaCover, TOC: BaTOC, Reader: BaReader, Glossary: BaGlossary };
