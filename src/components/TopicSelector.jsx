import { useEffect, useRef, useState } from 'react';
import { Cpu, Binary, Database, FileText, Folder, ChevronDown, CheckCircle2, Circle, X, Minus } from 'lucide-react';

const mobileQuery = '(max-width: 720px), (max-width: 1000px) and (pointer: coarse)';
const icons = { 'Bits & Bytes': Cpu, 'Zahlensysteme': Binary, 'Zahlen im Speicher': Database, 'Text & Dateien': FileText, 'Dateien & Formate': Folder };

export function TopicSelector({ categories, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null), listRef = useRef(null), currentRef = useRef(null), dragRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current, overflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    const list = listRef.current, current = currentRef.current;
    if (list && current) {
      const row = current.getBoundingClientRect(), box = list.getBoundingClientRect();
      if (row.bottom > box.bottom) list.scrollTop += row.bottom - box.bottom + 3;
      else if (row.top < box.top) list.scrollTop += row.top - box.top - 3;
    }
    current?.focus({ preventScroll: true });
    const media = window.matchMedia(mobileQuery);
    const closeOnDesktop = () => { if (!media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => { media.removeEventListener('change', closeOnDesktop); dialog.close(); document.body.style.overflow = overflow; };
  }, [open]);
  function startDrag(event) {
    if (event.target.closest('button')) return;
    dragRef.current = { y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endDrag(event) {
    const start = dragRef.current; dragRef.current = null;
    if (start?.id === event.pointerId && event.clientY - start.y > 60) setOpen(false);
  }
  return (
    <div className="topic-selector">
      <span className="topic-selector-label">Thema</span>
      <button type="button" className="topic-selector-trigger" aria-label="Thema wählen" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        <span>{selected}</span><ChevronDown size={20} aria-hidden="true" />
      </button>
      <dialog className="lesson-sheet topic-sheet" ref={dialogRef} aria-labelledby="topic-sheet-title" onCancel={event => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)} onClick={event => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setOpen(false);
        }
      }}>
        <div className="lesson-sheet-grip" aria-hidden="true" onPointerDown={startDrag} onPointerUp={endDrag} onPointerCancel={() => { dragRef.current = null; }}><Minus size={36} /></div>
        <div className="lesson-sheet-heading" onPointerDown={startDrag} onPointerUp={endDrag} onPointerCancel={() => { dragRef.current = null; }}>
          <h2 id="topic-sheet-title">Thema wählen</h2>
          <button type="button" className="icon-button" aria-label="Themenliste schließen" onClick={() => setOpen(false)}><X size={22} /></button>
        </div>
        <div className="lesson-sheet-list topic-selector-list" ref={listRef} aria-label="Themen im Hauptbereich">
          {categories.map(category => {
            const Icon = icons[category] || FileText;
            return <button type="button" key={category} ref={category === selected ? currentRef : null} aria-label={category}
              aria-pressed={category === selected} className={`topic-selector-row ${category === selected ? 'selected' : ''}`}
              onClick={() => { setOpen(false); onSelect(category); }}>
              <Icon size={22} aria-hidden="true" /><span>{category}</span>
              {category === selected ? <CheckCircle2 size={22} aria-hidden="true" /> : <Circle size={22} aria-hidden="true" />}
            </button>;
          })}
        </div>
      </dialog>
    </div>
  );
}
