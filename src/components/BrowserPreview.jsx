import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export function BrowserPreview({ html, onActions, busy }) {
  const frame = useRef(null);
  const handler = useRef(onActions);
  const focus = useRef(null);
  const token = useRef(null);
  const [readyToken, setReadyToken] = useState(null);
  handler.current=onActions;
  const source = useMemo(() => {
    const parsed=new DOMParser().parseFromString(html,'text/html');
    parsed.querySelectorAll('script,iframe,object,embed,meta,base,link').forEach(node=>node.remove());
    parsed.querySelectorAll('*').forEach(node=>{
      for(const attr of [...node.attributes]) {
        if(/^on/i.test(attr.name)||['srcdoc','nonce','action','formaction'].includes(attr.name))node.removeAttribute(attr.name);
        if(['href','src','xlink:href'].includes(attr.name)&&!attr.value.startsWith('data:'))node.removeAttribute(attr.name);
      }
    });
    const nonce=crypto.randomUUID();
    return { token: nonce, html: `<!doctype html><html lang="de"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>body{background:#111827;color:#eef2ff;font:16px system-ui;padding:18px}button,input,select{font:inherit;padding:10px;margin:5px;border-radius:8px;max-width:100%;box-sizing:border-box}button{background:#a18aff;color:#111827;border:0;cursor:pointer}input{background:#202c41;color:white;border:1px solid #64748b}li{padding:8px}button:disabled{opacity:.5}*{box-sizing:border-box}form{display:flex;flex-wrap:wrap;gap:6px}.done{text-decoration:line-through}.active{color:#6ee7b7}ul{padding-left:22px}</style></head><body>${parsed.body.innerHTML}<script nonce="${nonce}">
      const selector=node=>'[data-codeklar-node="'+node.getAttribute('data-codeklar-node')+'"]';
      const send=actions=>parent.postMessage({kind:'codeklar-preview',actions},'*');
      let timer;
      const flush=()=>{clearTimeout(timer);};
      document.addEventListener('input',event=>{
        const target=event.target;
        clearTimeout(timer);timer=setTimeout(()=>send([{type:'input',selector:selector(target),value:target.value,checked:target.checked,selection:target.selectionStart}]),350);
      });
      document.addEventListener('click',event=>{
        const target=event.target.closest('[data-codeklar-node]');if(!target)return;
        if(target.matches('input,textarea,select,label'))return;
        event.preventDefault();flush();
        const actions=[];
        for(const input of document.querySelectorAll('input,textarea,select'))actions.push({type:'input',selector:selector(input),value:input.value,checked:input.checked});
        actions.push({type:'click',selector:selector(target)});
        const button=target.closest('button'),form=button?.form;
        if(form&&button.type==='submit')actions.push({type:'submit',selector:selector(form)});
        send(actions);
      });
      document.addEventListener('submit',event=>{event.preventDefault();send([{type:'submit',selector:selector(event.target)}]);});
      document.addEventListener('keydown',event=>{
        if(!['Enter','Escape','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(event.key))return;
        event.preventDefault();flush();const actions=[{type:'keydown',selector:selector(event.target),key:event.key,value:event.target.value}];
        if(event.key==='Enter'&&event.target.form){for(const input of event.target.form.querySelectorAll('input,textarea,select'))actions.unshift({type:'input',selector:selector(input),value:input.value,checked:input.checked});actions.push({type:'submit',selector:selector(event.target.form)});}send(actions);
      });
      const prior=${JSON.stringify(focus.current).replaceAll("<", "\\u003c")};
      if(prior){const node=document.querySelector(prior.selector);if(node){node.focus();try{node.setSelectionRange(prior.selection,prior.selection);}catch{}}}
      parent.postMessage({kind:'codeklar-preview-ready',token:${JSON.stringify(nonce)}},'*');
    </script></body></html>` };
  },[html]);
  token.current=source.token;
  useLayoutEffect(()=>{
    const listen=event=>{
      if(event.source===frame.current?.contentWindow&&event.data?.kind==='codeklar-preview-ready'&&event.data.token===token.current){setReadyToken(event.data.token);return;}
      if(event.source!==frame.current?.contentWindow||event.data?.kind!=='codeklar-preview'||!Array.isArray(event.data.actions))return;
      const actions=event.data.actions.slice(0,30);
      const last=actions.at(-1);focus.current=last?.type==='input'?last:null;
      handler.current(actions);
    };
    window.addEventListener('message',listen);return()=>window.removeEventListener('message',listen);
  },[]);
  const ready=readyToken===source.token;
  return <section className="browser-preview"><h3>Deine Browser-Vorschau</h3><p>Bearbeite den Code und starte ihn. Danach kannst du die Oberfläche hier bedienen.</p><iframe ref={frame} title="Interaktive Browser-Vorschau" sandbox="allow-scripts" style={{pointerEvents:busy||!ready?"none":"auto"}} srcDoc={source.html} /><span role="status">{busy?'Aktion wird ausgeführt …':!ready?'Vorschau wird geladen …':''}</span></section>;
}
