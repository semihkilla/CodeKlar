import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check, X, Minus } from 'lucide-react';
const mobileQuery='(max-width: 720px), (max-width: 1000px) and (pointer: coarse)';
export function LessonNavigator({ lesson,siblings,progress,onSelect }){
 const [open,setOpen]=useState(false),dialogRef=useRef(null),listRef=useRef(null),currentRef=useRef(null),dragRef=useRef(null);
 const index=siblings.findIndex(item=>item.id===lesson.id);
 useEffect(()=>{
  if(!open)return;
  const dialog=dialogRef.current,overflow=document.body.style.overflow;
  dialog.showModal();document.body.style.overflow='hidden';
  // Scroll only the list: scrollIntoView can also move the dialog's clipped viewport.
  const list=listRef.current,current=currentRef.current;
  if(list&&current){
   const row=current.getBoundingClientRect(),box=list.getBoundingClientRect();
   if(row.bottom>box.bottom)list.scrollTop+=row.bottom-box.bottom+3;
   else if(row.top<box.top)list.scrollTop+=row.top-box.top-3;
  }
  currentRef.current?.focus({preventScroll:true});
  const media=window.matchMedia(mobileQuery),closeOnDesktop=()=>{if(!media.matches)setOpen(false);};
  media.addEventListener('change',closeOnDesktop);
  return ()=>{media.removeEventListener('change',closeOnDesktop);dialog.close();document.body.style.overflow=overflow;};
 },[open]);
 function startDrag(event){
  if(event.target.closest('button'))return;
  dragRef.current={y:event.clientY,id:event.pointerId};event.currentTarget.setPointerCapture(event.pointerId);
 }
 function endDrag(event){
  const start=dragRef.current;dragRef.current=null;
  if(start?.id===event.pointerId&&event.clientY-start.y>60)setOpen(false);
 }
 function choose(id){setOpen(false);onSelect(id);}
 return <div className="lesson-navigator">
  <div className="lesson-switcher" aria-label="Lektionswechsel">
   <button type="button" className="lesson-arrow" aria-label="Vorherige Lektion im Thema" disabled={index===0} onClick={()=>choose(siblings[index-1].id)}><ChevronLeft size={22}/></button>
   <button type="button" className="lesson-current" aria-label="Lektion wählen" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}><span className="lesson-current-name"><span className="lesson-current-label">{lesson.name}</span><ChevronDown size={18}/></span><span className="lesson-current-position">{index+1} von {siblings.length} Lektionen</span></button>
   <button type="button" className="lesson-arrow" aria-label="Nächste Lektion im Thema" disabled={index===siblings.length-1} onClick={()=>choose(siblings[index+1].id)}><ChevronRight size={22}/></button>
  </div>
  <progress className="lesson-position-progress" aria-label="Position im Thema" value={index+1} max={siblings.length} />
  <dialog className="lesson-sheet" ref={dialogRef} aria-labelledby="lesson-sheet-title" aria-describedby="lesson-sheet-description" onCancel={event=>{event.preventDefault();setOpen(false);}} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget){const box=event.currentTarget.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)setOpen(false);}}}>
   <div className="lesson-sheet-grip" aria-hidden="true" onPointerDown={startDrag} onPointerUp={endDrag} onPointerCancel={()=>{dragRef.current=null;}}><Minus size={36}/></div>
   <div className="lesson-sheet-heading" onPointerDown={startDrag} onPointerUp={endDrag} onPointerCancel={()=>{dragRef.current=null;}}><div><h2 id="lesson-sheet-title">Lektion wählen</h2><p id="lesson-sheet-description">{lesson.category} · {siblings.length} Lektionen</p></div><button type="button" className="icon-button" aria-label="Lektionsliste schließen" onClick={()=>setOpen(false)}><X size={22}/></button></div>
   <div className="lesson-sheet-list" ref={listRef} aria-label="Lektionen im Thema">{siblings.map((item,i)=><button type="button" key={item.id} ref={item.id===lesson.id?currentRef:null} className={`lesson-sheet-row ${item.id===lesson.id?'selected':''}`} aria-current={item.id===lesson.id?'step':undefined} onClick={()=>choose(item.id)}><span className="lesson-sheet-name">{item.name}{progress.solved[item.id]&&<small>Gelöst</small>}</span><span className="lesson-sheet-position">{i+1} von {siblings.length}</span>{item.id===lesson.id?<Check size={20} aria-label="Aktuelle Lektion"/>:<span className="lesson-sheet-status"/>}</button>)}</div>
  </dialog>
 </div>;
}
