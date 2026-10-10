import domLibrary from 'linkedom/worker?raw';
import { browserWorkerSource } from './browserWorkerSource';

export function runBrowserJavaScript(value) {
  return new Promise(resolve => {
    const iframe = document.createElement('iframe');
    iframe.hidden = true; iframe.setAttribute('sandbox', 'allow-scripts'); iframe.setAttribute('aria-hidden','true');
    let finished=false;
    const finish = result => { if(finished)return;finished=true;clearTimeout(timer);window.removeEventListener('message',listen);iframe.remove();resolve(result); };
    const listen = event => {
      if(event.source!==iframe.contentWindow)return;
      if(event.data?.kind==='ready')iframe.contentWindow.postMessage({kind:'run',value},'*');
      if(event.data?.kind==='result')finish(event.data.value);
    };
    const timer=setTimeout(()=>finish({logs:[],error:'Zeitlimit erreicht. Prüfe deinen Code auf eine Endlosschleife.'}),2000);
    window.addEventListener('message',listen);
    iframe.srcdoc=`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'"><script>
      const library=${JSON.stringify(domLibrary.replace(/export \{[^}]+\};?\s*$/, '')).replaceAll("<", "\\u003c")};
      const source=${JSON.stringify(browserWorkerSource).replaceAll("<", "\\u003c")}.replace(/import \{([^}]+)\} from 'DOM_LIBRARY';/,(_,names)=>'const dom=(()=>{'+library+';return {parseHTML,Event:GlobalEvent,CustomEvent,HTMLSelectElement};})();\\n(()=>{const {'+names+'}=dom;');
      const worker=new Worker(URL.createObjectURL(new Blob([source+'\\n})();'],{type:'text/javascript'})));
      worker.onmessage=event=>parent.postMessage({kind:'result',value:event.data},'*');
      worker.onerror=event=>parent.postMessage({kind:'result',value:{logs:[],error:event.message||'Browser-Code konnte nicht ausgeführt werden.'}},'*');
      addEventListener('message',event=>{if(event.source===parent&&event.data.kind==='run')worker.postMessage(event.data.value);});
      parent.postMessage({kind:'ready'},'*');
    </script>`;
    document.body.append(iframe);
  });
}
