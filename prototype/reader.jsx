// Dossier prototype — Reader screen
// Includes: animated stamp slam-in, redaction reveal-on-tap, glossary tooltip drawer,
// type sheet, evidence sidecar, chapter-to-chapter nav.

const { getPalette, DossierBg, DossierStamp, MonoSmall, DLine, toRoman } = window.DossierShared;

function ReaderScreen({
  tw, chapter, onBack, onPrev, onNext, onTooltip, activeTooltip,
  onTypeMenu, typeMenuOpen, onEvidence, evidenceOpen,
}) {
  const p = getPalette(tw);
  const ch = chapter === 3 ? window.NOVEL.sampleChapter : window.NOVEL_CH[chapter];
  const fs = tw.fontSize;
  const lh = tw.lineHeight;
  const justify = tw.justify;
  const ornaments = tw.ornaments;

  const [revealed, setRevealed] = React.useState(new Set());
  const [stampVisible, setStampVisible] = React.useState(false);
  React.useEffect(() => {
    setStampVisible(false);
    setRevealed(new Set());
    const t = setTimeout(() => setStampVisible(true), 220);
    return () => clearTimeout(t);
  }, [chapter]);

  // Words to redact in chapter 3 — fixed set so it's deterministic
  const REDACT_TARGETS = ['Hammond', 'pterosaur', 'Barbasol', 'forty-eight'];

  const renderPara = (text, key) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{
        fontFamily: tw.bodyFont === 'mono'
          ? '"JetBrains Mono", monospace'
          : '"Newsreader", "Source Serif 4", Georgia, serif',
        fontSize: fs,
        lineHeight: lh,
        color: p.ink,
        margin: '0 0 1.1em',
        textAlign: justify ? 'justify' : 'left',
        textWrap: 'pretty',
        hyphens: justify ? 'auto' : 'manual',
      }}>
        {parts.map((part, i) => {
          const m = part.match(/^\{\{(.+)\}\}$/);
          if (!m) {
            // Wrap REDACT_TARGETS as redaction blocks
            const tokens = part.split(/(\b(?:Hammond|pterosaur|Barbasol|forty-eight)\b)/g);
            return tokens.map((tok, ti) => {
              if (REDACT_TARGETS.includes(tok)) {
                const id = `${key}-${i}-${ti}`;
                const isRev = revealed.has(id);
                return (
                  <span key={ti} onClick={(e) => {
                    e.stopPropagation();
                    setRevealed(s => { const ns = new Set(s); ns.add(id); return ns; });
                  }} style={{
                    background: isRev ? 'transparent' : p.ink,
                    color: isRev ? p.accent : 'transparent',
                    cursor: 'pointer',
                    padding: '0 2px',
                    transition: 'background 0.3s',
                    borderBottom: isRev ? `1px dotted ${p.accent}` : 'none',
                    fontWeight: isRev ? 600 : 400,
                  }}>{isRev ? tok : '█'.repeat(Math.max(3, tok.length))}</span>
                );
              }
              return tok;
            });
          }
          const term = m[1];
          return (
            <span key={i} onClick={() => onTooltip(term)} style={{
              color: p.accent, cursor:'pointer',
              textDecoration:`underline dotted ${p.accent}99`,
              textUnderlineOffset: 3, fontWeight: 500,
            }}>{term}</span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: p.ink, paddingBottom: 100 }}>
      <DossierBg p={p} tw={tw}/>

      {/* Sticky chrome */}
      <div style={{
        position:'sticky', top:54, zIndex:5, background: p.bg + 'F0', backdropFilter:'blur(8px)',
        borderBottom:`1px solid ${p.ink}`, padding:'10px 18px',
        display:'flex', alignItems:'center', gap:10,
      }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em', cursor:'pointer', padding:0 }}>← INDEX</button>
        <div style={{ flex:1, textAlign:'center', fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em', color: p.ink, fontWeight: 700 }}>
          CH. {String(ch.n).padStart(2,'0')} / 22
        </div>
        <button onClick={onEvidence} style={{
          background: evidenceOpen ? p.ink : 'transparent',
          color: evidenceOpen ? p.bg : p.ink,
          border:`1px solid ${p.ink}`, padding:'3px 8px',
          fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.15em', cursor:'pointer', marginRight: 4,
        }}>EV</button>
        <button onClick={onTypeMenu} style={{
          background: typeMenuOpen ? p.ink : 'transparent',
          color: typeMenuOpen ? p.bg : p.ink,
          border:`1px solid ${p.ink}`, padding:'3px 8px',
          fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.15em', cursor:'pointer',
        }}>Aa</button>
      </div>

      {/* Reading progress strip */}
      <div style={{ position:'sticky', top: 94, zIndex:4, height: 2, background: p.faint+'33' }}>
        <div style={{ height:'100%', width: '38%', background: p.accent }}/>
      </div>

      {typeMenuOpen && <TypeMenu p={p} tw={tw}/>}

      <div style={{ position:'relative', padding:'18px 22px 0' }}>

        {/* Animated stamp on chapter open */}
        {stampVisible && tw.stamps > 0 && (
          <div style={{ position:'absolute', top: 22, right: 14, zIndex: 2 }} className="stamp-slam-anim">
            <DossierStamp color={p.accent} rotate={-12} style={{ fontSize: 11, padding:'5px 12px' }}>
              FILED · APR 24
            </DossierStamp>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:4, fontFamily:'"JetBrains Mono", monospace' }}>
          <span style={{ fontSize:60, fontWeight:700, color: p.ink, letterSpacing:'-0.04em', lineHeight:1 }}>
            {String(ch.n).padStart(2,'0')}
          </span>
          <div style={{ flex:1 }}>
            <MonoSmall color={p.faint} style={{ display:'block' }}>CHAPTER {toRoman(ch.n)}</MonoSmall>
            <MonoSmall color={p.accent} style={{ fontWeight:700, display:'block' }}>SECTION I</MonoSmall>
          </div>
        </div>
        <h1 style={{
          fontFamily:'"Newsreader", Georgia, serif', fontWeight:600,
          fontSize:30, letterSpacing:'-0.01em', lineHeight:1.05, margin:'4px 0 18px',
        }}>{ch.title}</h1>

        <DLine p={p}/>

        {/* Epigraph */}
        <div style={{
          margin:'16px 0 26px', padding:14,
          background: p.isDark ? `${p.accent}15` : `${p.ink}06`,
          borderLeft:`3px solid ${p.accent}`,
          fontFamily:'"JetBrains Mono", monospace', fontSize:12, lineHeight:1.55,
        }}>
          <MonoSmall color={p.faint} style={{ display:'block', marginBottom:6 }}>
            INTERCEPT · BRIEFING ROOM · 04:12
          </MonoSmall>
          "{ch.epigraph.text}"
          <div style={{ fontSize:10, color: p.faint, marginTop:8 }}>{ch.epigraph.attribution}</div>
        </div>

        {/* FIGURE — chapter still */}
        <FigurePlate
          p={p}
          tag={`FIG. ${String(ch.n).padStart(2,'0')}.A`}
          caption="Recovered still — scene one."
          src={`https://raw.githubusercontent.com/dknos/Project-Grendel-A-JP4-Fan-WebNovel/HEAD/images/chapter-${String(ch.n).padStart(3,'0')}/scene-1.webp`}
        />

        {ch.paragraphs.map((para, i) => {
          const out = [renderPara(para, i)];
          // Insert animated intercept footage roughly at midpoint
          if (i === Math.floor(ch.paragraphs.length / 2) - 1) {
            out.push(
              <FigurePlate
                key={`fig-action-${i}`}
                p={p}
                tag={`INTERCEPT ${String(ch.n).padStart(2,'0')}.B`}
                caption="Motion fragment — autoplay."
                src={`https://raw.githubusercontent.com/dknos/Project-Grendel-A-JP4-Fan-WebNovel/HEAD/images/chapter-${String(ch.n).padStart(3,'0')}/action-1.webp`}
                accent
              />
            );
          }
          return out;
        })}

        {ornaments && (
          <div style={{ textAlign:'center', margin:'22px 0', color: p.faint, fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:'0.4em' }}>
            ─── §§§ ───
          </div>
        )}

        <DLine p={p} dashed/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 0 4px', fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em' }}>
          <button onClick={onPrev} disabled={ch.n<=1} style={{ background:'none', border:'none', color: ch.n<=1?p.faint:p.ink, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor: ch.n<=1?'default':'pointer', padding:0 }}>
            ← CH {String(Math.max(1,ch.n-1)).padStart(2,'0')}
          </button>
          <span style={{ color: p.ink, fontWeight: 700 }}>{String(ch.n).padStart(2,'0')} / 22</span>
          <button onClick={onNext} disabled={ch.n>=22} style={{ background:'none', border:'none', color: p.accent, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor:'pointer', padding:0 }}>
            CH {String(Math.min(22,ch.n+1)).padStart(2,'0')} →
          </button>
        </div>
      </div>

      {activeTooltip && <TooltipDrawer p={p} term={activeTooltip} onClose={() => onTooltip(null)}/>}
      {evidenceOpen && <EvidenceSidecar p={p} chapter={ch} onClose={onEvidence}/>}
    </div>
  );
}

function TypeMenu({ p, tw }) {
  return (
    <div style={{
      position:'absolute', top: 110, right: 14, zIndex: 10,
      background: p.bg2, border:`1.5px solid ${p.ink}`, padding:14, width: 240,
      fontFamily:'"JetBrains Mono", monospace',
      boxShadow: p.isDark?'none':'4px 4px 0 rgba(0,0,0,0.18)',
    }}>
      <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 10 }}>TYPE SETTINGS</MonoSmall>
      <div style={{ fontSize:10, color: p.faint, lineHeight:1.6 }}>
        Adjust via the <b style={{ color: p.accent }}>TWEAKS</b> panel — toolbar toggle, top of screen.
      </div>
      <div style={{ marginTop:10, padding:'8px', background: p.bg, border:`1px dashed ${p.faint}` }}>
        <MonoSmall color={p.faint}>SIZE</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{Math.round(tw.fontSize)}px</span>
        <br/>
        <MonoSmall color={p.faint}>LEAD</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{tw.lineHeight.toFixed(2)}</span>
        <br/>
        <MonoSmall color={p.faint}>FACE</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{tw.bodyFont.toUpperCase()}</span>
      </div>
    </div>
  );
}

