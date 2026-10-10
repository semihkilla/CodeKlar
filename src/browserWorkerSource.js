// Runs only inside the existing opaque-origin sandbox, never on the app thread.
export const browserWorkerSource = `
import {parseHTML, Event, CustomEvent, HTMLSelectElement} from 'DOM_LIBRARY';
// LinkeDOM lacks native select.value assignment and default first-option selection.
Object.defineProperty(HTMLSelectElement.prototype,'value',{configurable:true,get(){return [...this.options].find(option=>option.hasAttribute('selected'))?.value??this.options[0]?.value??'';},set(value){for(const option of this.options){option.toggleAttribute('selected',option.value===String(value));}}});
const nativeTimeout=self.setTimeout.bind(self);
const nativeTimers={setTimeout:self.setTimeout.bind(self),clearTimeout:self.clearTimeout.bind(self),setInterval:self.setInterval.bind(self),clearInterval:self.clearInterval.bind(self)};
const nativeNow=Date.now, nativePerformance=self.performance;
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const equal = (a,b) => {
  if(a===b) return true;
  if(a===null||b===null||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)) return false;
  const keys=Object.keys(a);
  return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));
};
const display = value => { try { return typeof value==='string'?value:JSON.stringify(value)??String(value); } catch { return String(value); } };
self.onmessage = async ({data}) => {
  const logs=[];
  const console=Object.fromEntries(['log','warn','error','info'].map(name=>[name,(...args)=>{if(logs.length<50) logs.push(args.map(display).join(' ').slice(0,4000));}]));
  let document, store, requests, pending, advance, clockTime;
  function setup(environment) {
    ({document}=parseHTML('<!doctype html><html><head></head><body>'+environment.html+'</body></html>'));
    store=new Map(Object.entries(environment.storage||{}).map(([k,v])=>[String(k),String(v)]));
    requests=[];pending=new Set();
    Object.assign(self,nativeTimers);Date.now=nativeNow;
    Object.defineProperty(self,'performance',{value:nativePerformance,configurable:true});
    advance=null;clockTime=0;delete self.requestAnimationFrame;delete self.cancelAnimationFrame;
    if(environment.clock){
      let id=0;const jobs=new Map();
      const schedule=(callback,delay,repeat,args,frame=false)=>{if(typeof callback!=='function')throw new TypeError('Timer erwarten hier eine Funktion.');const interval=Math.max(1,Number(delay)||0);const key=++id;jobs.set(key,{callback,due:clockTime+interval,interval,repeat,args,frame});return key;};
      Object.assign(self,{setTimeout:(fn,delay,...args)=>schedule(fn,delay,false,args),setInterval:(fn,delay,...args)=>schedule(fn,delay,true,args),clearTimeout:key=>{jobs.delete(key);},clearInterval:key=>{jobs.delete(key);},requestAnimationFrame:fn=>schedule(fn,16,false,[],true),cancelAnimationFrame:key=>{jobs.delete(key);}});
      Date.now=()=>clockTime;Object.defineProperty(self,'performance',{value:{now:()=>clockTime},configurable:true});
      advance=async ms=>{
        if(!Number.isFinite(ms)||ms<0||ms>60000)throw new Error('Zeitvorschub muss zwischen 0 und 60000 ms liegen.');
        const end=clockTime+ms;let count=0;
        while(true){const next=[...jobs.entries()].filter(([,job])=>job.due<=end).sort((a,b)=>a[1].due-b[1].due||a[0]-b[0])[0];if(!next)break;
          if(++count>1000)throw new Error('Zu viele Timer-Aufrufe. Prüfe deine Schleife oder verkleinere den Zeitvorschub.');
          const [key,job]=next;clockTime=job.due;if(job.repeat)job.due+=job.interval;else jobs.delete(key);
          job.callback(...(job.frame?[clockTime]:job.args));await Promise.resolve();
        }clockTime=end;
      };
    }
    const storage={ get length(){return store.size;}, key:index=>[...store.keys()][index]??null,
      getItem:key=>store.get(String(key))??null,setItem:(key,value)=>{store.set(String(key),String(value));},
      removeItem:key=>{store.delete(String(key));},clear:()=>store.clear() };
    const fetch=async (input,options={})=>{
      const url=String(input); requests.push({url,method:options.method||'GET',body:options.body??null});
      const fixture=Object.hasOwn(environment.fixtures||{},url)?environment.fixtures[url]:null;
      if(!fixture) throw new TypeError('Keine lokale API-Antwort für '+url);
      if(fixture.networkError) throw new TypeError('Netzwerkfehler');
      if(options.signal?.aborted) throw new DOMException('Abgebrochen','AbortError');
      let body=fixture.body, status=fixture.status??200;
      if(fixture.echoJson){
        if(String(options.method||'GET').toUpperCase()!=='POST'){status=405;body={error:'POST erforderlich'};}
        else if(!new Headers(options.headers).get('content-type')?.includes('application/json')){status=400;body={error:'JSON-Header erforderlich'};}
        else {try{body=JSON.parse(options.body);}catch{status=400;body={error:'Ungültiges JSON'};}}
      }
      const response=new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
      const json=response.json.bind(response);
      response.json=()=>{const job=json();pending.add(job);job.then(()=>pending.delete(job),()=>pending.delete(job));return job;};
      return response;
    };
    Object.assign(self,{document,localStorage:storage,fetch,Event,CustomEvent});
    // LinkeDOM supplies tree operations; unsupported layout/navigation is deliberately absent.
    self.window={document,localStorage:storage,fetch,Event,CustomEvent,...nativeTimers,...(environment.clock?{setTimeout:self.setTimeout,setInterval:self.setInterval,clearTimeout:self.clearTimeout,clearInterval:self.clearInterval,requestAnimationFrame:self.requestAnimationFrame,cancelAnimationFrame:self.cancelAnimationFrame}:{}),performance:self.performance};
    return {document,storage,fetch};
  }
  function mark() { [...document.body.querySelectorAll('*')].forEach((node,index)=>node.setAttribute('data-codeklar-node',String(index))); }
  async function actions(list) {
    for(const action of list||[]) {
      if(action.type==='advance'){if(!advance)throw new Error('Diese Übung hat keine steuerbare Uhr.');await advance(action.ms);while(pending.size)await Promise.allSettled([...pending]);continue;}
      mark();
      const target=document.querySelector(action.selector);
      if(!target) throw new Error('Element nicht gefunden: '+action.selector);
      if(action.value!==undefined) target.value=action.value;
      if(action.checked!==undefined) target.checked=action.checked;
      const event=new Event(action.type,{bubbles:true,cancelable:true});
      if(action.key!==undefined) Object.defineProperty(event,'key',{value:action.key});
      target.dispatchEvent(event);
      // Async handlers in these lessons finish through local fetch/microtasks.
      await new Promise(resolve=>nativeTimeout(resolve,0));
      while(pending.size)await Promise.allSettled([...pending]);
      await Promise.resolve();
    }
  }
  async function evaluate(code, environment, input, task, events) {
    const env=setup(environment);
    let namespace;
    if(data.modules){
      self.console=console;
      const urls=new Map(),building=new Set();
      const build=path=>{
        if(urls.has(path))return urls.get(path);
        if(building.has(path))throw new Error('Zyklische Imports werden noch nicht unterstützt.');
        building.add(path);const module=data.modules[path];let source=module.source;
        const replacements=module.imports.map(item=>({...item,url:build(item.path)}));
        for(const item of replacements.sort((a,b)=>b.start-a.start))source=source.slice(0,item.start)+JSON.stringify(item.url)+source.slice(item.end);
        const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));urls.set(path,url);building.delete(path);return url;
      };
      try{namespace=await import(build(data.entry));}finally{for(const url of urls.values())URL.revokeObjectURL(url);}
    }
    const executor=data.modules?null:new AsyncFunction('console','document','localStorage','fetch','Event','CustomEvent',code+((task||data.initializeBrowser)?'\\nreturn typeof '+data.functionName+' === "function" ? '+data.functionName+' : null;':''));
    let value=data.modules?namespace[data.functionName]:await executor(console,env.document,env.storage,env.fetch,Event,CustomEvent);
    if(task || data.modules || data.initializeBrowser) {
      if(typeof value!=='function') throw new Error('Die Funktion '+data.functionName+' fehlt.');
      value=await value(input);
    }
    await actions(events);
    if(typeof value==='function') value=await value();
    mark();
    return {actual:value,html:document.body.innerHTML,storage:Object.fromEntries(store),requests};
  }
  try {
    if(data.tests) {
      const results=[];
      for(const test of data.tests) {
        const input=structuredClone(test.input),before=JSON.stringify(input);
        try {
          const result=await evaluate(data.code,{...data.browser,...test.browser},input,true,test.actions);
          results.push({input:test.input,expected:test.expected,actual:display(result.actual),passed:equal(result.actual,test.expected)&&(!data.preserveInput||JSON.stringify(input)===before),changed:data.preserveInput&&JSON.stringify(input)!==before});
        } catch(error){results.push({input:test.input,expected:test.expected,actual:error.message,passed:false});}
      }
      self.postMessage({logs,results});
    } else {
      const result=await evaluate(data.code,data.browser,data.browserInput??{},false,data.browserActions);
      self.postMessage({logs,html:result.html,storage:result.storage,requests:result.requests,...(data.browser.clock?{clock:clockTime}:{} )});
    }
  } catch(error){self.postMessage({logs,error:error.message});}
};`;
