// Dossier prototype — Table of Contents

const { getPalette, DossierBg, MonoSmall, DLine } = window.DossierShared;

function TOCScreen({ tw, onOpen, onBack, onGlossary, currentChapter, completedChapters }) {
  const p = getPalette(tw);
  const completedSet = new Set(completedChapters);
  const readPct = Math.round((completedSet.size / 22) * 100);

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', padding:'14px 22px 100px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'inherit', fontSize:10, letterSpacing:'0.18em', cursor:'pointer', padding:0 }}>
            ← FILE 04-2026
          </button>
          <MonoSmall color={p.faint}>22 ENTRIES</MonoSmall>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize: 32, letterSpacing:'-0.01em', margin:'8px 0 4px' }}>
          The Judas Strain
        </h2>
        <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 18 }}>INDEX · 22 OF 22 LOGGED</MonoSmall>

        {/* Progress meter */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 6 }}>
            <MonoSmall color={p.faint}>READ PROGRESS</MonoSmall>
            <MonoSmall color={p.ink} style={{ fontWeight: 700 }}>{readPct}%</MonoSmall>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(22, 1fr)', gap:2 }}>
            {window.NOVEL.chapters.map((c, i) => {
              const state = completedSet.has(c.n) ? 'done' : c.n === currentChapter ? 'now' : 'todo';
              return (
                <div key={i} style={{
                  height: 14,
                  background: state==='done' ? p.ink : state==='now' ? p.accent : 'transparent',
                  border: `1px solid ${state==='todo' ? p.faint+'88' : p.ink}`,
                }}/>
              );
            })}
          </div>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:22 }}>
          {window.NOVEL.tags.map(t => (
            <span key={t} style={{
              fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase',
              padding:'3px 8px', border:`1px solid ${p.ink}`,
            }}>{t}</span>
          ))}
        </div>

        {/* Active chapter */}
        <div onClick={() => onOpen(currentChapter)} style={{
          border:`1px solid ${p.accent}`, padding:12, marginBottom: 22, position:'relative', cursor:'pointer',
          background: p.isDark ? `${p.accent}18` : `${p.accent}12`,
        }}>
          <div style={{ position:'absolute', top:-9, left:10, background: p.bg, padding:'0 6px' }}>
            <MonoSmall color={p.accent} style={{ fontWeight:700 }}>◉ ACTIVE</MonoSmall>
          </div>
          <MonoSmall color={p.faint} style={{ display:'block' }}>RESUME AT</MonoSmall>
          <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:19, fontWeight: 600, margin:'2px 0 6px' }}>
            {String(currentChapter).padStart(2,'0')} / {window.NOVEL.chapters[currentChapter-1].title}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <MonoSmall color={p.faint}>p. 1,432 / 2,456 W</MonoSmall>
            <MonoSmall color={p.faint}>58% READ →</MonoSmall>
          </div>
        </div>

        <DLine p={p}/>
        {window.NOVEL.chapters.map(c => {
          const state = completedSet.has(c.n) ? 'done' : c.n === currentChapter ? 'now' : 'todo';
          const clickable = state !== 'todo' || c.n <= currentChapter + 1;
          return (
            <div key={c.n}
              onClick={() => clickable && onOpen(c.n)}
              style={{
                borderBottom:`1px dashed ${p.faint}55`, padding:'11px 0',
                display:'flex', alignItems:'center', gap:12,
                cursor: clickable ? 'pointer' : 'default',
                opacity: clickable ? 1 : 0.5,
              }}>
              <div style={{ width:22, fontSize:11, fontWeight:700, color: state==='now'?p.accent : state==='done'?p.ink : p.faint }}>
                {String(c.n).padStart(2,'0')}
              </div>
              <div style={{
                width:46, height:34, flexShrink:0,
                border:`1px solid ${state==='todo' ? p.faint+'88' : p.ink}`,
                background: p.bg2, overflow:'hidden', position:'relative',
              }}>
                <img
                  src={`https://raw.githubusercontent.com/dknos/Project-Grendel-A-JP4-Fan-WebNovel/HEAD/images/chapter-${String(c.n).padStart(3,'0')}/scene-1.webp`}
                  alt=""
                  loading="lazy"
                  onError={(e)=>{ e.currentTarget.style.display='none'; }}
                  style={{
                    width:'100%', height:'100%', objectFit:'cover', objectPosition:'50% 30%',
                    filter: p.isDark
                      ? 'grayscale(0.7) contrast(1.05) brightness(0.6) sepia(0.15)'
                      : 'grayscale(0.55) contrast(1.05) sepia(0.18)',
                    opacity: state==='todo' ? 0.55 : 1,
                  }}
                />
              </div>
              <div style={{ flex:1 }}>
                <div style={{
                  fontFamily:'"Newsreader", Georgia, serif', fontSize:16, fontWeight:500,
                  color: state==='todo' ? p.faint : p.ink,
                  textDecoration: state==='done' ? `line-through ${p.faint}` : 'none',
                }}>{c.title}</div>
                <MonoSmall color={p.faint} style={{ display:'block', marginTop:2 }}>
                  {c.words.toLocaleString()} W · 2026.04.24
                </MonoSmall>
              </div>
              <div style={{ width:14, textAlign:'right', fontSize:11, color: state==='now'?p.accent:p.faint }}>
                {state==='done' ? '✓' : state==='now' ? '●' : '·'}
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: 22, textAlign:'center' }}>
          <button onClick={onGlossary} style={{
            background:'transparent', color: p.ink, border:`1px solid ${p.ink}`,
            padding:'10px 16px', fontFamily:'inherit', fontSize:11,
            letterSpacing:'0.2em', cursor:'pointer',
          }}>
            APPENDIX-G — GLOSSARY ↗
          </button>
        </div>

      </div>
    </div>
  );
}

window.TOCScreen = TOCScreen;