function TooltipDrawer({ p, term, onClose }) {
  const entry = window.NOVEL.glossary[term] || window.NOVEL_GLOSS_EXT[term] || { cat:'unknown', def:'No entry on file. Cross-reference Appendix-G.' };
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, top:54, zIndex:20, display:'flex', alignItems:'flex-end' }}>
      <div style={{ position:'absolute', inset:0, top:0, background:'#0008' }}/>
      <div onClick={e=>e.stopPropagation()} className="drawer-rise" style={{
        position:'relative', width:'100%',
        background: p.bg2, borderTop:`2px solid ${p.accent}`,
        padding:'18px 22px 38px', fontFamily:'"JetBrains Mono", monospace',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <MonoSmall color={p.accent} style={{ fontWeight:700 }}>
            GLOSSARY · {(entry.cat||'').toUpperCase()}
          </MonoSmall>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${p.ink}`, color: p.ink, padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>CLOSE ✕</button>
        </div>
        <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:24, margin:'0 0 8px', color: p.ink }}>{term}</h3>
        <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:14, lineHeight:1.55, color: p.ink, margin:0 }}>{entry.def}</p>
        <MonoSmall color={p.faint} style={{ display:'block', marginTop:14 }}>SEE FULL FILE → APPENDIX-G</MonoSmall>
      </div>
    </div>
  );
}

function EvidenceSidecar({ p, chapter, onClose }) {
  // Per-chapter evidence cards (simple stub)
  const items = [
    { tag:'WHO',   label:'Nick Harris',   note:'Forty-seven hours, fifty-nine minutes on the clock.' },
    { tag:'WHERE', label:'Isla Nublar',   note:'Lagoon insertion. Old visitor center on the ridge above.' },
    { tag:'WHAT',  label:'Barbasol can',  note:'Embryo cooler. -10°C / 48-hour rating.' },
    { tag:'WHEN',  label:'04:12 → 52:11', note:'Briefing to plane lift. Count starts at lagoon.' },
  ];
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, top:54, zIndex:25 }}>
      <div style={{ position:'absolute', inset:0, background:'#000A' }}/>
      <div onClick={e=>e.stopPropagation()} className="sidecar-slide" style={{
        position:'absolute', top:0, right:0, bottom:0, width:'85%',
        background: p.bg, borderLeft:`2px solid ${p.accent}`,
        padding:'18px', fontFamily:'"JetBrains Mono", monospace',
        overflowY:'auto',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <MonoSmall color={p.accent} style={{ fontWeight:700 }}>EVIDENCE · CH {String(chapter.n).padStart(2,'0')}</MonoSmall>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${p.ink}`, color: p.ink, padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>✕</button>
        </div>
        <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:22, margin:'0 0 14px', color: p.ink }}>
          Sidecar
        </h3>
        {items.map((it, i) => (
          <div key={i} style={{ borderTop: i?'none':'none', borderBottom: `1px dashed ${p.faint}`, padding:'12px 0' }}>
            <MonoSmall color={p.faint}>{it.tag}</MonoSmall>
            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:17, fontWeight:600, color: p.ink, margin:'2px 0 4px' }}>{it.label}</div>
            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:13, lineHeight:1.45, color: p.ink2 }}>{it.note}</div>
          </div>
        ))}
        <MonoSmall color={p.faint} style={{ display:'block', marginTop:18, textAlign:'center' }}>
          ─── EOF ───
        </MonoSmall>
      </div>
    </div>
  );
}

