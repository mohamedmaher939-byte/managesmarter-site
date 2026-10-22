/* CAS portal helpers — talks to Supabase RPC only (tables are locked by RLS) */
(function(){
  var URL_='https://vcevkgyehgemwjzkfhdg.supabase.co/rest/v1/rpc/';
  var KEY='sb_publishable__v0YyINz4fNpAXpiPMuc_g_lX4zk2nM';
  window.casRpc=function(fn,args){
    return fetch(URL_+fn,{method:'POST',headers:{'apikey':KEY,'Content-Type':'application/json'},body:JSON.stringify(args)})
      .then(function(r){return r.text().then(function(t){var j=t?JSON.parse(t):null;if(!r.ok)throw new Error((j&&j.message)||'error');return j;});});
  };
  window.casEsc=function(s){var d=document.createElement('div');d.textContent=s==null?'':String(s);return d.innerHTML;};
  window.casSafeLink=function(u){return /^https:\/\//i.test(u||'')?u:'';};
  window.casLO={1:'Identify own strengths & areas for growth',2:'Show new challenges undertaken, new skills developed',3:'Initiate and plan a CAS experience',4:'Show commitment to and perseverance in CAS',5:'Demonstrate skills and recognize benefits of working collaboratively',6:'Engage with issues of global significance',7:'Recognize and consider ethics of choices and actions'};
  window.casStrandName={C:'Creativity',A:'Activity',S:'Service'};
  window.casCard=function(e,extra){
    var st=(e.strands||[]).map(function(x){return '<span class="chip '+x+'">'+x+'</span>';}).join('');
    var lo=(e.outcomes||[]).map(function(n){return '<span class="chip lo" title="'+casEsc(casLO[n]||'')+'">LO'+n+'</span>';}).join('');
    var l=casSafeLink(e.link);
    return '<article class="entry"><header><h3>'+casEsc(e.title)+'</h3><div class="meta">'+st+lo+
      '<span class="muted">'+casEsc(e.kind)+(e.happened_on?' · '+casEsc(e.happened_on):'')+(e.hours!=null?' · '+casEsc(e.hours)+' h':'')+'</span></div></header>'+
      (e.description?'<p>'+casEsc(e.description)+'</p>':'')+
      (e.reflection?'<p class="refl"><b>Reflection · تأمل:</b> '+casEsc(e.reflection)+'</p>':'')+
      (l?'<p><a href="'+casEsc(l)+'" target="_blank" rel="noopener noreferrer">Evidence / الدليل ↗</a></p>':'')+
      (e.teacher_note?'<p class="tnote"><b>Teacher note · ملاحظة المنسق:</b> '+casEsc(e.teacher_note)+'</p>':'')+
      (extra||'')+'</article>';
  };
  window.casCSS='*{box-sizing:border-box}body{margin:0;font:16px/1.5 system-ui,"Segoe UI",Tahoma,sans-serif;background:#171B38;color:#F6F4EE}'+
  'main{max-width:860px;margin:0 auto;padding:20px 16px 60px}h1{font-size:1.6rem;margin:.2em 0}h2{font-size:1.2rem;margin:1.4em 0 .5em}'+
  '.muted{color:#B9BFDE;font-size:.9rem}.card,.entry{background:#21274F;border:2px solid #3B4373;border-radius:16px;padding:16px;margin:12px 0}'+
  '.entry h3{margin:0 0 6px;font-size:1.05rem}.meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}'+
  '.chip{display:inline-block;padding:0 .6em;border-radius:99px;font-weight:700;color:#171B38;background:#8FB4FF;font-size:.85rem}'+
  '.chip.C{background:#FF6FAE}.chip.A{background:#FFB627}.chip.S{background:#2EC4B6}.chip.lo{background:#C9D3FF}'+
  '.refl{border-inline-start:4px solid #8FB4FF;padding-inline-start:10px}.tnote{background:#2b3366;border-radius:10px;padding:8px 10px}'+
  'label{display:block;margin:10px 0 4px;font-weight:600}input,select,textarea{width:100%;padding:10px;border-radius:10px;border:2px solid #3B4373;background:#171B38;color:#F6F4EE;font:inherit}'+
  'textarea{min-height:90px}button{padding:10px 18px;border-radius:12px;border:0;background:#8FB4FF;color:#171B38;font:700 1rem inherit;cursor:pointer}button.alt{background:#3B4373;color:#F6F4EE}'+
  'a{color:#8FB4FF}.row{display:flex;gap:10px;flex-wrap:wrap}.row>*{flex:1 1 140px}.checks label{display:inline-flex;gap:6px;align-items:center;font-weight:400;margin:4px 12px 4px 0}.checks input{width:auto}'+
  '.bar{display:flex;gap:12px;flex-wrap:wrap}.stat{flex:1 1 90px;text-align:center}.stat b{display:block;font-size:1.5rem}'+
  '.err{color:#FF8A8A}.ok{color:#6BE38D}';
})();
