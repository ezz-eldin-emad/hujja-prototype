const $ = (s, root=document) => root.querySelector(s);
    const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const normalize = s => String(s || "").toLowerCase()
      .replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه")
      .replace(/[\u064B-\u065F]/g,"").replace(/[٠-٩]/g, d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/\s+/g," ").trim();
    const hash = (text, salt) => { let h=5381; for(const c of (salt+text)) h=((h*33)^c.charCodeAt(0))>>>0; return h.toString(16); };
    const money = n => new Intl.NumberFormat("ar-EG", {maximumFractionDigits:0}).format(Number(n)||0)+" ج.م";
    const now = () => new Date().toISOString();
    const dateTime = s => s ? new Date(s).toLocaleDateString("ar-EG") : "—";

    const seed = () => ({
      users: [
        {email:"admin@hujja.test", password:hash("1234","a"), salt:"a", role:"admin", name:"إدارة المكتب", rate:500},
        {email:"lawyer@hujja.test", password:hash("1234","b"), salt:"b", role:"lawyer", name:"المحامي المسؤول", rate:300},
        {email:"secretary@hujja.test", password:hash("1234","c"), salt:"c", role:"secretary", name:"سكرتارية المكتب", rate:100}
      ],
      clients: [
        {id:"C1", name:"محمد علي حسن", phone:"01000000000", email:"", nationalId:"29801011234567"},
        {id:"C2", name:"سارة أحمد محمود", phone:"01111111111", email:"sara@example.com", nationalId:""}
      ],
      matters: [
        {id:"M-2026-001", title:"نزاع عقد إيجار", client:"C1", status:"open", date:"2026-11-10", team:["lawyer@hujja.test","admin@hujja.test"], claimant:"محمد علي حسن", defendant:"شركة النور العقارية", court:"محكمة شمال القاهرة الابتدائية", degree:"ابتدائي", subject:"مطالبة بسداد أجرة المتأخرة والمصروفات", parties:["شركة النور العقارية"], note:"موعد جلسة قريب", requiredDocuments:["عقد الإيجار","صورة الهوية","التوكيل","مذكرة الطلبات"], procedures:[{name:"تحرير الدعوى وتحديد الطلبات",status:"done",due:"2026-11-12"},{name:"تقديم المستندات والقيد",status:"done",due:"2026-11-15"},{name:"حضور الجلسة الأولى",status:"pending",due:"2026-11-23"},{name:"تقديم مذكرة الرد",status:"missing",due:"2026-11-25"}],statusHistory:[{status:"open",time:"2026-11-10T09:00:00.000Z",by:"admin@hujja.test"}]},
        {id:"M-2026-002", title:"مطالبة تعويض", client:"C2", status:"pending", date:"2026-11-18", team:["lawyer@hujja.test","secretary@hujja.test","admin@hujja.test"], claimant:"سارة أحمد محمود", defendant:"محمد عبد الرحمن", court:"محكمة التجمعات الابتدائية", degree:"ابتدائي", subject:"تعويض عن ضرر ناتج عن إخلال عقدي", parties:["محمد عبد الرحمن"], note:"بانتظار المستندات", requiredDocuments:["صورة الهوية","التوكيل","مرفقات الإخلال","مذكرة الطلبات"], procedures:[{name:"جمع مستندات الإثبات",status:"missing",due:"2026-11-21"},{name:"تحرير الدعوى",status:"done",due:"2026-11-20"},{name:"سداد الرسوم القضائية",status:"pending",due:"2026-11-24"},{name:"متابعة ميعاد الطعن",status:"pending",due:"2026-12-10"}],statusHistory:[{status:"open",time:"2026-11-18T09:00:00.000Z",by:"secretary@hujja.test"},{status:"pending",time:"2026-11-20T11:00:00.000Z",by:"lawyer@hujja.test"}]}
      ],
      invoices: [
        {id:"INV-001", client:"C1", matter:"M-2026-001", date:"2026-11-12", due:"2026-11-30", amount:12500, status:"paid"},
        {id:"INV-002", client:"C2", matter:"M-2026-002", date:"2026-11-20", due:"2026-12-05", amount:7800, status:"pending"}
      ],
      events: [
        {id:"E1", type:"جلسة", matter:"M-2026-001", lawyer:"lawyer@hujja.test", room:"قاعة 4", start:"2026-11-23T10:00", end:"2026-11-23T11:00"},
        {id:"E2", type:"موعد تسليم", matter:"M-2026-002", lawyer:"lawyer@hujja.test", room:"المكتب", start:"2026-11-25T12:00", end:"2026-11-25T12:30"}
      ],
      tasks: [
        {id:"T1", title:"تجهيز مذكرة الرد", matter:"M-2026-001", assigned:"lawyer@hujja.test", due:"2026-11-24", status:"todo"},
        {id:"T2", title:"إرسال المستندات للعميل", matter:"M-2026-002", assigned:"secretary@hujja.test", due:"2026-11-22", status:"doing"},
        {id:"T3", title:"تحضير عقد الأتعاب", matter:"M-2026-001", assigned:"secretary@hujja.test", due:"2026-11-20", status:"done"}
      ],
      timeEntries: [
        {id:"TE1", matter:"M-2026-001", user:"lawyer@hujja.test", minutes:90, billable:true, invoiced:false, rate:300},
        {id:"TE2", matter:"M-2026-002", user:"lawyer@hujja.test", minutes:45, billable:false, invoiced:false, rate:300}
      ],
      expenses: [
        {id:"X1", matter:"M-2026-001", description:"مصاريف تصوير مستندات", amount:350, invoiced:false}
      ],
      funds: [
        {id:"F1", client:"C1", type:"deposit", amount:15000, date:"2026-11-10"},
        {id:"F2", client:"C1", type:"withdraw", amount:12500, date:"2026-11-12"}
      ],
      notifications: [
        {to:"lawyer@hujja.test",message:"معلومة عامة — تم تحديث قواعد المواعيد الإجرائية. ملخص التعديل: تعديل مدد المذكرات والإخطار بالطعن. تحليل القضايا المتأثرة: M-2026-001 — نزاع عقد إيجار، M-2026-002 — مطالبة تعويض",matterIds:["M-2026-001","M-2026-002"],time:"2026-11-22T09:00:00.000Z",read:false,amendmentId:"A1",general:true},
        {to:"admin@hujja.test",message:"معلومة عامة — تم تحديث قواعد المواعيد الإجرائية. ملخص التعديل: تعديل مدد المذكرات والإخطار بالطعن.",matterIds:["M-2026-001","M-2026-002"],time:"2026-11-22T09:00:00.000Z",read:false,amendmentId:"A1",general:true}
      ],
      documents: [
        {id:"D1", matter:"M-2026-001", name:"عقد الإيجار.pdf", versions:2, status:"جاهز", confidence:"مرتفع"},
        {id:"D2", matter:"M-2026-002", name:"مخالصة المستندات.docx", versions:1, status:"قيد المراجعة", confidence:"متوسط"}
      ],
      reviews: [
        {id:"R1", title:"اعتماد صيغة التوكيل", matter:"M-2026-001", body:"تم إعداد التوكيل الخاص بالقضية للمراجعة الاعتماد.", status:"pending", priority:"عاجل"},
        {id:"R2", title:"مراجعة مذكرة الرد", matter:"M-2026-002", body:"يرجى مراجعة المذكرة قبل اعتمادها وإرسالها.", status:"approved", priority:"عادي"}
      ],
      legalCorpus: [
        {id:"L1",source:"قانون الإيجار القديم",article:"المادة 20",text:"يلزم المستأجر بدفع الأجرة في المواعيد المتفق عليها بعقد الإيجار.",effective:"تاريخ النفاذ 1996"},
        {id:"L2",source:"القانون المدني المصري",article:"المادة 147",text:"العقد شريعة المتعاقدين ولا يجوز نقضه أو تعديله إلا باتفاق الطرفين أو لدواعي القوة القاهرة.",effective:"تاريخ النفاذ 1949"},
        {id:"L3",source:"القانون المدني المصري",article:"المادة 226",text:"كل خطأ سبب ضرر للغير يلزم مرتكبه بالتعويض.",effective:"تاريخ النفاذ 1949"},
        {id:"J1",source:"مبادئ محكمة النقض",article:"حكم تعويض",text:"وجبت المحكمة التعويض عن الضرر المادي والأدبي الناجم مباشرة عن الفعل الضار.",effective:"سابقة قضائية"},
        {id:"J2",source:"مبادئ محكمة النقض",article:"حكم عقد",text:"لا يجوز فسخ العقد إلا لقيام عيب جسيم أو إخلال جوهري يثبت بالإسقاط أو المحكمة.",effective:"سابقة قضائية"}
      ],
      legalChat: [],
      legalSessions: [],
      amendments: [
        {id:"A1",source:"الجريدة الرسمية",title:"تعديل على تنظيم المواعيد الإجرائية",summary:"تم تعديل بعض مدد تقديم المذكرات وإخطار الأطراف.",date:"2026-11-15",affected:["M-2026-001","M-2026-002"],read:false,general:true}
      ],
      audit: [{time:now(), user:"system", action:"تم إنشاء نسخة تجريبية"}]
    });

    let db;
    try { db = JSON.parse(localStorage.getItem("hujja-v2")); } catch (_) {}
    db = db || seed();
    if(db) {
      const base=seed();
      Object.entries(base).forEach(([key,value])=>{ if(!db[key]) db[key]=value; });
      base.matters.forEach(seedMatter=>{
        const current=db.matters.find(m=>m.id===seedMatter.id);
        if(current) db.matters[db.matters.indexOf(current)]={...seedMatter,...current};
      });
      db.users.forEach(u=>{
        if(u.role==="assistant") u.role="secretary";
      });
    }
    const save = () => localStorage.setItem("hujja-v2", JSON.stringify(db));
    const state = {user:null, pendingUser:null, otp:"", page:"dashboard", search:"", timer:null, selectedMatter:"", legalTemplate:"", legalWorkflow:"", activeLegalSession:""};

    function audit(action) {
      db.audit.unshift({time:now(), user:state.user?.email || "system", action});
      save();
    }
    function toast(message) {
      let el = $(".toast");
      if (!el) { el=document.createElement("div"); el.className="toast"; document.body.append(el); }
      el.textContent=message; el.classList.add("show");
      clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove("show"),2600);
    }
    const clientName = id => db.clients.find(x=>x.id===id)?.name || "—";
    const badge = (text, cls) => `<span class="badge ${cls||""}">${esc(text)}</span>`;
    const canCreateClient = () => ["admin","secretary","lawyer"].includes(state.user.role);
    const visibleMatters = () => state.user.role==="admin" ? db.matters : db.matters.filter(m=>m.team?.includes(state.user.email));
    function levenshtein(a,b) {
      const m=Array.from({length:b.length+1},()=>[]);
      for(let j=0;j<=b.length;j++) m[0][j]=j;
      for(let i=0;i<=a.length;i++) m[i][0]=i;
      for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]==b[j-1]?0:1));
      return m[a.length][b.length];
    }
    function fuzzyMatches(name) {
      if(!name?.trim()) return [];
      const q=normalize(name);
      return [...db.clients.map(c=>({name:c.name,type:"عميل",id:c.id})),...db.matters.flatMap(m=> (m.parties||[]).map(p=>({name:p,type:"طرف قضية",id:m.id})))]
        .map(r=>{const n=normalize(r.name);const distance=levenshtein(q,n);const score=n.includes(q)||q.includes(n)?1:1-distance/Math.max(q.length,n.length,1);return{...r,score}})
        .filter(r=>r.score>=.72)
        .sort((a,b)=>b.score-a.score);
    }

    function loginView() {
      if(state.pendingUser) {
        document.getElementById("app").innerHTML = `
          <main class="login-page"><section class="login-card">
            <div class="login-brand"><div class="brand-mark">ح</div><div><h1>التحقق بخطوتين</h1><p>تم إرسال رمز تجريبي إلى حسابك</p></div></div>
            <div class="otp-code">${esc(state.otp)}</div>
            <form id="otp-form">
              <div class="field"><label for="otp">رمز التحقق</label><input id="otp" inputmode="numeric" maxlength="6" required></div>
              <button class="btn primary" type="submit">تأكيد ودخول</button>
            </form>
            <button class="text-btn" style="width:100%;margin-top:12px" onclick="cancelOtp()">العودة لتسجيل الدخول</button>
          </section></main>`;
        $("#otp-form").addEventListener("submit", e=>{
          e.preventDefault();
          if($("#otp").value.trim()!==state.otp) return toast("رمز التحقق غير صحيح");
          state.user=state.pendingUser;
          state.pendingUser=null;
          state.page="dashboard";
          audit("تسجيل دخول موثق برمز التحقق");
          render();
        });
        return;
      }
      document.getElementById("app").innerHTML = `
        <main class="login-page">
          <section class="login-card">
            <div class="login-brand">
              <div class="brand-mark">ح</div>
              <div><h1>حُجّة</h1><p>نظام إدارة مكتب المحاماة</p></div>
            </div>
            <form id="login-form">
              <div class="field"><label for="email">البريد الإلكتروني</label><input id="email" value="" placeholder="اختر أحد الأدوار بالأسفل" autocomplete="username"></div>
              <div class="field"><label for="password">كلمة المرور</label><input id="password" type="password" value="1234" autocomplete="current-password"></div>
              <button class="btn primary" type="submit">تسجيل الدخول</button>
            </form>
            <div class="role-shortcuts">
              <div class="role-shortcuts-title">تجربة سريعة حسب الدور</div>
              <button type="button" class="role-shortcut" onclick="selectRole('admin@hujja.test')"><strong>مدير المكتب</strong><small>admin@hujja.test</small></button>
              <button type="button" class="role-shortcut" onclick="selectRole('lawyer@hujja.test')"><strong>المحامي</strong><small>lawyer@hujja.test</small></button>
              <button type="button" class="role-shortcut" onclick="selectRole('secretary@hujja.test')"><strong>السكرتارية</strong><small>secretary@hujja.test</small></button>
            </div>
            <div class="login-hint">يتم إنشاء الحسابات وتعديل صلاحياتها من إدارة النظام فقط.</div>
          </section>
        </main>`;
      $("#login-form").addEventListener("submit", e => {
        e.preventDefault();
        const email=$("#email").value.trim().toLowerCase();
        const password=$("#password").value;
        const user=db.users.find(u=>u.email===email);
        if(!user || user.password!==hash(password,user.salt)) { toast("البريد الإلكتروني أو كلمة المرور غير صحيحة"); return; }
        state.pendingUser=user;
        state.otp=String(Math.floor(100000+Math.random()*900000));
        render();
      });
    }
    function cancelOtp(){ state.pendingUser=null; state.otp=""; render(); }
    function selectRole(email){
      const input=$("#email");
      if(input) {
        input.value=email;
        input.focus();
        toast("تم اختيار الدور — اضغط تسجيل الدخول");
      }
    }

    const icons = {
      dashboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
      cases:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h18v12H3zM8 7V4h8v3M3 12h18"/></svg>`,
      clients:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="4"/><path d="M3 21c0-4 2.7-7 6-7s6 3 6 7M17 8h4M19 6v4"/></svg>`,
      invoices:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>`,
      users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7M16 4c3 0 5 2 5 5"/><path d="M17 12c3 0 5 2 5 5"/></svg>`,
      calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>`,
      tasks:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l2 2 4-5M5 3h14v18H5z"/></svg>`,
      time:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>`,
      funds:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9V6h10v3"/></svg>`,
      docs:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5M8 12h8M8 16h8"/></svg>`,
      review:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>`,
      legal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v18M5 6h14M7 6l-4 7h8zM17 6l-4 7h8zM5 21h14"/></svg>`,
      compliance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11l2 2 4-4M8 17h8"/></svg>`,
      law:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>`,
      audit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`
    };
    const roleNav = {
      admin: [
        ["dashboard","نظرة عامة"],["cases","القضايا"],["clients","العملاء"],["calendar","التقويم"],
        ["tasks","المهام"],["compliance","التحليل والإجراءات"],["invoices","الفواتير"],
        ["docs","المستندات"],["legal","المساعد القانوني"],["review","المراجعة"],["users","المستخدمون"],["audit","سجل النشاط"]
      ],
      lawyer: [
        ["dashboard","نظرة عامة"],["cases","القضايا"],["calendar","التقويم"],["tasks","مهامي"],
        ["compliance","التحليل والإجراءات"],["invoices","الفواتير"],["docs","المستندات"],["legal","المساعد القانوني"],["review","المراجعة"],["audit","سجل النشاط"]
      ],
      secretary: [
        ["dashboard","نظرة عامة"],["clients","العملاء"],["cases","القضايا"],["calendar","التقويم"],
        ["tasks","المهام"],["compliance","التحليل والإجراءات"],["invoices","الفواتير"],["docs","المستندات"],["audit","سجل النشاط"]
      ]
    };

    function markLegalNotificationsRead(){
      (db.notifications||[]).forEach(n=>{if(n.to===state.user.email)n.read=true});
      save();setPage("dashboard");toast("تم تعليم التحديثات كمقروءة");
    }
    function dashboard() {
      const openCases=db.matters.filter(x=>x.status==="open").length;
      const overdue=db.invoices.filter(x=>x.status==="overdue").length;
      const pending=db.invoices.filter(x=>x.status==="pending").reduce((n,x)=>n+x.amount,0);
      const roleTitle=state.user.role==="admin"?"نظرة عامة — إدارة المكتب":state.user.role==="lawyer"?"نظرة عامة — المحامي المسؤول":"نظرة عامة — السكرتارية";
      const alerts=visibleMatters().flatMap(complianceAlerts).filter(a=>a.severity==="high").slice(0,5);
      const legalNotifications=(db.notifications||[]).filter(n=>n.to===state.user.email&&!n.read).slice(0,5);
      const legalAmendments=(db.amendments||[]).filter(a=>state.user.role==="admin"||a.affected?.some(id=>visibleMatters().some(m=>m.id===id))).slice(0,5);
      return `
        <div class="page-head"><div><h1>${roleTitle}</h1><p>ملخص أعمال مكتبك اليوم.</p></div>${state.user.role==="lawyer"?"":`<button class="btn primary" onclick="setPage('invoices')">إنشاء فاتورة</button>`}</div>
        ${alerts.length?`<div class="card card-pad" style="margin-bottom:16px;border-right:4px solid var(--red)"><strong>تنبيهات تحتاج متابعة</strong>${alerts.map(a=>`<div style="margin-top:8px">${badge(a.title,a.severity==="high"?"overdue":"pending")} ${esc(a.text)} — <button class="text-btn" onclick="openComplianceMatter('${a.matter}')">${esc(a.matter)}</button></div>`).join("")}</div>`:""}
        ${legalAmendments.length?`<div class="card card-pad" style="margin-bottom:16px;border-right:4px solid var(--gold)"><strong>تحديثات قانونية سارية</strong>${legalAmendments.map(a=>`<div style="margin-top:8px">${badge(a.general?"معلومة عامة":"تحديث خاص","pending")} ${badge(a.article||a.title,"pending")} ${esc(a.source)} — ${esc(a.summary||a.title)} <small style="color:var(--muted)"> (${esc(a.date||"—")})</small>${a.affected?.length?`<br><small>القضايا المتأثرة: ${a.affected.map(id=>esc(id)).join("، ")}</small>`:"<br><small>لا توجد قضايا متأثرة محددة؛ الإشعار معلومة عامة.</small>"}</div>`).join("")}<div style="margin-top:10px"><button class="text-btn" onclick="markLegalNotificationsRead()">تعليم التنبيهات كمقروءة</button></div></div>`:""}
        <section class="grid">
          <div class="card card-pad span-3 metric"><div class="metric-label"><span>القضايا النشطة</span><span>●</span></div><div><div class="metric-value">${openCases}</div><div class="metric-note">قضية مفتوحة</div></div></div>
          <div class="card card-pad span-3 metric"><div class="metric-label"><span>العملاء المسجلون</span><span>●</span></div><div><div class="metric-value">${db.clients.length}</div><div class="metric-note">${db.clients.length} ملف عميل</div></div></div>
          <div class="card card-pad span-3 metric"><div class="metric-label"><span>فواتير معلقة</span><span>●</span></div><div><div class="metric-value">${money(pending)}</div><div class="metric-note">${db.invoices.filter(x=>x.status==="pending").length} فاتورة تحتاج متابعة</div></div></div>
          <div class="card card-pad span-3 metric"><div class="metric-label"><span>فواتير متأخرة</span><span>●</span></div><div><div class="metric-value">${overdue}</div><div class="metric-note">${overdue ? "تحتاج مراجعة عاجلة" : "لا توجد متأخرات"}</div></div></div>

          <div class="card span-8">
            <div class="card-pad card-title"><h2>أحدث القضايا</h2><button class="text-btn" onclick="setPage('cases')">عرض الكل</button></div>
            <div class="table-wrap"><table><thead><tr><th>رقم القضية</th><th>الموضوع</th><th>العميل</th><th>الحالة</th></tr></thead>
            <tbody>${db.matters.slice().reverse().slice(0,5).map(m=>`<tr><td>${esc(m.id)}</td><td>${esc(m.title)}</td><td>${esc(clientName(m.client))}</td><td>${badge(m.status==="open"?"مفتوحة":m.status==="pending"?"قيد المتابعة":"مغلقة",m.status)}</td></tr>`).join("") || `<tr><td colspan="4"><div class="empty">لا توجد قضايا بعد</div></td></tr>`}</tbody></table></div>
          </div>
          <div class="card card-pad span-4">
            <div class="card-title"><h2>الفواتير الأخيرة</h2><button class="text-btn" onclick="setPage('invoices')">عرض الكل</button></div>
            ${db.invoices.slice().reverse().slice(0,4).map(i=>`<div style="display:flex;justify-content:space-between;border-bottom:1px solid #edf0f4;padding:12px 0"><div><strong>${esc(i.id)}</strong><br><small style="color:var(--muted)">${esc(clientName(i.client))}</small></div><div style="text-align:left">${money(i.amount)}<br>${badge(i.status==="paid"?"مدفوعة":i.status==="pending"?"معلقة":"متأخرة",i.status)}</div></div>`).join("") || `<div class="empty">لا توجد فواتير</div>`}
          </div>
        </section>`;
    }

    function cases() {
      const matters=visibleMatters();
      return `
        <div class="page-head"><div><h1>القضايا</h1><p>القضايا المخصصة لفريقك فقط.</p></div>${state.user.role==="secretary"||state.user.role==="lawyer"?`<button class="btn primary" onclick="openModal('matter')">قضية جديدة</button>`:""}</div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>رقم القضية</th><th>موضوع القضية</th><th>الموكل</th><th>الخصم</th><th>المحكمة والدرجة</th><th>الحالة</th><th></th></tr></thead>
        <tbody>${matters.map(m=>`<tr><td><strong>${esc(m.id)}</strong></td><td>${esc(m.subject||m.title)}</td><td>${esc(m.claimant||clientName(m.client))}</td><td>${esc(m.defendant||"—")}</td><td>${esc(m.court||"—")}<br><small>${esc(m.degree||"—")}</small></td><td>${badge(m.status==="open"?"مفتوحة":m.status==="pending"?"قيد المتابعة":"مغلقة",m.status)} ${state.user.role==="lawyer"?`<select onchange="changeMatterStatus('${m.id}',this.value)" style="margin-right:6px"><option value="open" ${m.status==="open"?"selected":""}>مفتوحة</option><option value="pending" ${m.status==="pending"?"selected":""}>قيد المتابعة</option><option value="closed" ${m.status==="closed"?"selected":""}>مغلقة</option></select>`:""}</td><td><button class="btn" onclick="openMatterDetail('${m.id}')">تفاصيل القضية</button></td></tr>`).join("")||`<tr><td colspan="7"><div class="empty">لا توجد قضايا مخصصة لك</div></td></tr>`}</tbody></table></div></div>`;
    }
    function changeMatterStatus(id,status){
      const matter=db.matters.find(m=>m.id===id);
      if(!matter) return;
      matter.status=status;
      matter.statusHistory=matter.statusHistory||[];
      matter.statusHistory.push({status,time:now(),by:state.user.email});
      audit("تغيير حالة القضية "+id+" إلى "+(status==="open"?"مفتوحة":status==="pending"?"قيد المتابعة":"مغلقة"));
      save(); setPage("cases"); toast("تم تحديث حالة القضية");
    }
    function openMatterDetail(id){
      const m=db.matters.find(x=>x.id===id);
      if(!m) return;
      if(!visibleMatters().some(x=>x.id===id)) return toast("غير مصرح بعرض هذه القضية");
      const docs=db.documents.filter(d=>d.matter===id);
      const chats=db.legalSessions.filter(s=>s.matter===id);
      let modal=$("#modal");
      if(!modal){modal=document.createElement("div");modal.id="modal";modal.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,.38);display:grid;place-items:center;padding:16px;z-index:40";document.body.append(modal)}
      modal.innerHTML=`<section class="card card-pad" style="width:min(820px,100%);max-height:92vh;overflow:auto">
        <div class="card-title"><h2>${esc(m.title)} — ${esc(m.id)}</h2><button class="icon-btn" onclick="closeModal()">×</button></div>
        <div class="role-summary">
          <div class="card card-pad"><strong>الموكل</strong><p>${esc(m.claimant||clientName(m.client))}</p></div>
          <div class="card card-pad"><strong>الخصم</strong><p>${esc(m.defendant||m.parties?.join("، ")||"—")}</p></div>
          <div class="card card-pad"><strong>المحكمة والدرجة</strong><p>${esc(m.court||"—")}<br>${esc(m.degree||"—")}</p></div>
        </div>
        <div class="card card-pad" style="margin-top:12px"><strong>موضوع الدعوى</strong><p>${esc(m.subject||m.title)}</p></div>
        <div class="card card-pad" style="margin-top:12px"><strong>المستندات المرتبطة</strong><p>${docs.length?docs.map(d=>esc(d.name)+" ("+d.versions+" إصدار)").join("<br>"):"لا توجد مستندات بعد"}</p><button class="btn" onclick="closeModal();openDocsForMatter('${m.id}')">فتح مستندات القضية</button></div>
        <div class="card card-pad" style="margin-top:12px"><strong>محادثات المساعد القانوني</strong><p>${chats.length?chats.map(c=>esc(c.title)).join("<br>"):"لا توجد محادثات مرتبطة بهذه القضية"}</p>${["lawyer","admin"].includes(state.user.role)?`<button class="btn" onclick="closeModal();openLegalForMatter('${m.id}')">فتح الشات لهذه القضية</button>`:""}</div>
        <div class="card card-pad" style="margin-top:12px"><strong>سجل حالة القضية</strong><p>${(m.statusHistory||[]).map(h=>esc(h.status)+" — "+new Date(h.time).toLocaleString("ar-EG")+" — "+esc(h.by)).join("<br>")||"لا يوجد سجل"}</p></div>
        <div class="form-actions"><button class="btn primary" onclick="closeModal();openComplianceMatter('${m.id}')">تحليل الإجراءات والتنبيهات</button></div>
      </section>`;
    }

    function clients() {
      return `
        <div class="page-head"><div><h1>العملاء</h1><p>ملفات العملاء وبيانات التواصل الخاصة بهم.</p></div><button class="btn primary" onclick="openModal('client')">عميل جديد</button></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>رقم الهاتف</th><th>البريد الإلكتروني</th><th>الرقم القومي</th><th>القضايا</th><th></th></tr></thead>
        <tbody>${db.clients.map(c=>`<tr><td><strong>${esc(c.name)}</strong></td><td>${esc(c.phone||"—")}</td><td>${esc(c.email||"—")}</td><td>${esc(c.nationalId||"—")}</td><td>${db.matters.filter(m=>m.client===c.id).length}</td><td><button class="btn" onclick="openClientProfile('${c.id}')">الملف</button></td></tr>`).join("")}</tbody></table></div></div>`;
    }
    function openClientProfile(id){
      const client=db.clients.find(c=>c.id===id);
      if(!client) return;
      const matters=db.matters.filter(m=>m.client===id);
      const invoices=db.invoices.filter(i=>i.client===id);
      const balance=db.funds.filter(f=>f.client===id).reduce((n,f)=>n+(f.type==="deposit"?f.amount:-f.amount),0);
      let modal=$("#modal");
      if(!modal){modal=document.createElement("div");modal.id="modal";modal.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,.38);display:grid;place-items:center;padding:16px;z-index:40";document.body.append(modal)}
      modal.innerHTML=`<section class="card card-pad" style="width:min(720px,100%)"><div class="card-title"><h2>${esc(client.name)}</h2><button class="icon-btn" onclick="closeModal()">×</button></div><div class="role-summary"><div class="card card-pad"><strong>القضايا</strong><p>${matters.map(m=>esc(m.id)).join("، ")||"لا توجد قضايا"}</p></div><div class="card card-pad"><strong>الفواتير</strong><p>${invoices.map(i=>esc(i.id)+" — "+money(i.amount)).join("<br>")||"لا توجد فواتير"}</p></div><div class="card card-pad"><strong>الرصيد المتاح</strong><p>${money(balance)}</p></div></div></section>`;
    }

    function invoices() {
      const clientBalances=db.clients.map(c=>{const balance=db.funds.filter(f=>f.client===c.id).reduce((n,f)=>n+(f.type==="deposit"?f.amount:-f.amount),0);return{c,balance}});
      return `
        <div class="page-head"><div><h1>الفواتير والحسابات</h1><p>فاتورة واحدة تجمع الوقت والمصروفات والقضية والمدفوعات ورصيد العميل.</p></div><div><button class="btn" onclick="openModal('invoice')">إنشاء فاتورة يدويًا</button> <button class="btn primary" onclick="compileInvoiceDraft()">تجميع من الوقت والمصروفات</button></div></div>
        <section class="grid" style="margin-bottom:16px">
          <div class="card card-pad span-4"><strong>الفواتير المعلقة</strong><div class="metric-value">${money(db.invoices.filter(i=>i.status==="pending").reduce((n,i)=>n+i.amount,0))}</div></div>
          <div class="card card-pad span-4"><strong>الفواتير المدفوعة</strong><div class="metric-value">${money(db.invoices.filter(i=>i.status==="paid").reduce((n,i)=>n+i.amount,0))}</div></div>
          <div class="card card-pad span-4"><strong>الأرصدة المتاحة للعملاء</strong><div class="metric-value">${money(clientBalances.reduce((n,x)=>n+x.balance,0))}</div></div>
        </section>
        ${state.invoiceDraft?`<div class="card card-pad" style="margin-bottom:16px"><h2 style="margin-top:0">مسودة الفاتورة القابلة للتعديل</h2><div class="form-grid">${state.invoiceDraft.items.map((x,i)=>`<div class="field"><label>${esc(x.description)}</label><input type="number" value="${x.amount}" onchange="state.invoiceDraft.items[${i}].amount=Number(this.value)"></div>`).join("")}</div><div class="form-actions"><button class="btn" onclick="state.invoiceDraft=null;setPage('invoices')">إلغاء المسودة</button><button class="btn primary" onclick="saveCompiledInvoice()">اعتماد وحفظ الفاتورة</button></div></div>`:""}
        <div class="card"><div class="table-wrap"><table><thead><tr><th>رقم الفاتورة</th><th>العميل</th><th>القضية</th><th>التاريخ</th><th>المبلغ</th><th>الحالة</th></tr></thead>
        <tbody>${db.invoices.slice().reverse().map(i=>`<tr><td><strong>${esc(i.id)}</strong></td><td>${esc(clientName(i.client))}</td><td>${esc(i.matter)}</td><td>${dateTime(i.date)}</td><td>${money(i.amount)}</td><td>${badge(i.status==="paid"?"مدفوعة":i.status==="pending"?"معلقة":"متأخرة",i.status)}${i.status!="paid"?` <button class="text-btn" onclick="markInvoicePaid('${i.id}')">تسجيل دفع</button>`:""}</td></tr>`).join("")}</tbody></table></div></div>
        <section class="grid" style="margin-top:16px">
          <div class="card span-6"><div class="card-pad card-title"><h2>الوقت والمصروفات</h2></div><div class="table-wrap"><table><thead><tr><th>القضية</th><th>النوع</th><th>التفاصيل</th><th>القيمة</th></tr></thead><tbody>${db.timeEntries.filter(t=>visibleMatters().some(m=>m.id===t.matter)).map(t=>`<tr><td>${esc(t.matter)}</td><td>وقت عمل</td><td>${t.minutes} دقيقة — ${t.billable?"قابل للفوترة":"غير قابل للفوترة"}</td><td>${money(t.minutes/60*(t.rate||300))}</td></tr>`).join("")}${db.expenses.filter(x=>visibleMatters().some(m=>m.id===x.matter)).map(x=>`<tr><td>${esc(x.matter)}</td><td>مصروف</td><td>${esc(x.description||"مصروف قضائي")}</td><td>${money(x.amount)}</td></tr>`).join("")}</tbody></table></div></div>
          <div class="card span-6"><div class="card-pad card-title"><h2>أرصدة وإيداعات العملاء</h2></div><div class="table-wrap"><table><thead><tr><th>العميل</th><th>إيداع</th><th>سحب</th><th>الرصيد</th></tr></thead><tbody>${clientBalances.map(x=>{const dep=db.funds.filter(f=>f.client===x.c.id&&f.type==="deposit").reduce((n,f)=>n+f.amount,0),wd=db.funds.filter(f=>f.client===x.c.id&&f.type==="withdraw").reduce((n,f)=>n+f.amount,0);return`<tr><td>${esc(x.c.name)}</td><td>${money(dep)}</td><td>${money(wd)}</td><td><strong>${money(x.balance)}</strong></td></tr>`}).join("")}</tbody></table></div></div>
        </section>`;
    }

    function markInvoicePaid(id){
      const invoice=db.invoices.find(i=>i.id===id);
      if(!invoice) return;
      const method=prompt("طريقة الدفع: نقدًا، تحويل بنكي، أو بطاقة؟","تحويل بنكي");
      if(!method) return;
      invoice.status="paid";invoice.paidAt=now();invoice.paymentMethod=method;
      audit("تسجيل سداد فاتورة "+id+" بواسطة "+method);
      save();setPage("invoices");toast("تم تسجيل الدفع");
    }
    function compileInvoiceDraft(){
      const matter=db.matters.find(m=>m.team?.includes(state.user.email)||state.user.role==="admin");
      if(!matter) return toast("لا توجد قضية متاحة");
      const client=state.invoiceDraftClient||matter.client;
      const items=[];
      db.timeEntries.filter(t=>visibleMatters().some(m=>m.id===t.matter)&&t.billable&&!t.invoiced).forEach(t=>items.push({description:"وقت عمل — "+t.matter+" ("+t.minutes+" دقيقة)",amount:+(t.minutes/60*(t.rate||300)).toFixed(2)}));
      db.expenses.filter(x=>visibleMatters().some(m=>m.id===x.matter)&&!x.invoiced).forEach(x=>items.push({description:x.description||"مصروف — "+x.matter,amount:x.amount}));
      state.invoiceDraft={client,items};
      if(!items.length) return toast("لا توجد أوقات أو مصروفات غير مفوترة");
      setPage("invoices");
    }
    function saveCompiledInvoice(){
      if(!state.invoiceDraft) return;
      const id="INV-"+String(db.invoices.length+1).padStart(3,"0");
      const matter=visibleMatters().find(m=>m.client===state.invoiceDraft.client);
      const amount=state.invoiceDraft.items.reduce((n,x)=>n+Number(x.amount||0),0);
      db.invoices.push({id,client:state.invoiceDraft.client,matter:matter?.id||"",date:new Date().toISOString().slice(0,10),due:new Date(Date.now()+15*86400000).toISOString().slice(0,10),amount,status:"pending",items:state.invoiceDraft.items});
      db.timeEntries.forEach(t=>{if(t.billable&&visibleMatters().some(m=>m.id===t.matter))t.invoiced=true});
      db.expenses.forEach(x=>{if(visibleMatters().some(m=>m.id===x.matter))x.invoiced=true});
      audit("اعتماد فاتورة مجمعة "+id);
      state.invoiceDraft=null; save(); setPage("invoices"); toast("تم حفظ الفاتورة");
    }
    function usersPage() {
      if(state.user.role!=="admin") return `<div class="empty">هذه الصفحة متاحة لإدارة المكتب فقط.</div>`;
      return `
        <div class="page-head"><div><h1>المستخدمون</h1><p>إضافة ومراجعة حسابات فريق المكتب. التسجيل الذاتي متوقف.</p></div><button class="btn primary" onclick="openModal('user')">إضافة مستخدم</button></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>البريد الإلكتروني</th><th>الدور</th><th>السعر بالساعة</th></tr></thead>
        <tbody>${db.users.map(u=>`<tr><td><strong>${esc(u.name)}</strong></td><td>${esc(u.email)}</td><td>${u.role==="admin"?"مدير المكتب":u.role==="lawyer"?"محامي":"سكرتارية"}</td><td>${money(u.rate)}</td></tr>`).join("")}</tbody></table></div></div>`;
    }

    function auditPage() {
      return `
        <div class="page-head"><div><h1>سجل النشاط</h1><p>آخر العمليات التي تمت داخل النظام.</p></div></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>التوقيت</th><th>المستخدم</th><th>العملية</th></tr></thead>
        <tbody>${db.audit.map(a=>`<tr><td>${new Date(a.time).toLocaleString("ar-EG")}</td><td>${esc(a.user)}</td><td>${esc(a.action)}</td></tr>`).join("")}</tbody></table></div></div>`;
    }

    function calendarPage() {
      const events=db.events.slice().sort((a,b)=>a.start.localeCompare(b.start));
      return `
        <div class="page-head"><div><h1>التقويم</h1><p>الجلسات والمواعيد النهائية المتاحة للفريق.</p></div></div>
        <div class="card card-pad span-12">
          <div class="form-grid">
            <div class="field"><label>نوع الموعد</label><select id="event-type"><option>جلسة</option><option>موعد تسليم</option><option>اجتماع</option></select></div>
            <div class="field"><label>القضية</label><select id="event-matter">${db.matters.map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
            <div class="field"><label>القاعة أو المكان</label><input id="event-room" placeholder="قاعة 4"></div>
            <div class="field"><label>بداية الموعد</label><input id="event-start" type="datetime-local"></div>
            <div class="field full"><button class="btn primary" onclick="addEvent()">إضافة إلى التقويم</button></div>
          </div>
        </div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>النوع</th><th>القضية</th><th>المكان</th><th>المحامي</th><th>الموعد</th></tr></thead>
        <tbody>${events.map(e=>`<tr><td>${esc(e.type)}</td><td>${esc(e.matter)}</td><td>${esc(e.room)}</td><td>${esc(db.users.find(u=>u.email===e.lawyer)?.name||e.lawyer)}</td><td>${new Date(e.start).toLocaleString("ar-EG")}</td></tr>`).join("")}</tbody></table></div></div>`;
    }
    function addEvent(){
      const start=$("#event-start")?.value;
      if(!start) return toast("اختر وقت بدء الموعد");
      const end=new Date(new Date(start).getTime()+60*60*1000).toISOString().slice(0,16);
      const room=$("#event-room").value||"المكتب";
      const lawyer=state.user.role==="lawyer"?state.user.email:"lawyer@hujja.test";
      const conflicts=db.events.filter(e=>(e.lawyer===lawyer||e.room===room)&&e.start<end&&e.end>start);
      if(conflicts.length&&!confirm("يوجد تعارض في المحامي أو القاعة:\n"+conflicts.map(e=>e.type+" — "+e.room+" — "+e.start).join("\n")+"\nهل تريد المتابعة؟")) return;
      db.events.push({id:"E"+(db.events.length+1),type:$("#event-type").value,matter:$("#event-matter").value,lawyer,room,start,end});
      audit("إضافة موعد في التقويم");
      save(); setPage("calendar"); toast("تم إضافة الموعد");
    }

    function tasksPage(){
      const visible=state.user.role==="lawyer" ? db.tasks.filter(t=>t.assigned===state.user.email) : db.tasks;
      const columns=[["todo","قائمة الانتظار"],["doing","قيد التنفيذ"],["done","مكتملة"]];
      const listView=state.taskListView===true;
      const overdue=t=>t.due&&t.status!="done"&&t.due<new Date().toISOString().slice(0,10);
      return `
        <div class="page-head"><div><h1>${state.user.role==="lawyer"?"مهامي":"المهام"}</h1><p>تنظيم العمل ومتابعة المسؤوليات اليومية.</p></div><button class="btn" onclick="toggleTaskView()">${listView?"عرض Kanban":"عرض القائمة"}</button></div>
        <div class="card card-pad">
          <div class="form-grid">
            <div class="field"><label>عنوان المهمة</label><input id="task-title" placeholder="مثال: تجهيز مذكرة"></div>
            <div class="field"><label>القضية</label><select id="task-matter">${db.matters.map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
            <div class="field"><label>المكلف</label><select id="task-assigned">${db.users.map(u=>`<option value="${u.email}">${esc(u.name)}</option>`).join("")}</select></div>
            <div class="field"><label>تاريخ الاستحقاق</label><input id="task-due" type="date"></div>
            <div class="field full"><button class="btn primary" onclick="addTask()">تكليف المهمة</button></div>
          </div>
        </div>
        ${listView?`<div class="card"><div class="table-wrap"><table><thead><tr><th>المهمة</th><th>القضية</th><th>المكلف</th><th>الموعد</th><th>الحالة</th></tr></thead><tbody>${visible.map(t=>`<tr><td>${esc(t.title)}</td><td>${esc(t.matter)}</td><td>${esc(db.users.find(u=>u.email===t.assigned)?.name||t.assigned)}</td><td>${esc(t.due||"—")} ${overdue(t)?badge("متأخرة","overdue"):""}</td><td>${esc(t.status==="todo"?"قائمة الانتظار":t.status==="doing"?"قيد التنفيذ":"مكتملة")}</td></tr>`).join("")}</tbody></table></div></div>`:
        `<div class="kanban">${columns.map(([status,label])=>`<div class="kanban-col"><h3>${label}</h3>${visible.filter(t=>t.status===status).map(t=>`<div class="task-card"><strong>${esc(t.title)}</strong><small>${esc(t.matter)} — ${esc(db.users.find(u=>u.email===t.assigned)?.name||t.assigned)}</small>${overdue(t)?` ${badge("متأخرة","overdue")}`:""}<div style="margin-top:10px"><button class="text-btn" onclick="moveTask('${t.id}',-1)">السابق</button> <button class="text-btn" onclick="moveTask('${t.id}',1)">التالي</button></div></div>`).join("")||`<div class="empty">لا توجد مهام</div>`}</div>`).join("")}</div>`}`;
    }
    function toggleTaskView(){ state.taskListView=!state.taskListView; setPage("tasks"); }
    function addTask(){
      const title=$("#task-title")?.value.trim();
      if(!title) return toast("أدخل عنوان المهمة");
      db.tasks.push({id:"T"+(db.tasks.length+1),title,matter:$("#task-matter").value,assigned:$("#task-assigned").value,due:$("#task-due").value,status:"todo"});
      db.notifications.push({to:$("#task-assigned").value,message:"تم تكليفك بمهمة: "+title,time:now(),read:false});
      audit("تكليف مهمة: "+title);
      save(); setPage("tasks"); toast("تم تكليف المهمة");
    }
    function moveTask(id,delta){
      const task=db.tasks.find(t=>t.id===id);
      if(!task) return;
      const states=["todo","doing","done"];
      task.status=states[Math.max(0,Math.min(2,states.indexOf(task.status)+delta))];
      audit("تغيير حالة مهمة: "+task.title);
      save(); setPage("tasks");
    }

    function timePage(){
      const entries=db.timeEntries.map(t=>({...t,userName:db.users.find(u=>u.email===t.user)?.name||t.user}));
      const totalMinutes=entries.reduce((n,t)=>n+t.minutes,0);
      const billable=entries.filter(t=>t.billable).reduce((n,t)=>n+t.minutes/60*t.rate,0);
      return `
        <div class="page-head"><div><h1>الوقت والمصروفات</h1><p>تتبع الساعات القابلة للفوترة ومصاريف القضايا.</p></div></div>
        <div class="card card-pad" style="margin-bottom:16px"><div class="form-grid">
          <div class="field"><label>القضية</label><select id="timer-matter">${visibleMatters().map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
          <div class="field"><label>تصنيف الوقت</label><select id="timer-billable"><option value="true">قابل للفوترة</option><option value="false">غير قابل للفوترة</option></select></div>
          <div class="field full">${state.timer?`<button class="btn danger" onclick="stopTimer()">إيقاف المؤقت وحفظ الوقت</button>`:`<button class="btn primary" onclick="startTimer()">بدء المؤقت</button>`}</div>
        </div></div>
        <section class="grid">
          <div class="card card-pad span-4 metric"><div class="metric-label">إجمالي الساعات</div><div class="metric-value">${(totalMinutes/60).toFixed(1)}</div></div>
          <div class="card card-pad span-4 metric"><div class="metric-label">قابل للفوترة</div><div class="metric-value">${money(billable)}</div></div>
          <div class="card card-pad span-4 metric"><div class="metric-label">مصروفات مسجلة</div><div class="metric-value">${money(db.expenses.reduce((n,x)=>n+x.amount,0))}</div></div>
        </section>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>القضية</th><th>المستخدم</th><th>الدقائق</th><th>القيمة</th><th>الفوترة</th></tr></thead>
        <tbody>${entries.map(t=>`<tr><td>${esc(t.matter)}</td><td>${esc(t.userName)}</td><td>${t.minutes}</td><td>${money(t.minutes/60*t.rate)}</td><td>${t.billable?(t.invoiced?"مفوتر":"قابل للفوترة"):"غير قابل للفوترة"}</td></tr>`).join("")}</tbody></table></div></div>
        <div class="card card-pad" style="margin-top:16px"><h2 style="margin-top:0">إضافة مصروف</h2><div class="form-grid">
          <div class="field"><label>القضية</label><select id="expense-matter">${db.matters.map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
          <div class="field"><label>الوصف</label><input id="expense-description"></div>
          <div class="field"><label>المبلغ</label><input id="expense-amount" type="number" min="1"></div>
          <div class="field"><button class="btn primary" onclick="addExpense()">حفظ المصروف</button></div>
        </div></div>`;
    }
    function startTimer(){
      if(!$("#timer-matter")) return;
      state.timer={matter:$("#timer-matter").value,billable:$("#timer-billable").value==="true",started:Date.now()};
      audit("بدء مؤقت الوقت للقضية "+state.timer.matter);
      setPage("time"); toast("تم بدء المؤقت");
    }
    function stopTimer(){
      if(!state.timer) return;
      const minutes=Math.max(1,Math.round((Date.now()-state.timer.started)/60000));
      db.timeEntries.push({id:"TE"+(db.timeEntries.length+1),matter:state.timer.matter,user:state.user.email,minutes,billable:state.timer.billable,invoiced:false,rate:state.user.rate||300});
      audit("إيقاف مؤقت الوقت للقضية "+state.timer.matter+" وتسجيل "+minutes+" دقيقة");
      state.timer=null; save(); setPage("time"); toast("تم حفظ وقت العمل");
    }
    function addExpense(){
      const amount=Number($("#expense-amount")?.value);
      if(!amount) return toast("أدخل مبلغ المصروف");
      db.expenses.push({id:"X"+(db.expenses.length+1),matter:$("#expense-matter").value,description:$("#expense-description").value||"مصروف قضية",amount,invoiced:false});
      audit("إضافة مصروف بقيمة "+amount);
      save(); setPage("time"); toast("تم حفظ المصروف");
    }

    function fundsPage(){
      const balance=c=>db.funds.filter(f=>f.client===c).reduce((n,f)=>n+(f.type==="deposit"?f.amount:-f.amount),0);
      return `
        <div class="page-head"><div><h1>أموال العملاء</h1><p>سجل الإيداعات والسحوبات والتسوية.</p></div></div>
        <div class="card card-pad"><div class="form-grid">
          <div class="field"><label>العميل</label><select id="fund-client">${db.clients.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select></div>
          <div class="field"><label>المبلغ</label><input id="fund-amount" type="number" min="1"></div>
          <div class="field full"><button class="btn primary" onclick="fundMove('deposit')">إيداع</button> <button class="btn danger" onclick="fundMove('withdraw')">سحب</button></div>
        </div></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>العميل</th><th>إجمالي الإيداعات</th><th>إجمالي السحوبات</th><th>الرصيد</th><th>الحالة</th></tr></thead>
        <tbody>${db.clients.map(c=>{const dep=db.funds.filter(f=>f.client===c.id&&f.type==="deposit").reduce((n,f)=>n+f.amount,0),wd=db.funds.filter(f=>f.client===c.id&&f.type==="withdraw").reduce((n,f)=>n+f.amount,0);return `<tr><td>${esc(c.name)}</td><td>${money(dep)}</td><td>${money(wd)}</td><td><strong>${money(balance(c.id))}</strong></td><td>${badge(balance(c.id)>=0?"مطابق":"تجاوز رصيد","open")}</td></tr>`}).join("")}</tbody></table></div></div>`;
    }
    function fundMove(type){
      const amount=Number($("#fund-amount")?.value),client=$("#fund-client")?.value;
      if(!amount) return toast("أدخل المبلغ");
      const balance=db.funds.filter(f=>f.client===client).reduce((n,f)=>n+(f.type==="deposit"?f.amount:-f.amount),0);
      if(type==="withdraw"&&amount>balance) return toast("السحب يتجاوز الرصيد المتاح");
      db.funds.push({id:"F"+(db.funds.length+1),client,type,amount,date:new Date().toISOString().slice(0,10)});
      audit((type==="deposit"?"إيداع":"سحب")+" لدى العميل "+clientName(client)+" بقيمة "+amount);
      save(); setPage("funds"); toast(type==="deposit"?"تم تسجيل الإيداع":"تم تسجيل السحب");
    }

    function openComplianceMatter(id){state.selectedMatter=id;setPage("compliance")}
    function complianceAlerts(matter){
      const alerts=[];
      const docs=db.documents.filter(d=>d.matter===matter.id);
      (matter.requiredDocuments||[]).forEach(name=>{
        if(!docs.some(d=>normalize(d.name).includes(normalize(name)))) alerts.push({type:"missing-document",title:"مستند ناقص",text:name,matter:matter.id,severity:"high"});
      });
      (matter.procedures||[]).forEach(p=>{
        if(p.status==="missing") alerts.push({type:"procedure",title:"إجراء ناقص",text:p.name,matter:matter.id,severity:"high"});
        if(p.status==="pending"&&p.due&&p.due<new Date().toISOString().slice(0,10)) alerts.push({type:"overdue",title:"إجراء متأخر",text:p.name+" — موعده "+p.due,matter:matter.id,severity:"high"});
      });
      db.events.filter(e=>e.matter===matter.id).forEach(e=>{
        if(new Date(e.start)<new Date()) alerts.push({type:"hearing",title:"موعد جلسة متجاوز",text:e.type+" في "+e.room+" — "+new Date(e.start).toLocaleString("ar-EG"),matter:matter.id,severity:"high"});
        else {
          const hours=(new Date(e.start)-new Date())/36e5;
          if(hours<=72) alerts.push({type:"hearing",title:"جلسة أو موعد قريب",text:e.type+" خلال "+Math.ceil(hours)+" ساعة",matter:matter.id,severity:"medium"});
        }
      });
      return alerts;
    }
    function compliancePage(){
      const matters=visibleMatters();
      const selected=state.selectedMatter&&matters.some(m=>m.id===state.selectedMatter)?state.selectedMatter:(matters[0]?.id||"");
      const matter=matters.find(m=>m.id===selected);
      if(!matter) return `<div class="empty">لا توجد قضية متاحة للتحليل الإجرائي.</div>`;
      const alerts=complianceAlerts(matter);
      const docs=db.documents.filter(d=>d.matter===matter.id);
      const completion=Math.round(((matter.procedures||[]).filter(p=>p.status==="done").length/Math.max((matter.procedures||[]).length,1))*100);
      const docCompletion=Math.round((docs.length/Math.max((matter.requiredDocuments||[]).length,1))*100);
      return `
        <div class="page-head"><div><h1>التحليل والإجراءات</h1><p>فحص اكتمال مستندات وإجراءات القضية وتنبيهات المواعيد.</p></div></div>
        <div class="card card-pad" style="margin-bottom:16px"><div class="form-grid"><div class="field full"><label>القضية محل الفحص</label><select id="compliance-matter" onchange="state.selectedMatter=this.value;setPage('compliance')">${matters.map(m=>`<option value="${m.id}" ${m.id===selected?"selected":""}>${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div></div></div>
        <section class="grid">
          <div class="card card-pad span-4"><strong>اكتمال الإجراءات</strong><div class="metric-value">${completion}%</div><div class="progress-line"><span style="width:${completion}%"></span></div></div>
          <div class="card card-pad span-4"><strong>اكتمال المستندات</strong><div class="metric-value">${docCompletion}%</div><div class="progress-line"><span style="width:${docCompletion}%"></span></div></div>
          <div class="card card-pad span-4"><strong>تنبيهات مستعجلة</strong><div class="metric-value">${alerts.filter(a=>a.severity==="high").length}</div></div>
        </section>
        <div class="card" style="margin-top:16px"><div class="card-pad card-title"><h2>تنبيهات القضية</h2></div><div class="table-wrap"><table><thead><tr><th>الدرجة</th><th>النوع</th><th>التفاصيل</th><th>الإجراء المقترح</th></tr></thead><tbody>${alerts.map(a=>`<tr><td>${badge(a.severity==="high"?"عاجل":"قريب",a.severity==="high"?"overdue":"pending")}</td><td>${esc(a.title)}</td><td>${esc(a.text)}</td><td>${a.type==="missing-document"?`<button class="text-btn" onclick="openDocsForMatter('${a.matter}')">رفع المستند</button>`:"لا يتطلب إجراء فوري"}</td></tr>`).join("")||`<tr><td colspan="4"><div class="empty">لا توجد تنبيهات حالية</div></td></tr>`}</tbody></table></div></div>
        <div class="card" style="margin-top:16px"><div class="card-pad card-title"><h2>خريطة الإجراءات الإجرائية</h2><button class="btn" onclick="openProcedureModal('${matter.id}')">إضافة إجراء</button></div><div class="table-wrap"><table><thead><tr><th>الإجراء</th><th>الموعد</th><th>الحالة</th><th>تغيير الحالة</th></tr></thead><tbody>${(matter.procedures||[]).map((p,i)=>`<tr><td>${esc(p.name)}</td><td>${esc(p.due||"—")}</td><td>${badge(p.status==="done"?"منفذ":p.status==="missing"?"ناقص":"قيد التنفيذ",p.status==="done"?"open":p.status==="missing"?"overdue":"pending")}</td><td><select onchange="setProcedureStatus('${matter.id}',${i},this.value)"><option value="pending" ${p.status==="pending"?"selected":""}>قيد التنفيذ</option><option value="done" ${p.status==="done"?"selected":""}>منفذ</option><option value="missing" ${p.status==="missing"?"selected":""}>ناقص</option></select></td></tr>`).join("")}</tbody></table></div></div>
        <div class="card" style="margin-top:16px"><div class="card-pad card-title"><h2>فحص المستندات المطلوبة</h2><button class="btn" onclick="openDocsForMatter('${matter.id}')">فتح مستندات القضية</button></div><div class="table-wrap"><table><thead><tr><th>المستند المطلوب</th><th>الحالة</th><th>الملف الموجود</th></tr></thead><tbody>${(matter.requiredDocuments||[]).map(name=>{const d=db.documents.filter(x=>x.matter===matter.id).find(x=>normalize(x.name).includes(normalize(name)));return`<tr><td>${esc(name)}</td><td>${d?badge("موجود","open"):badge("مفقود","overdue")}</td><td>${d?esc(d.name):"—"}</td></tr>`}).join("")}</tbody></table></div></div>`;
    }
    function setProcedureStatus(matterId,index,status){
      const matter=db.matters.find(m=>m.id===matterId);if(!matter?.procedures?.[index]) return;
      matter.procedures[index].status=status;audit("تحديث إجراء إجرائي في "+matterId+": "+matter.procedures[index].name+" إلى "+status);save();setPage("compliance");toast("تم تحديث الإجراء");
    }
    function openProcedureModal(matterId){
      let modal=$("#modal");if(!modal){modal=document.createElement("div");modal.id="modal";modal.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,.38);display:grid;place-items:center;padding:16px;z-index:40";document.body.append(modal)}
      modal.innerHTML=`<section class="card card-pad" style="width:min(620px,100%)"><div class="card-title"><h2>إضافة إجراء إجرائي</h2><button class="icon-btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field full"><label>اسم الإجراء</label><input id="procedure-name"></div><div class="field full"><label>موعد التنفيذ</label><input id="procedure-due" type="date"></div><div class="field full"><button class="btn primary" onclick="addProcedure('${matterId}')">حفظ الإجراء</button></div></div></section>`;
    }
    function addProcedure(matterId){
      const name=$("#procedure-name")?.value.trim(),due=$("#procedure-due")?.value;if(!name) return toast("اكتب اسم الإجراء");
      const matter=db.matters.find(m=>m.id===matterId);if(!matter) return;
      matter.procedures=matter.procedures||[];matter.procedures.push({name,status:"pending",due:due||""});audit("إضافة إجراء إجرائي للقضية "+matterId+": "+name);save();closeModal();setPage("compliance");toast("تمت إضافة الإجراء");
    }
    function docsPage(){
      const selectedMatter=state.selectedMatter && visibleMatters().some(m=>m.id===state.selectedMatter)?state.selectedMatter:"";
      const matters=visibleMatters();
      const documents=db.documents.filter(d=>!selectedMatter||d.matter===selectedMatter);
      return `
        <div class="page-head"><div><h1>مستندات القضايا</h1><p>أرشيف ملفات القضايا وإصداراتها وحالة المراجعة، مع وصول مباشر لكل قضية.</p></div></div>
        <div class="card card-pad"><div class="form-grid">
          <div class="field"><label>القضية</label><select id="doc-matter" onchange="filterDocsForMatter(this.value)">${matters.map(m=>`<option value="${m.id}" ${m.id===selectedMatter?"selected":""}>${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
          <div class="field"><label>اسم المستند</label><input id="doc-name" placeholder="مثال: مذكرة الرد.pdf"></div>
          <div class="field"><label>رفع ملف محاكاة OCR</label><input id="doc-file" type="file" accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"></div>
          <div class="field"><label>تشغيل OCR عربي؟</label><select id="doc-ocr"><option value="true">نعم</option><option value="false">لا</option></select></div>
          <div class="field full"><button class="btn primary" onclick="addDocument()">إضافة للمستندات</button></div>
        </div></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>المستند</th><th>القضية</th><th>الإصدارات</th><th>الحالة</th><th>مستوى الثقة</th></tr></thead>
        <tbody>${documents.map(d=>`<tr><td><strong>${esc(d.name)}</strong></td><td>${esc(d.matter)}</td><td>${d.versions}</td><td>${esc(d.status)}</td><td>${d.confidence==="low"?badge("ثقة منخفضة","overdue"):esc(d.confidence)}</td></tr>`).join("")||`<tr><td colspan="5"><div class="empty">لا توجد مستندات لهذه القضية</div></td></tr>`}</tbody></table></div></div>`;
    }
    function filterDocsForMatter(id){ state.selectedMatter=id; setPage("docs"); }
    function openDocsForMatter(id){ state.selectedMatter=id; setPage("docs"); }
    function addDocument(){
      const file=$("#doc-file")?.files?.[0];
      const name=(file?.name||$("#doc-name")?.value||"").trim();
      if(!name) return toast("أدخل اسم المستند");
      const documentMatter = $("#doc-matter").value;
      const existing = db.documents.find(d => d.matter === documentMatter && d.name === name);
      const ocr=$("#doc-ocr")?.value==="true";
      const confidence=ocr?(Math.random()<.18?"low":"مرتفع"):"غير مفعل";
      if(existing){existing.versions=(existing.versions||1)+1;existing.status=ocr?"OCR مكتمل":"جاهز";existing.confidence=confidence}
      else db.documents.push({id:"D"+(db.documents.length+1),matter:$("#doc-matter").value,name,versions:1,status:ocr?"OCR مكتمل":"جاهز",confidence,extractedText:ocr?"نص عربي مستخرج تجريبي قابل للبحث":"",metadata:{size:file?.size||0,type:file?.type||"text/plain"}});
      audit("إضافة مستند: "+name);
      save(); setPage("docs"); toast("تم إضافة المستند");
    }

    function lawPage(){
      return `
        <div class="page-head"><div><h1>تحديثات النظام القانونية</h1><p>محاكاة إشعار صادر من قاعدة نظام حُجّة المركزية؛ مكاتب الاستخدام لا تعدل القوانين.</p></div></div>
        <div class="card card-pad">
          <div class="form-grid">
            <div class="field full"><label>نوع التعديل الوارد</label><select id="law-scenario"><option value="rent">تعديل متعلق بقانون الإيجار</option><option value="civil">تعديل متعلق بالقانون المدني والتعويضات</option><option value="procedure">تعديل إجرائي على مواعيد الطعن والمذكرات</option></select></div>
            <div class="field full"><button class="btn primary" onclick="simulateCentralLawNotification()">محاكاة وصول إشعار التعديل</button></div>
          </div>
        </div>
        <div class="card" style="margin-top:16px"><div class="card-pad card-title"><h2>النصوص المفهرسة من النظام المركزي</h2></div><div class="table-wrap"><table><thead><tr><th>القانون</th><th>المادة</th><th>النص</th><th>الإصدار/النفاذ</th></tr></thead><tbody>${db.legalCorpus.map(s=>`<tr><td>${esc(s.source)}</td><td>${esc(s.article)}</td><td>${esc(s.text)}</td><td>${esc(s.effective||"—")}</td></tr>`).join("")}</tbody></table></div></div>
        <div class="card" style="margin-top:16px"><div class="card-pad card-title"><h2>سجل إشعارات التحديث القانوني</h2></div><div class="table-wrap"><table><thead><tr><th>التاريخ</th><th>المادة</th><th>نوع الإشعار</th><th>ملخص التعديل</th><th>تحليل القضايا المتأثرة</th></tr></thead><tbody>${(db.amendments||[]).map(a=>`<tr><td>${esc(a.date||"—")}</td><td>${esc(a.source+" — "+(a.article||a.title))}</td><td>${badge(a.general?"معلومة عامة":"تحديث متعلق بالقضية","pending")}</td><td>${esc(a.summary)}</td><td>${(a.affected||[]).length?(a.affected||[]).map(id=>`<strong>${esc(id)}</strong> — ${esc(db.matters.find(m=>m.id===id)?.title||"قضية")}`).join("<br>"):"لا توجد قضايا متأثرة؛ المعلومة عامة لجميع المحامين"}</td></tr>`).join("")||`<tr><td colspan="5"><div class="empty">لا توجد إشعارات قانونية</div></td></tr>`}</tbody></table></div></div>`;
    }
    function analyzeLawAffectedMatter(scenario){
      if(scenario==="rent") return db.matters.filter(m=>normalize((m.subject||"")+" "+(m.title||"")+" "+(m.parties||[]).join(" ")).includes("ايجار")||normalize(m.title).includes("ايجار"));
      if(scenario==="civil") return db.matters.filter(m=>normalize((m.subject||"")+" "+(m.title||"")).includes("تعويض")||normalize(m.title).includes("تعويض"));
      return db.matters.filter(m=>["pending","open"].includes(m.status));
    }
    function simulateCentralLawNotification(){
      const scenario=$("#law-scenario")?.value||"procedure";
      const affected=analyzeLawAffectedMatter(scenario);
      const sample=scenario==="rent"?
        {source:"قانون الإيجار",article:"المادة 20",summary:"تعديل مدة الإخطار وإجراءات المطالبة بالأجرة",effective:"2026-12-01"}:
        scenario==="civil"?
        {source:"القانون المدني المصري",article:"المادة 226",summary:"تحديث قواعد إثبات الضرر المباشر في دعاوى التعويض",effective:"2026-12-15"}:
        {source:"قواعد المواعيد الإجرائية",article:"تنظيم الطعن والمذكرات",summary:"تعديل مدد تقديم المذكرات والإخطار بالطعن",effective:"2026-12-01"};
      const amendment={id:"A"+((db.amendments?.length||0)+1),source:sample.source,article:sample.article,title:sample.summary,summary:sample.summary,date:sample.effective,affected:affected.map(m=>m.id),read:false,central:true,general:true};
      db.amendments=db.amendments||[];db.amendments.unshift(amendment);
      db.notifications=db.notifications||[];
      db.users.filter(u=>u.role==="lawyer"||u.role==="admin").forEach(u=>{
        const affectedText=affected.length?affected.map(m=>m.id+" — "+m.title).join("، "):"لا توجد قضايا مرتبطة حاليًا";
        db.notifications.push({to:u.email,message:"معلومة عامة — تم تعديل "+sample.source+" — "+sample.article+". ملخص التعديل: "+sample.summary+". تحليل القضايا المتأثرة: "+affectedText,matterIds:affected.map(m=>m.id),time:now(),read:false,amendmentId:amendment.id,general:true});
      });
      affected.forEach(m=>{
        m.procedures=m.procedures||[];
        m.procedures.push({name:"مراجعة أثر التحديث: "+sample.summary,status:"pending",due:sample.effective});
      });
      audit("محاكاة إشعار مركزي لتعديل قانوني: "+sample.source+" — "+sample.article);
      save();setPage("law");toast("تم استلام الإشعار وتحليل القضايا المتأثرة");
    }

    function reviewPage(){
      return `
        <div class="page-head"><div><h1>المراجعة الاعتمادية</h1><p>طلبات الاعتماد التي تحتاج قرارًا من المحامي أو الإدارة.</p></div></div>
        <div class="card"><div class="table-wrap"><table><thead><tr><th>الطلب</th><th>القضية</th><th>الأولوية</th><th>الحالة</th><th>الإجراء</th></tr></thead>
        <tbody>${db.reviews.map(r=>`<tr><td><strong>${esc(r.title)}</strong><br><small>${esc(r.body)}</small></td><td>${esc(r.matter)}</td><td>${esc(r.priority)}</td><td>${badge(r.status==="pending"?"بانتظار الاعتماد":"معتمد",r.status==="pending"?"pending":"open")}</td><td>${r.status==="pending"&&state.user.role!=="secretary"?`<button class="btn" onclick="reviewItem('${r.id}','approved')">اعتماد</button> <button class="btn danger" onclick="reviewItem('${r.id}','rejected')">رفض</button>`:"—"}</td></tr>`).join("")}</tbody></table></div></div>`;
    }
    function reviewItem(id,status){
      const item=db.reviews.find(r=>r.id===id);
      if(!item) return;
      item.status=status;
      audit((status==="approved"?"اعتماد":"رفض")+" طلب: "+item.title);
      save(); setPage("review"); toast(status==="approved"?"تم الاعتماد":"تم رفض الطلب");
    }

    function modalContent(type) {
      if(type==="client") return `<form id="modal-form"><div class="form-grid">
        <div class="field full"><label>اسم العميل</label><input name="name" required></div>
        <div class="field"><label>رقم الهاتف</label><input name="phone"></div>
        <div class="field"><label>البريد الإلكتروني</label><input name="email" type="email"></div>
        <div class="field full"><label>الرقم القومي / رقم الهوية</label><input name="nationalId"></div>
      </div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">إلغاء</button><button class="btn primary">حفظ العميل</button></div></form>`;
      if(type==="matter") return `<form id="modal-form"><div class="form-grid">
        <div class="field full"><label>عنوان القضية</label><input name="title" required></div>
        <div class="field full"><label>العميل</label><select name="client" required>${db.clients.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select></div>
        <div class="field"><label>الموكل</label><input name="claimant" placeholder="اسم الموكل"></div>
        <div class="field"><label>الخصم / الطرف الآخر</label><input name="party" placeholder="اسم الخصم"></div>
        <div class="field full"><label>موضوع الدعوى</label><textarea name="subject" rows="3" placeholder="موضوع القضية بالتفصيل"></textarea></div>
        <div class="field"><label>المحكمة</label><input name="court" placeholder="مثال: محكمة شمال القاهرة الابتدائية"></div>
        <div class="field"><label>الدرجة</label><select name="degree"><option>ابتدائي</option><option>استئناف</option><option>نقض</option><option>محكمة الأسرة</option><option>تعسيري</option></select></div>
        <div class="field"><label>الحالة</label><select name="status"><option value="open">مفتوحة</option><option value="pending">قيد المتابعة</option><option value="closed">مغلقة</option></select></div>
        <div class="field"><label>تاريخ الفتح</label><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="field full"><label>طرف آخر</label><input name="party" placeholder="اسم الطرف أو جهة التدخل"></div>
        <div class="field full"><label>الفريق المخصص</label><select name="team" multiple>${db.users.map(u=>`<option value="${u.email}" ${u.email===state.user.email?"selected":""}>${esc(u.name)} — ${esc(u.email)}</option>`).join("")}</select></div>
      </div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">إلغاء</button><button class="btn primary">حفظ القضية</button></div></form>`;
      if(type==="invoice") return `<form id="modal-form"><div class="form-grid">
        <div class="field full"><label>العميل</label><select name="client" required onchange="fillInvoiceMatters(this.value)">${db.clients.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select></div>
        <div class="field full"><label>القضية</label><select name="matter" id="invoice-matter">${db.matters.map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
        <div class="field"><label>المبلغ</label><input name="amount" type="number" min="1" required></div>
        <div class="field"><label>تاريخ الاستحقاق</label><input name="due" type="date" required></div>
      </div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">إلغاء</button><button class="btn primary">حفظ الفاتورة</button></div></form>`;
      if(type==="user") return `<form id="modal-form"><div class="form-grid">
        <div class="field full"><label>الاسم</label><input name="name" required></div>
        <div class="field full"><label>البريد الإلكتروني</label><input name="email" type="email" required></div>
        <div class="field"><label>الدور</label><select name="role"><option value="lawyer">محامي</option><option value="secretary">سكرتارية</option><option value="admin">مدير المكتب</option></select></div>
        <div class="field"><label>السعر بالساعة</label><input name="rate" type="number" min="0" value="300"></div>
        <div class="field full"><label>كلمة المرور المؤقتة</label><input name="password" type="password" value="1234" required></div>
      </div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">إلغاء</button><button class="btn primary">إضافة المستخدم</button></div></form>`;
    }

    function openModal(type) {
      if(type==="user" && state.user.role!=="admin") return toast("غير مصرح بإضافة مستخدم");
      let modal=$("#modal");
      if(!modal) {
        modal=document.createElement("div"); modal.id="modal";
        modal.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,.38);display:grid;place-items:center;padding:16px;z-index:40";
        document.body.append(modal);
      }
      modal.innerHTML=`<section class="card card-pad" style="width:min(620px,100%);max-height:90vh;overflow:auto"><div class="card-title"><h2>${type==="client"?"عميل جديد":type==="matter"?"قضية جديدة":type==="invoice"?"إنشاء فاتورة":"إضافة مستخدم"}</h2><button class="icon-btn" onclick="closeModal()" aria-label="إغلاق">×</button></div>${modalContent(type)}</section>`;
      $("#modal-form").addEventListener("submit", e=>{e.preventDefault(); saveModal(type, new FormData(e.target));});
    }
    function closeModal(){ const m=$("#modal"); if(m) m.remove(); }
    function fillInvoiceMatters(clientId) {
      const select=$("#invoice-matter");
      const matters=db.matters.filter(m=>m.client===clientId);
      select.innerHTML=matters.map(m=>`<option value="${m.id}">${esc(m.id)} — ${esc(m.title)}</option>`).join("") || `<option value="">لا توجد قضايا لهذا العميل</option>`;
    }
    function saveModal(type, form) {
      const data=Object.fromEntries(form);
      if(type==="client") {
        if(!canCreateClient()) return toast("غير مصرح بإضافة عميل");
        const matches=fuzzyMatches(data.name);
        if(matches.length && !confirm("تقرير تطابق أسماء:\n"+matches.map(m=>`${m.name} — ${m.type} (${Math.round(m.score*100)}%)`).join("\n")+"\nهل تريد المتابعة والحفظ؟")) return;
        db.clients.push({id:"C"+(db.clients.length+1), ...data});
        audit("إضافة عميل: "+data.name);
        closeModal(); setPage("clients"); toast("تم إضافة العميل");
      } else if(type==="matter") {
        const year=new Date().getFullYear();
        const id="M-"+year+"-"+String(db.matters.length+1).padStart(3,"0");
        const party=(data.party||"").trim();
        if(party){
          const matches=fuzzyMatches(party);
          if(matches.length && !confirm("تقرير تطابق طرف القضية:\n"+matches.map(m=>`${m.name} — ${m.type} (${Math.round(m.score*100)}%)`).join("\n")+"\nهل تريد المتابعة والحفظ؟")) return;
        }
        const team=form.getAll("team");
        if(!team.includes(state.user.email)) team.push(state.user.email);
        db.matters.push({id,title:data.title,client:data.client,status:data.status,date:data.date,team,claimant:data.claimant||clientName(data.client),defendant:party||"—",court:data.court||"—",degree:data.degree||"ابتدائي",subject:data.subject||data.title,parties:party?[party]:[],note:"",statusHistory:[{status:data.status,time:now(),by:state.user.email}]});
        audit("إضافة قضية: "+id);
        closeModal(); setPage("cases"); toast("تم إنشاء القضية");
      } else if(type==="invoice") {
        if(!data.matter) return toast("اختر قضية للعميل أولًا");
        const id="INV-"+String(db.invoices.length+1).padStart(3,"0");
        db.invoices.push({id,client:data.client,matter:data.matter,date:new Date().toISOString().slice(0,10),due:data.due,amount:Number(data.amount),status:"pending"});
        audit("إنشاء فاتورة: "+id);
        closeModal(); setPage("invoices"); toast("تم حفظ الفاتورة");
      } else if(type==="user") {
        if(db.users.some(u=>u.email.toLowerCase()===data.email.toLowerCase())) return toast("البريد الإلكتروني مستخدم بالفعل");
        const salt=Math.random().toString(36).slice(2,8);
        db.users.push({email:data.email.toLowerCase(),name:data.name,role:data.role,rate:Number(data.rate)||0,salt,password:hash(data.password,salt)});
        audit("إضافة مستخدم: "+data.email);
        closeModal(); setPage("users"); toast("تم إضافة المستخدم");
      }
      save(); render();
    }

    function levenshtein(a,b) {
      const m=Array.from({length:b.length+1},()=>[]);
      for(let j=0;j<=b.length;j++) m[0][j]=j;
      for(let i=0;i<=a.length;i++) m[i][0]=i;
      for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]==b[j-1]?0:1));
      return m[a.length][b.length];
    }
    function score(query,text) {
      query=normalize(query); text=normalize(text);
      if(!query) return 0;
      if(text.includes(query)) return 100;
      if(text.startsWith(query)) return 90;
      const terms=query.split(" ");
      const all=terms.every(t=>text.includes(t));
      if(all) return 75;
      const distance=levenshtein(query.slice(0,18),text.slice(0,18));
      return 70-distance*8;
    }
    function searchRecords(query) {
      if(query.length<2) return [];
      const rows=[];
      db.clients.forEach(c=>rows.push({type:"عميل", title:c.name, sub:c.phone||c.email||"ملف عميل", page:"clients", score:score(query,c.name+" "+c.phone+" "+c.email)}));
      db.matters.forEach(m=>rows.push({type:"قضية", title:m.title, sub:m.id+" — "+clientName(m.client), page:"cases", score:score(query,m.id+" "+m.title+" "+m.note+" "+clientName(m.client))}));
      db.invoices.forEach(i=>rows.push({type:"فاتورة", title:i.id, sub:clientName(i.client)+" — "+money(i.amount), page:"invoices", score:score(query,i.id+" "+clientName(i.client)+" "+i.matter)}));
      db.tasks.forEach(t=>rows.push({type:"مهمة", title:t.title, sub:t.matter+" — "+(t.status==="done"?"مكتملة":t.status==="doing"?"قيد التنفيذ":"قائمة الانتظار"), page:"tasks", score:score(query,t.title+" "+t.matter)}));
      db.documents.forEach(d=>rows.push({type:"مستند", title:d.name, sub:d.matter+" — "+d.status, page:"docs", score:score(query,d.name+" "+d.matter)}));
      db.events.forEach(e=>rows.push({type:"موعد", title:e.type, sub:e.matter+" — "+e.room, page:"calendar", score:score(query,e.type+" "+e.matter+" "+e.room)}));
      if(state.user?.role==="admin") db.users.forEach(u=>rows.push({type:"مستخدم", title:u.name, sub:u.email, page:"users", score:score(query,u.name+" "+u.email)}));
      return rows.filter(r=>r.score>25).sort((a,b)=>b.score-a.score).slice(0,8);
    }

    const legalPrompts={
      research:"أجِر بحثًا قانونيًا مصريًا عن: ",
      draft:"اكتب مسودة عربية قابلة للمراجعة باستخدام قالب متوافق مع القضية. المطلوب: ",
      analysis:"حلّل الوقائع واستخرج السوابق والأنماط القضائية ذات الصلة. المطلوب: ",
      summarize:"لخّص المستندات أو الوقائع التالية بالنقاط، واذكر المصادر والاستنتاجات: ",
      foreign:"افحص العنصر الأجنبي وحدد تداعيات قواعد الإسناد المصرية على: ",
      amendment:"حلّل التعديل التشريعي وأثره العملي على القضايا المراقبة. التعديل أو الموضوع: "
    };
    function selectLegalPrompt(workflow){
      state.legalWorkflow=workflow;
      const input=$("#legal-question");
      if(input) input.focus();
      setPage("legal");
    }
    function legalSearch(query){
      const q=normalize(query);
      return db.legalCorpus.map(source=>{
        const text=normalize(source.text+" "+source.article+" "+source.source);
        const score=text.includes(q)?90:q.split(" ").filter(w=>w.length>2).reduce((n,w)=>n+(text.includes(w)?18:0),0);
        return{source,score:Math.min(100,score)};
      }).filter(x=>x.score>=18).sort((a,b)=>b.score-a.score).slice(0,3);
    }
    function ensureLegalSession(){
      if(!db.legalSessions) db.legalSessions=[];
      if(!state.activeLegalSession) state.activeLegalSession=db.legalSessions[0]?.id||"";
      if(!db.legalSessions.some(s=>s.id===state.activeLegalSession)) {
        const session={id:"CHAT-"+(db.legalSessions.length+1),title:"محادثة قانونية جديدة",matter:"",createdAt:now(),messages:[]};
        db.legalSessions.unshift(session);
        state.activeLegalSession=session.id;
      }
      return db.legalSessions.find(s=>s.id===state.activeLegalSession);
    }
    function newLegalSession(){
      const session={id:"CHAT-"+(db.legalSessions.length+1),title:"محادثة قانونية جديدة",matter:"",createdAt:now(),messages:[]};
      db.legalSessions.unshift(session);state.activeLegalSession=session.id;state.selectedMatter="";save();setPage("legal");
    }
    function selectLegalSession(id){
      state.activeLegalSession=id;
      const session=db.legalSessions.find(s=>s.id===id);
      state.selectedMatter=session?.matter||"";
      setPage("legal");
    }
    function changeSessionMatter(id){
      const session=db.legalSessions.find(s=>s.id===state.activeLegalSession);
      if(session){session.matter=id||"";state.selectedMatter=id||"";save();render()}
    }
    function legalPage(){
      if(!["admin","lawyer"].includes(state.user.role)) return `<div class="empty">المساعد القانوني متاح للمحامين وإدارة المكتب فقط.</div>`;
      const session=ensureLegalSession();
      const matters=visibleMatters();
      const selectedSessionMatter=session.matter||"";
      const messages=session.messages||[];
      return `
        <div class="page-head"><div><h1>المساعد القانوني</h1><p>محادثات قانونية منفصلة، يمكن ربطها بقضية أو تركها عامة.</p></div></div>
        <div class="legal-layout">
          <aside class="chat-sidebar">
            <button class="btn primary" style="width:100%;margin-bottom:8px" onclick="newLegalSession()">محادثة جديدة</button>
            ${db.legalSessions.map(s=>`<button class="chat-session ${s.id===session.id?"active":""}" onclick="selectLegalSession('${s.id}')"><strong>${esc(s.title)}</strong><small>${s.matter?esc(s.matter):"غير مرتبطة بقضية"} · ${new Date(s.createdAt).toLocaleDateString("ar-EG")}</small></button>`).join("")}
          </aside>
          <main class="chat-main">
            <div>
              <div class="chat-toolbar">
                <select id="legal-matter" onchange="changeSessionMatter(this.value)">
                  <option value="">بدون ربط بقضية</option>
                  ${matters.map(m=>`<option value="${m.id}" ${m.id===selectedSessionMatter?"selected":""}>${esc(m.id)} — ${esc(m.title)}</option>`).join("")}
                </select>
              </div>
              <div class="chat-workflows">
                <button class="workflow-chip ${state.legalWorkflow==="research"?"active":""}" onclick="selectLegalPrompt('research')">بحث قانوني</button>
                <button class="workflow-chip ${state.legalWorkflow==="draft"?"active":""}" onclick="selectLegalPrompt('draft')">صياغة مستند</button>
                <button class="workflow-chip ${state.legalWorkflow==="analysis"?"active":""}" onclick="selectLegalPrompt('analysis')">تحليل سوابق</button>
                <button class="workflow-chip ${state.legalWorkflow==="summarize"?"active":""}" onclick="selectLegalPrompt('summarize')">تلخيص مستندات</button>
                <button class="workflow-chip ${state.legalWorkflow==="foreign"?"active":""}" onclick="selectLegalPrompt('foreign')">عنصر أجنبـي</button>
                <button class="workflow-chip ${state.legalWorkflow==="amendment"?"active":""}" onclick="selectLegalPrompt('amendment')">تعديل تشريعي</button>
              </div>
            </div>
            <div class="chat-messages" id="chat-messages">
              ${messages.length?messages.map(m=>`
                <div class="message-row ${m.role}">
                  <div class="message-bubble">${esc(m.content)}${m.sources?.length?`<div class="source-list">${m.sources.map((x,n)=>`<div class="source-row"><strong>[${n+1}] ${esc(x.source.source)} — ${esc(x.source.article)}</strong><br><mark>${esc(x.source.text)}</mark><br>${badge(x.status==="verified"?"موثّق":"غير موثّق",x.status==="verified"?"paid":"pending")}</div>`).join("")}</div>`:""}${m.draft?`<div class="field" style="margin-top:12px"><label>مسودة قابلة للتعديل</label><textarea rows="7" style="width:100%">${esc(m.draft)}</textarea></div>`:""}${m.reliability!==undefined?`<div style="margin-top:10px">${badge("الموثوقية "+m.reliability+"%",m.reliability<40?"overdue":"paid")}</div>`:""}${m.role==="assistant"&&m.reliability!==undefined&&state.user.role==="lawyer"?`<div class="form-actions"><button type="button" class="btn primary" onclick="sendLegalReview('${session.id}')">إرسال للمراجعة</button></div>`:""}</div>
                </div>`).join(""):`<div class="empty">ابدأ المحادثة بسؤال عربي، أو اختر workflow جاهزًا ثم اكتب تفاصيلك.</div>`}
            </div>
            <form class="chat-composer" id="chat-composer" onsubmit="submitLegalQuery(event)">
              <textarea id="legal-question" placeholder="اكتب سؤالك القانوني..."></textarea>
              <button type="submit" title="إرسال">↑</button>
            </form>
          </main>
        </div>`;
    }
    function submitLegalQuery(event){
      if(event) event.preventDefault();
      const question=$("#legal-question")?.value.trim();
      if(!question) return toast("اكتب السؤال القانوني أولًا");
      const session=ensureLegalSession();
      if(session.messages.length===0) session.title=question.slice(0,42)+(question.length>42?"…":"");
      const wrappedPrompt=state.legalWorkflow&&legalPrompts[state.legalWorkflow]?legalPrompts[state.legalWorkflow]+question:question;
      session.messages.push({role:"user",content:question,workflow:state.legalWorkflow||"chat",time:now()});
      session.messages.push({role:"assistant",content:"جارٍ البحث وفحص الاستشهادات...",progress:35,time:now()});
      save();render();

      const route=state.legalWorkflow==="draft"?"drafting":state.legalWorkflow==="analysis"?"analysis":"research";
      setTimeout(()=>{
        const hits=legalSearch(wrappedPrompt);
        const sources=hits.map(h=>({source:h.source,status:h.score>=70?"verified":"unverified"}));
        let answer, draft, reliability=0;
        if(!hits.length){
          answer="الموضوع غير مفهرس في الفهرس القانوني المصري الحالي.";
        }else if(route==="drafting"){
          const matter=visibleMatters().find(m=>m.id===session.matter)||visibleMatters()[0];
          const client=matter?db.clients.find(c=>c.id===matter.client):db.clients[0];
          answer="تم تجهيز مسودة قانونية قابلة للمراجعة.";
          draft=`مسودة مرتبطة بالقضية ${matter?.id||"غير محددة"}\n\nأوكل السيد/السيدة ${client?.name||"العميل"} المحامي بإجراء جميع الأعمال المتعلقة بالقضية والادعاء والدفاع أمام الجهات المختصة.\n\nالمطلوب:\n${question}\n\nيجب مراجعة المسودة واعتمادها قبل الاستخدام.`;
          reliability=hits.reduce((n,h)=>n+h.score,0)/hits.length*.8;
        }else if(route==="analysis"){
          answer="تمت مطابقة الوقائع مع المبادئ القضائية ذات الصلة. الأنماط الظاهرة: التعويض عن الضرر المباشر، وجوب ثبوت الإخلال الجوهري، وحظر التفكيك بعد سريان العقد.";
          reliability=hits.reduce((n,h)=>n+h.score,0)/hits.length*.75;
        }else{
          answer="وفقًا للمصادر المفهرسة، يلزم مراعاة النصوص السارية وأحكام القضاء ذات الصلة، مع عدم اعتبار الإجابة بديلاً عن مراجعة المحامي.";
          reliability=hits.reduce((n,h)=>n+h.score,0)/hits.length*.8;
        }
        if(/أجنب|دولي|foreign/i.test(wrappedPrompt)) answer+="\n\nعنصر أجنبـي: تحديد القانون الواجب تطبيقه يخضع لقواعد الإسناد المصرية، المواد 10 إلى 28 من القانون المدني. القانون الأجنبي خارج الفهرس المفهرس.";
        reliability=Math.round(reliability);
        const assistant=session.messages.findLast(m=>m.role==="assistant");
        if(assistant) Object.assign(assistant,{content:answer,progress:100,sources,reliability,draft,trace:{prompt:wrappedPrompt,model:"mock-hybrid-rag-v1",chunks:hits.map(h=>h.source.id),scores:hits.map(h=>h.score)},time:now()});
        audit("توليد استجابة المساعد القانوني في "+session.id+": "+route);
        save();render();
      },850);
    }
    function openLegalForMatter(id){
      state.selectedMatter=id;
      const session=ensureLegalSession();
      session.matter=id;
      save();
      setPage("legal");
    }
    function sendLegalReview(sessionId){
      const session=db.legalSessions.find(s=>s.id===sessionId);if(!session) return;
      const assistant=[...session.messages].reverse().find(m=>m.role==="assistant");
      if(!assistant) return;
      const matter=visibleMatters().find(m=>m.id===session.matter)||visibleMatters()[0];
      db.reviews.push({id:"R"+(db.reviews.length+1),title:"مراجعة استجابة المساعد القانوني",matter:matter?.id||"",body:assistant.draft||assistant.content,status:"pending",priority:assistant.reliability<40?"عاجل":"عادي",sourceTrace:assistant.trace});
      audit("إرسال استجابة المساعد القانوني للمراجعة الاعتمادية");
      save(); setPage("review"); toast("تم إرسال النتيجة للمراجعة");
    }
    function setPage(page){ state.page=page; closeModal(); render(); }
    function render() {
      if(!state.user) { loginView(); return; }
      const app=$("#app");
      const nav=roleNav[state.user.role] || roleNav.secretary;
      const unreadLegal=(db.notifications||[]).filter(n=>n.to===state.user.email&&!n.read).length;
      app.innerHTML=`
        <div class="shell">
          <aside class="sidebar">
            <div class="brand"><div class="brand-mark">ح</div><div class="brand-text"><strong>حُجّة</strong><small>إدارة المكتب</small></div></div>
            <nav class="nav">
              ${nav.map(([page,label])=>`<button class="${state.page===page?"active":""}" onclick="setPage('${page}')">${icons[page]}<span>${label}</span></button>`).join("")}
            </nav>
            <div class="user-card"><strong>${esc(state.user.name)}</strong><small>${esc(state.user.email)}</small><button class="logout" onclick="logout()">تسجيل الخروج</button></div>
          </aside>
          <div class="main">
            <header class="topbar">
              <div class="search-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg>
                <input id="global-search" placeholder="بحث في القضايا والعملاء والفواتير..." autocomplete="off">
                <div id="search-results" class="search-results"></div>
              </div>
              <div class="top-actions"><button class="icon-btn" title="${unreadLegal?"تحديثات قانونية جديدة: "+unreadLegal:"سجل النشاط"}" onclick="setPage('dashboard')">${unreadLegal?"⚖ "+unreadLegal:"⌚"}</button></div>
            </header>
            <main class="content">${({
              dashboard,cases,clients,invoices,users:usersPage,audit:auditPage,
              calendar:calendarPage,tasks:tasksPage,time:timePage,funds:fundsPage,
              docs:docsPage,legal:legalPage,review:reviewPage,compliance:compliancePage
            })[state.page]?.() || dashboard()}</main>
          </div>
        </div>`;
      const search=$("#global-search");
      search.addEventListener("input", e=>{
        const results=searchRecords(e.target.value);
        const box=$("#search-results");
        if(!e.target.value.trim()) { box.classList.remove("show"); box.innerHTML=""; return; }
        box.innerHTML=results.length ? results.map(r=>`<button class="result" onclick="setPage('${r.page}');closeSearch()"><strong>${esc(r.title)}</strong><small>${esc(r.type)} — ${esc(r.sub)}</small></button>`).join("") : `<div class="empty">لا توجد نتائج مطابقة</div>`;
        box.classList.add("show");
      });
      search.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSearch(); });
      save();
    }
    function closeSearch(){ const box=$("#search-results"); if(box) box.classList.remove("show"); }
    function logout(){ state.user=null; state.page="dashboard"; render(); }

    render();