function FigurePlate({ p, tag, caption, src, accent }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const borderColor = accent ? p.accent : p.ink;
  return (
    <figure style={{
      margin:'18px 0 22px',
      border:`1px solid ${borderColor}`,
      background: p.bg2,
      padding: 4,
      position:'relative',
      fontFamily:'"JetBrains Mono", monospace',
    }}>
      <div style={{
        position:'relative', width:'100%', aspectRatio:'16 / 10',
        background: p.isDark
          ? 'repeating-linear-gradient(45deg, #0E1A0E 0 6px, #0A130A 6px 12px)'
          : 'repeating-linear-gradient(45deg, #C9BE9E 0 6px, #BDB18D 6px 12px)',
        overflow:'hidden',
      }}>
        {!failed && (
          <img
            src={src}
            alt={caption}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover',
              opacity: loaded ? 1 : 0, transition:'opacity 220ms ease-out',
              filter: p.isDark
                ? 'grayscale(0.55) contrast(1.05) brightness(0.7) sepia(0.15)'
                : 'grayscale(0.4) contrast(1.05) sepia(0.18)',
            }}
          />
        )}
        {failed && (
          <div style={{
            position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
            color: p.faint, fontSize:10, letterSpacing:'0.18em',
          }}>NO PLATE ON FILE</div>
        )}
        <div style={{
          position:'absolute', top:6, left:8,
          background: p.bg, color: p.faint, fontSize:9, letterSpacing:'0.18em',
          padding:'2px 6px', border:`1px solid ${p.faint}55`,
        }}>{tag}</div>
      </div>
      <figcaption style={{
        display:'flex', justifyContent:'space-between',
        padding:'6px 4px 2px', fontSize:10, letterSpacing:'0.12em', color: p.faint,
      }}>
        <span>{caption}</span>
        <span>SRC · GRENDEL/IMG</span>
      </figcaption>
    </figure>
  );
}

window.ReaderScreen = ReaderScreen;
