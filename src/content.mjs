/* ANT8 website content & page templates.
   Edit copy here; run `npm run build` to regenerate /dist. */
const CONFIG = {
  reviewMode: process.env.REVIEW === "1", // `npm run build:review` shows “Needs ANT8 input” markers.
  siteUrl: "https://ant8.be", // main domain (used for canonical URLs + sitemap); ant8.eu redirects here via public/.htaccess
  formEndpoint: "/api/contact.php", // PHP handler in public/api/contact.php (sends via Microsoft 365); set "" to fall back to mailto
  heroHeadline: ["Let’s build your", "logistics together."],
  // Hero video slot. Paste the Higgsfield export URL(s) here (MP4 H.264 + optional WebM).
  heroVideo: { mp4: "", webm: "", mobileMp4: "", poster: "" }, // e.g. mp4: "/assets/video/hero.mp4"
  // Photo slots: brand illustration panels until a photo path is set, e.g. "scene-pm": "/assets/img/photo-project-meeting.webp"
  photos: { "scene-pm": "", "scene-interim": "", "scene-expertise": "", "scene-ant8": "" },
  email: "info@ant8.eu",
  phone: "+32 470 18 20 11", phoneHref: "+32470182011",
  address: "Sparrenstraat 19, 9820 Merelbeke-Melle",
  vat: "BE 1039.591.659",
  // External links: left empty until confirmed, rendered as plain text (no dead links).
  links: { linkedin: "", krisLinkedin: "", gembit: "https://www.gembit.eu/", logicore: "https://www.logicore.be/", logiminds: "https://www.logiminds.be/", mitralogic: "" }
};
const IMG = {
  warehouse: "/assets/img/iso-warehouse.webp",
  twin: "/assets/img/iso-twin.webp",
  dash: "/assets/img/dash-network.webp",
  map: "/assets/img/map-benelux.webp",
  hero: "/assets/img/iso-warehouse-hero.webp",
  "scene-pm": "/assets/img/scene-pm.webp",
  "scene-interim": "/assets/img/scene-interim.webp",
  "scene-expertise": "/assets/img/scene-expertise.webp",
  "scene-ant8": "/assets/img/scene-ant8.webp",
  "scene-analysis": "/assets/img/scene-analysis.webp",
  "scene-network": "/assets/img/scene-network.webp",
  "scene-ai": "/assets/img/scene-ai.webp",
  "still-pm": "/assets/img/still-pm.webp",
  "still-interim": "/assets/img/still-interim.webp",
  "still-expertise": "/assets/img/still-expertise.webp",
  "ic-pm": "/assets/img/ic-pm.webp",
  "ic-interim": "/assets/img/ic-interim.webp",
  "ic-analysis": "/assets/img/ic-analysis.webp",
  "ic-network": "/assets/img/ic-network.webp",
  "ic-expertise": "/assets/img/ic-expertise.webp",
  "ic-ai": "/assets/img/ic-ai.webp",
  "ic-listen": "/assets/img/ic-listen.webp",
  "ic-analyse": "/assets/img/ic-analyse.webp",
  "ic-build": "/assets/img/ic-build.webp",
  "ic-handover": "/assets/img/ic-handover.webp",
  "ic-done": "/assets/img/ic-done.webp",
  "spark": "/assets/img/spark-outline.webp"
};

const SVC_ICO = {"project-management":"ic-pm","interim-management":"ic-interim","analysis":"ic-analysis","network-analysis":"ic-network","expertise-on-demand":"ic-expertise","ai-agents":"ic-ai"};
const STEP_ICO = ["ic-listen","ic-analyse","ic-build","ic-handover","ic-done"];
const SPARK = '<svg class="sparkle" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.9 6.6 4.9 10.9 12 12-7.1 1.1-11.1 5.4-12 12-.9-6.6-4.9-10.9-12-12C7.1 10.9 11.1 6.6 12 0z"/></svg>';
const ARROW = '<span class="arr" aria-hidden="true">→</span>';

const SERVICES = [
  { id:"project-management", name:"Project management", short:"Bridging IT and operations to one go-live.",
    eyebrow:"01 · Project management", title:"One go-live, not two camps",
    problem:"IT blames operations, operations blames IT, and the vendor keeps invoicing.",
    how:"We translate what the floor needs into what IT must build, and keep IT, operations and the vendor working towards one go-live.",
    proof:"56% of WMS go-lives run into delays.", link:["why-wms-go-lives-slip","Read: why most WMS go-lives slip"],
    cta:"Talk to an expert about your project", photo:"Project meeting between IT, operations and the vendor", scene:"still-pm" },
  { id:"interim-management", name:"Interim management", short:"We run part of the daily work, so your managers can lead the change.",
    eyebrow:"02 · Interim management", title:"Free your team to lead the change",
    problem:"Your managers can’t run the operation and lead a WMS project at the same time. And who takes over when one is out for three months?",
    how:"We take over part of the daily work or step into a role, for a few days a month or a full transition period.",
    proof:"Senior logistics leaders, for as long as you need us.", cta:"Talk to an expert about interim support", photo:"Experienced manager at work on the warehouse floor", scene:"still-interim" },
  { id:"analysis", name:"Analysis", short:"Find what to fix first, before the project starts.",
    eyebrow:"03 · Analysis", title:"Know what to fix first",
    problem:"Logistics has been eating your margin for years, but nobody can say where.",
    how:"We find what matters most before any project starts. Making 5% of your operation twice as good won’t impress your CFO.",
    proof:"A focused analysis in weeks, not a six-month audit.", cta:"Talk to an expert about an analysis", illus:"dash" },
  { id:"network-analysis", name:"Network analysis", short:"The right warehouse and transport mode for every order.",
    eyebrow:"04 · Network analysis", title:"The right warehouse for every order",
    problem:"With several warehouses, habit decides where an order ships from, not cost.",
    how:"We model your real shipments and calculate which warehouse and transport mode should serve each region, without overloading any site.",
    proof:"−19% transport cost at a wholesaler with three warehouses.", cta:"Talk to an expert about your network", caseCard:true },
  { id:"expertise-on-demand", name:"Expertise on demand", short:"We build it with your team, then hand it over.",
    eyebrow:"05 · Expertise on demand", title:"We build it with your team",
    problem:"You need digitisation, KPI dashboards or extra hands, but not a permanent hire.",
    how:"We work alongside your experts and hand over once they can run it themselves.",
    proof:"Knowledge stays in-house.", cta:"Talk to an expert", photo:"Expert and client team working together", scene:"still-expertise" },
  { id:"ai-agents", name:"AI agents & custom apps", short:"Tools that fit how your warehouse works." }
];

const FAQ = [
  ["Does Ant8 work with one WMS vendor?","No. Ant8 is system-agnostic: SAP EWM, Manhattan and many others. Your operation decides which system fits."],
  ["We already have an integrator. Why would we need an independent project lead?","The integrator builds the system. Ant8 makes sure it fits your operation and keeps IT, operations and the vendor working towards one go-live."],
  ["How is Ant8 different from a big consultancy?","Ant8 only puts senior experts on your project who have done the work themselves, and stays until the solution is built and running."],
  ["How does Ant8 charge?","Ant8 works on a day rate for ongoing support and interim roles, or a fixed price for a clearly scoped project."],
  ["Is my company too small for Ant8?","No. Ant8 works with companies of any size and sector, from service providers to in-house warehouses."],
  ["How fast can Ant8 start?","Ant8 agrees on a start date in the first conversation, based on your timeline and the right expert."],
  ["What happens when an Ant8 project ends?","You decide when Ant8 is done. By then your team runs it without us, and we stay reachable."],
  ["Who is behind Ant8?","Ant8 is part of the Gembit group, with decades of WMS implementation experience and its own development team."],
  ["Can Ant8 help us with AI?","Yes. Ant8 builds AI agents into your workflows, from checking documents to automating a full process with your team in the loop."]
];

const WHY = [
  ["Senior experts only.","No juniors learning the job on your project."],
  ["We start by listening.","Your need sets the scope."],
  ["We’ve been in your shoes.","We know the pitfalls, so you skip them."],
  ["We build, not just advise.","No slide deck that leaves the implementation to you."],
  ["You decide when we’re done.","We leave when you say the job is done."],
  ["Backed by the Gembit group.","WMS experience, own developers and logistics experts under one roof."],
  ["Logistics only.","It is our only focus and our passion."]
];

const STEPS = [
  ["Listen","Your need sets the scope."],["Analyse","We find what matters most first."],
  ["Build together","Senior experts work alongside your team."],["Hand over","Knowledge stays in-house."],
  ["You decide when we’re done","And we stay reachable."]
];

// Signature section: illustrative translations floor → system → floor (provisional copy).
const TWIN = [
  { floor:"Pickers cross the whole warehouse for a single order.", sys:"Slotting rules and pick paths that put fast movers close to the dock.", back:"Fewer metres per order line, visible per shift." },
  { floor:"Trucks arrive unannounced and the dock jams by ten.", sys:"Dock scheduling with booked slots and expected volume per hour.", back:"A planned inbound day, with people where the volume is." },
  { floor:"The system says it’s in stock. The shelf says otherwise.", sys:"Location control, cycle counts and clear rules for every exception.", back:"An inventory figure that the floor and finance both trust." },
  { floor:"Automation is quoted, but nobody knows if it will pay back.", sys:"A business case on your own order profile, before any vendor chooses the technology.", back:"An investment your operation can actually run." }
];

// Warehouse Maturity Assessment V0 (Ant8): website selection of 33 of the 108 questions (3 per domain) (Q = workbook number), 11 domains, rating 1–5. Source: Warehouse_Maturity_Assessment_Tool_V0.xlsx
const ASSESS = [{"d": "Strategy, Governance & Performance Management", "qs": [["Service level targets (OTIF, cut-off times) are defined and drive staffing and process design", ["No formal targets; work is processed as it arrives regardless of urgency or customer requirements.", "Targets exist but are informal or “best effort”; staffing is static and does not change based on peak volumes.", "Service levels and cut-offs are documented and used to determine daily shift patterns and labor requirements.", "Staffing models and warehouse processes (e.g., fast-pick lanes) are engineered specifically to meet tiered SLAs.", "Predictive labor modeling; staffing and process flows adjust in real-time to guarantee 100% SLA compliance at optimal cost."], 2], ["A balanced KPI set exists (service, cost, quality, safety) with clear ownership and routines", ["KPIs are focused on a single metric (usually volume/speed); safety and quality are not formally tracked.", "Multiple KPIs exist in different reports, but they are not “balanced” or reviewed as a cohesive set.", "A structured Balanced Scorecard is used; owners are assigned to each pillar and reviewed monthly.", "Digital dashboards show real-time KPI performance; daily tiered huddles use data to drive shift-level ownership.", "KPIs are linked to financial outcomes and employee incentives; predictive KPIs identify risks before they hit the scorecard."], 3], ["Warehouse cost-to-serve is understood and tracked versus budget", ["Costs are only understood as a total lump sum on a monthly P&L; no visibility into specific drivers.", "Total warehouse spend is tracked against budget, but costs per unit or per order are not calculated.", "Cost-to-serve is calculated at an aggregate level (e.g., cost per case) and reviewed against budget monthly.", "Granular cost-to-serve visibility (by activity, customer, or product type); variances are analyzed for root cause.", "Fully transparent “Activity Based Costing” (ABC); real-time cost-to-serve data drives commercial pricing and site optimization."], 4]]}, {"d": "Network Design & Contracting", "qs": [["Transport planning (routing, consolidation, mode selection) is systematic", ["Manual planning; planners rely on memory and local knowledge to group orders.", "Use of basic tools (e.g., Excel) to group orders by region; limited mode optimization.", "Systematic planning via TMS; standard logic for routing and order consolidation.", "Advanced optimization algorithms for multi-stop routing and dynamic mode selection.", "AI-driven planning that adapts to real-time traffic, weather, and carrier capacity in a dynamic network."], 14], ["Multi-site fulfilment rules optimize cost-to-serve and service", ["Orders are fulfilled from whichever site sees them first; no centralized logic.", "Basic rules exist (e.g., “always ship from closest”) but are frequently bypassed manually.", "Formal fulfillment rules balance proximity with inventory availability across the network.", "System-automated logic optimizes site selection based on real-time Total Cost to Serve and delivery speed.", "Real-time load balancing across sites to maximize network capacity and minimize environmental and financial costs."], 15], ["Network design decisions are reviewed periodically using scenarios", ["Network is static and rarely reviewed.", "Network changes are made ad-hoc in response to a specific site closure.", "Periodic (annual/bi-annual) review of network nodes and flows.", "Digital modeling used to test “what-if” scenarios for future growth.", "Real-time Digital Twin used for continuous network optimization."], 19]]}, {"d": "Technology, Automation & Data", "qs": [["WMS supports core processes reliably (receiving, putaway, pick, pack, ship)", ["Core processes are managed via paper, whiteboards, or manual spreadsheets; no formal WMS is in place.", "An old, unsupported legacy system is used; it is prone to instability, lacks vendor updates, and often requires manual workarounds to bypass system limitations.", "A standard, supported WMS is in place that reliably tracks core warehouse processes with minimal downtime and documented SOPs.", "WMS is highly optimized with system-directed tasks (e.g., task interleaving, opportunistic replenishment) and real-time data sync with the ERP.", "Industry-leading utilization; the system acts as a real-time orchestrator for human labor and advanced robotics/automation, with predictive capability."], 22], ["System integrations (ERP, TMS, carriers) are stable and monitored", ["No automated integrations; data is re-keyed manually between ERP, TMS, and carrier portals.", "Basic batch integrations exist but frequently fail, requiring daily manual reconciliation and IT intervention.", "Stable, real-time EDI or API integrations are in place across all core platforms with defined error-handling protocols.", "Integrations are proactively monitored via automated dashboards; system latency is measured and optimized for performance.", "Seamless “plug-and-play” digital ecosystem; real-time data flows enable end-to-end visibility and automated cross-platform decision-making."], 24], ["Automation roadmap exists and is reviewed regularly (ROI, readiness)", ["No plan for automation; technology is viewed as too complex or unnecessary.", "Ad-hoc interest in technology; some pilot projects exist but they are not linked to a broader long-term strategy.", "A 3-to-5-year automation roadmap exists, aligned with business growth and financial ROI targets.", "The roadmap is reviewed quarterly against operational “readiness” scores and evolving technology costs.", "A continuous innovation cycle; the roadmap is a living document that incorporates frontier technologies (e.g., humanoid robotics, AI orchestration)."], 32]]}, {"d": "People, Safety & Workforce Planning", "qs": [["Safety KPIs, near-miss reporting, and corrective actions are active", ["Safety is reactive; incidents are only recorded when an injury occurs.", "Basic safety stats are tracked, but near-miss reporting is discouraged or ignored.", "A formal safety program is in place with active near-miss reporting and documented corrective actions for every incident.", "Safety performance is a leading KPI in every shift huddle; “Behavioral Based Safety” (BBS) audits are performed regularly.", "Zero-harm culture; predictive analytics identify high-risk conditions before an incident occurs, and safety is engineered into every process."], 33], ["Labor is planned using volume drivers and productivity assumptions", ["Staffing is fixed; managers hire based on “gut feel” rather than incoming volume forecasts.", "Staffing is adjusted based on historical averages, but lacks a direct link to specific volume drivers.", "Labor is planned weekly using forecast volume drivers and historical productivity rates.", "Daily labor planning uses engineered standards and granular productivity assumptions per task type.", "Real-time labor orchestration; system dynamically reassigns staff based on live volume fluctuations and task priorities."], 37], ["Succession planning exists for key warehouse roles", ["No succession plan; the departure of a key individual causes significant operational disruption.", "Informal “backups” exist for some roles, but they lack training or formal designation as successors.", "A documented succession plan identifies potential candidates for critical leadership and technical roles.", "High-potential candidates have active development plans and are “shadowing” current incumbents; plans are reviewed annually.", "A robust talent pipeline is automated via HR systems; the organization has “ready-now” successors for all critical nodes."], 43]]}, {"d": "Inbound Planning & Receiving", "qs": [["Inbound is scheduled with appointment rules and/or ASNs to smooth workload", ["No appointments or ASNs (Advanced Shipping Notices); carriers show up “first-come, first-served.”", "Basic appointment scheduling via phone/email, but adherence is low and ASN data is rarely used.", "Formal appointment portal in place; ASNs are required for all major suppliers to plan labor 24-48 hours in advance.", "System-enforced appointment rules; ASN data automatically populates receipt records, reducing data entry and smoothing flow.", "Strategic “Flow-through” logic; inbound appointments are automatically optimized to match outbound demand windows and labor availability."], 45], ["Receiving is standardized (checks, count method, exceptions) with clear roles", ["Receiving is ad-hoc; check methods and count accuracy vary significantly between individual operators.", "Basic SOPs exist, but the unsupported legacy system requires manual “offline” tallying before data can be keyed in.", "Standardized receiving processes are documented and followed; roles are clearly defined for checkers, drivers, and clerks.", "System-guided receiving enforces count methods and exception handling; performance is tracked against engineered standards.", "Highly automated receiving; computer vision or RFID validates shipments instantly, with exceptions managed by system-driven alerts."], 47], ["Putaway (dock-to-stock) lead time is measured; fast-movers and OOS are available quickly", ["Putaway time is not tracked; inbound stock often sits on the dock for days, causing out-of-stocks (OOS) while inventory is physically present.", "Basic tracking exists, but the unsupported system lacks “hot-move” prioritization, requiring manual intervention to find urgent stock.", "Dock-to-Stock lead time is measured and reported; high-priority items (OOS/Fast-movers) are flagged for immediate putaway.", "System-directed putaway optimizes travel paths and prioritizes urgent stock automatically to ensure immediate availability.", "Real-time visibility; putaway is synchronized with replenishment needs, ensuring zero-lag for critical inventory and high-velocity lines."], 49]]}, {"d": "Storage, Slotting & Replenishment", "qs": [["Space utilization is measured (cube, locations) and capacity planning is proactive", ["Space is managed by “sight”; no formal measurements of cube or location utilization exist.", "The system tracks location occupancy but lacks “cube” visibility; capacity planning is done manually in spreadsheets.", "Monthly reporting on location and volumetric utilization is used to plan for peak seasons or inventory builds.", "Real-time dashboards show volumetric “fill” across the facility; the system proactively suggests consolidation tasks.", "AI-driven capacity modeling; the warehouse footprint is dynamically managed across a wider network for maximum efficiency."], 58], ["ABC/velocity-based slotting is in place with periodic re-slotting", ["No slotting logic; items are stored randomly or in the order they were first received years ago.", "Static slotting; the legacy system makes re-slotting difficult, so fast-movers often remain in hard-to-reach locations.", "Formal ABC analysis is conducted quarterly, and high-velocity “A” items are manually moved to optimal pick zones.", "The WMS continuously monitors velocity and automatically triggers “re-slotting” tasks during low-activity periods.", "Predictive slotting; the system anticipates demand spikes and pre-positions inventory in the “golden zone” before orders arrive."], 59], ["Pick bins replenishment is triggered systematically (min/max, demand) rather than ad hoc", ["Replenishment is purely reactive; pickers must stop and call for a refill when a bin is empty.", "Manual “hot-sheets” are used because the legacy system’s min/max logic is broken or too slow to update.", "WMS uses static min/max levels to trigger replenishment tasks automatically before the picker arrives.", "Dynamic replenishment; the system triggers moves based on real-time order waves and actual velocity, not just static levels.", "Fully predictive replenishment; inventory “flows” to the pick face in perfect synchronization with automated picking cycles."], 60]]}, {"d": "Inventory Accuracy & Control", "qs": [["Inventory record accuracy is measured and owned; targets are set", ["Accuracy is unknown; inventory levels are only “corrected” during an annual physical count.", "Accuracy is tracked sporadically; targets exist but there is no clear owner or formal routine for reconciliation.", "Monthly accuracy measurement against set targets (e.g., 98%+); a designated inventory controller owns the results.", "Weekly reporting by zone and product type; real-time accuracy dashboards are visible to all operational staff.", "99.9%+ accuracy maintained through real-time transactional enforcement; discrepancy-driven counts eliminate the need for scheduled audits."], 66], ["All inventory movements are system-controlled and transactionally enforced", ["Physical moves happen without system updates; operators “know where things are” regardless of what the screen says.", "Most moves are recorded, but manual workarounds (e.g., paper notes) are used to “fix” locations later.", "Every move requires a system transaction (scan or voice command); the WMS enforces “Directed Putaway” and “Directed Picking.”", "Real-time movement validation; the system prevents a user from dropping stock in an incorrect or full location.", "Automated movement; IoT-enabled racks or robotics update the inventory record instantly as physical items are moved."], 67], ["Cycle counting is risk-based (ABC) with root cause on variances", ["No cycle counting; the warehouse relies solely on a yearly wall-to-wall physical inventory.", "Some cycle counting occurs, but it is random or only happens when a picker can’t find an item.", "A formal ABC-based cycle count program is active; high-velocity items are counted more frequently than “C” items.", "Systematic root-cause analysis (RCA) is performed for every significant variance; counts are triggered by “low stock” alerts.", "Predictive counting; the system identifies locations with a high probability of error based on activity patterns and targets them for audit."], 68]]}, {"d": "Order Fulfilment (Pick, Pack & Returns)", "qs": [["Pick methods are chosen by profile (piece, case, pallet; batch, zone, wave)", ["A single pick method is used for all orders regardless of profile; inefficiencies and congestion are common.", "Supervisors choose methods informally based on experience; limited batching/zoning and no documented rules.", "Pick strategies are defined by order type (piece/case/pallet; wave/zone/batch) with documented triggers and standard work.", "Methods are optimized using data (velocity, cube, service tier); engineered pick paths and labor standards support predictable output.", "Pick method selection is dynamic and system-optimized in real time to balance service, cost, and flow."], 72], ["Quality checks exist (scan validation, audit, error-proofing)", ["No formal verification exists; picking errors are typically found at packing or by the customer.", "Manual or visual checks are used inconsistently; results depend on individual discipline.", "Scan validation is used at key control points (pick confirm, pack verify) with routine audits.", "Error-proofing (e.g., carton ID tracking, weight checks, pick-to-light) reduces defects; errors are analyzed and prevented.", "Near-zero defects: automated controls prevent wrong item/qty and continuously improve based on exception learning."], 74], ["Returns are processed with clear dispositions and feedback loops", ["Returns are handled case-by-case with unclear disposition; cycle times are long and inventory updates are delayed.", "Basic triage exists, but decisions and documentation are manual and inconsistent; limited feedback to upstream teams.", "Standard dispositions (restock/repair/scrap/RTV) with reason codes and SLAs; inventory is updated promptly.", "Reverse logistics is integrated with QC/refurbishment and supplier/customer feedback loops; return trends are analyzed.", "Value recovery is optimized through automated grading, resale/repair pathways, and prevention actions that reduce avoidable returns."], 78]]}, {"d": "Shipping, Yard & Carrier Execution", "qs": [["Daily cut-offs are met with visible control (wave timing, staging discipline)", ["Cut-offs are frequently missed; late-stage rushing, overtime, and staging chaos are common.", "Cut-offs are met mainly through firefighting near the deadline with limited visibility of progress.", "Cut-offs are planned via wave schedules and staging discipline; daily tracking ensures readiness.", "Visual management and real-time dashboards highlight risks early; cross-functional coordination protects service levels.", "Predictive control: systems forecast cut-off risk and adjust waves, priorities, and labor proactively to consistently hit targets."], 82], ["Yard/dock management prevents congestion; trailer moves are controlled", ["Yard and dock operations are unmanaged; congestion, long waits, and uncontrolled trailer moves occur.", "Dock activity is coordinated manually (calls/whiteboards); visibility of trailers and dwell time is limited.", "Standard yard/dock rules exist (check-in/out, appointments, move requests) and KPIs are reviewed.", "Digital yard/dock visibility (YMS or equivalent) provides dwell alerts, sequencing, and controlled moves.", "Dynamic optimization minimizes dwell time through automated sequencing, load-ready signals, and continuous improvement."], 83], ["Carrier performance is tracked (on-time pickup, claims) and reviewed", ["Carrier performance is not tracked; selections are based on habit, relationships, or price only.", "Reviews happen only after major issues; data is incomplete and not comparable.", "Regular scorecards report on-time pickup/delivery, damage, and claims with a defined review cadence.", "Structured reviews (QBRs) drive improvement plans and performance-linked incentives/penalties.", "Continuous performance management dynamically allocates volume to best-performing carriers and supports strategic partnerships."], 90]]}, {"d": "Operational Excellence & Continuous Improvement", "qs": [["Standard work is documented, audited, and updated with changes", ["No documented standard work; each shift/individual works differently.", "SOPs exist but are outdated, hard to find, or not followed consistently.", "Standard work is documented, trained, and available at point of use with version control.", "Layered audits and Gemba checks verify adherence; updates follow formal change control.", "Standards improve continuously and are shared across sites; best practices are embedded into daily operations."], 93], ["Warehouse productivity is measured and improved using defined metrics (travel, pick path, technology)", ["Productivity is not measured; drivers of output and waste are not understood.", "Basic measures are captured manually or irregularly; improvement actions are inconsistent.", "Regular productivity reporting uses clear definitions and targets (e.g., units/hour, travel, utilization).", "Engineered standards and analytics identify losses; improvement actions are tracked and validated.", "Productivity is continuously optimized using advanced analytics, technology, and proactive interventions."], 94], ["Continuous improvement cadence exists (Kaizen, A3) with prioritized backlog", ["No continuous improvement cadence exists; changes happen only after major issues.", "Improvements are ad hoc with no prioritization, backlog, or ownership.", "Regular CI events occur and a simple prioritized backlog is maintained.", "CI cadence is integrated with governance, resourcing, and benefit tracking tied to KPIs.", "Continuous improvement is embedded in daily work with portfolio management, ROI tracking, and a strong CI culture."], 97]]}, {"d": "Sustainability & Environmental Performance", "qs": [["Waste is measured and reduced (rework, scrap, travel, waiting)", ["Waste (rework, scrap, travel, waiting) is not measured; improvement is reactive.", "Only obvious waste is addressed; initiatives are isolated and not sustained.", "Waste categories and baselines are defined; regular measurement and reporting are in place.", "Targeted reduction programs have owners and targets; waste KPIs are reviewed routinely.", "Waste is designed out through layout, process, and technology; continuous improvement sustains low waste levels."], 103], ["Energy and emissions drivers are tracked; initiatives exist (lighting, charging)", ["Energy consumption and emissions are not tracked at site or process level.", "Monitoring is compliance-driven only; limited analysis or action is taken.", "Consumption and emissions are measured and reported; baselines are established for key drivers.", "Reduction initiatives are implemented (lighting, charging, equipment, behavior) and tracked against targets.", "Sustainability is embedded via energy management systems and continuous optimization; low-carbon choices guide decisions."], 104], ["Clear sustainability targets exist and ownership is assigned", ["No sustainability targets in logistics.", "High-level corporate goals; no specific logistics KPIs.", "Logistics-specific CO₂ and waste targets with assigned owners.", "Monthly reporting of actual environmental impact vs. targets.", "Net-zero logistics roadmap; carbon-positive operations."], 106]]}];
// Overall maturity thresholds (Lists sheet): min % → label
const LEVELS = [[0,"Initial"],[40,"Developing"],[55,"Defined"],[70,"Managed"],[85,"Optimized"]];
// Domain weights: equal (the V0 Weights sheet uses an older domain list; all weights there are equal)
const DOMAIN_W = ASSESS.map(()=>1);
// Suggested first step per domain when it scores lowest (NEEDS ANT8 CONFIRMATION)
const DOMAIN_SVC = {"Strategy, Governance & Performance Management": "analysis", "Network Design & Contracting": "network-analysis", "Technology, Automation & Data": "project-management", "People, Safety & Workforce Planning": "interim-management", "Inbound Planning & Receiving": "expertise-on-demand", "Storage, Slotting & Replenishment": "analysis", "Inventory Accuracy & Control": "expertise-on-demand", "Order Fulfilment (Pick, Pack & Returns)": "analysis", "Shipping, Yard & Carrier Execution": "network-analysis", "Operational Excellence & Continuous Improvement": "expertise-on-demand", "Sustainability & Environmental Performance": "analysis"};

/* ---------- helpers ---------- */
const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const todo = (label,inner,tag="div",cls="")=>`<${tag} class="todo ${cls}"><span class="todo-label">${SPARK} ${label}</span>${inner}</${tag}>`;
const extLink = (key,label,cls="")=> CONFIG.links[key] ? `<a class="${cls}" href="${esc(CONFIG.links[key])}" target="_blank" rel="noopener">${label}</a>` : `<span class="${cls}">${label}</span>`;
let pendingTopic = "";
export function setTopic(t){ pendingTopic = t || ""; }

const NAV = [["services","Services"],["insights","Insights"],["about","About"],["contact","Contact"],["assessment","Free assessment",true]];
const ROUTE_NAV = {"case-network-analysis":"insights","why-wms-go-lives-slip":"insights",careers:"about"};

const ctaBand = ()=>`
<section class="band pattern sec cta-band" aria-labelledby="cta-h"><img class="cta-spark" src="${IMG.spark}" alt="" width="600" height="599"><div class="wrap"><div class="inner">
  <h2 id="cta-h">We are the partner that walks it with you.</h2>
  <p>Tell us what is going on in your warehouse. A senior expert gets back to you.</p><a class="btn btn-neon" href="#contact">Talk to an expert</a>
</div></div></section>`;

const assessBanner = (compact)=>`
<div class="banner">
  <div class="txt"><span class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg></span>
  <div><h3>${compact?"Not sure where to start?":"Where does your warehouse stand?"}</h3><p>Rate your warehouse on up to 11 areas and get a free score straight away.</p></div></div>
  <a class="btn btn-neon" href="#assessment">Assess your warehouse</a>
</div>`;

const faqList = (items,id)=>`<div class="faq" ${id?`id="${id}"`:""}>${items.map(([q,a],i)=>`<details ${i===0&&!id?"":""}><summary>${q}<span class="pm" aria-hidden="true"></span></summary><p>${a}</p></details>`).join("")}</div>`;

const photo = (cap, scene)=>{ const src=(CONFIG.photos||{})[scene];
  return src ? `<div class="media photo"><img src="${esc(src)}" alt="${esc(cap)}"></div>`
             : `<div class="media scene"><img src="${IMG[scene]}" alt=""><span class="cap review-only">Placeholder panel. Replace with a photo: ${cap}</span></div>`; };

/* ---------- PAGES ---------- */
const PAGES = {};

const SVC_SCENE = {"project-management":"scene-pm","interim-management":"scene-interim","analysis":"scene-analysis","network-analysis":"scene-network","expertise-on-demand":"scene-expertise","ai-agents":"scene-ai"};
const CHALLENGES = [
  { id:"project-management", tag:"Project management", q:"Our WMS go-live has slipped twice. IT blames operations, operations blames IT.", ask:"Who actually owns this project?" },
  { id:"interim-management", tag:"Interim management", q:"Our managers spend every hour keeping the operation running.", ask:"How can we also ask them to lead the move to a new WMS?" },
  { id:"analysis", tag:"Analysis", q:"Logistics has been eating our margin for years.", ask:"We don’t know why, or where to start." }
];
const megaHtml = ()=>`<div class="mega" id="mega"><div class="mega-in">
  <div class="mega-grid">${SERVICES.map(s=>`<a class="mega-item" href="#services" data-goto="${s.id}"><span class="ico" aria-hidden="true"><img src="${IMG[SVC_ICO[s.id]]}" alt="" width="22" height="22"></span><span><b>${s.name}</b><small>${s.short}</small></span></a>`).join("")}</div>
  <div class="mega-side"><p>Not sure where to start?</p><a class="btn btn-neon btn-sm" href="#assessment">Assess your warehouse</a><a class="link" href="#services">All services</a></div>
</div></div>`;

PAGES.home = { title:"Ant8 · Independent logistics experts", desc:"Project management, interim management and analysis for warehouses going digital. Independent of any WMS: SAP EWM, Manhattan and many others.", overHero:true, html:()=>`
<section class="hero" aria-labelledby="hero-h">
  <div class="hero-media" id="heromedia"><div class="hero-fallback"><canvas class="hero-canvas" data-iso="hero" aria-hidden="true"></canvas></div></div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="wrap">
    <span class="eyebrow">Independent logistics experts</span>
    <h1 id="hero-h" tabindex="-1"><span class="ln"><span>${CONFIG.heroHeadline[0]}</span></span><span class="ln"><span>${CONFIG.heroHeadline[1]}</span></span></h1>
    <p class="sub">Project management, interim management and analysis for warehouses going digital.</p>
    <p class="indep">${SPARK}<span><b>Independent of any technology:</b> SAP EWM, Manhattan and many others. Your operation decides which system fits.</span></p>
    <div class="ctas"><a class="btn btn-neon" href="#contact">Talk to an expert</a><a class="btn btn-ghost" href="#services">Explore our expertise</a></div>
  </div>
  <aside class="next-card" aria-label="Free assessment">
    <span class="eyebrow">Free assessment</span>
    <p class="nc-title">Where does your warehouse stand?</p>
    <p class="nc-meta">33 questions · about 11 minutes · your score straight away</p>
    <a class="btn btn-neon btn-sm" href="#assessment">Start the assessment</a>
  </aside>
  <button class="anim-toggle hero-toggle" type="button" data-anim-toggle aria-pressed="false">Pause animation</button>
</section>

<section class="sec sec-light" aria-labelledby="intro-h"><div class="wrap statement">
  <h2 id="intro-h" class="big">IT and operations, <em>speaking the same language.</em></h2>
  <div class="stack" style="--s:22px"><p class="lead">We have run these projects as the operator, the project lead and the WMS implementer. So we translate what the floor needs into what the system must do, and back again.</p>
  <p class="muted">Warehouses are going digital: new WMS and TMS platforms, automation, robotics, AI. People who have actually run those projects are hard to find. That gap is why Ant8 exists.</p>
  <a class="link" href="#about">Who is behind Ant8</a></div>
</div></section>

<section class="sec-tight carousel sec-light" data-carousel aria-labelledby="wwd-h" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">What we do</span><h2 id="wwd-h" class="h-2">Six ways we help. One goal: simplify your logistics.</h2></div>
    <div class="sec-tools"><a class="link" href="#services">See all services</a><span class="arrows"><button class="arrow" type="button" data-prev aria-label="Previous services">←</button><button class="arrow" type="button" data-next aria-label="Next services">→</button></span></div></div>
</div>
  <div class="track" tabindex="0" aria-label="Services">
    ${SERVICES.map((s,i)=>`<a class="slide svc-card" href="#services" data-goto="${s.id}"><img src="${IMG[SVC_SCENE[s.id]]}" alt="" width="1200" height="900"><span class="svc-body"><span class="n">0${i+1}</span><b>${s.name}</b><span>${s.short}</span><span class="more">Explore ${ARROW}</span></span></a>`).join("")}
  </div>
</section>

<section class="band pattern pattern-dark sec" aria-labelledby="ch-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Sound familiar?</span><h2 id="ch-h" class="h-2">The conversations we have every week.</h2></div></div>
  <div class="voices" data-tabs>
    ${CHALLENGES.map((c,i)=>`<div class="voice-panel" id="vp${i}" role="tabpanel" aria-labelledby="vt${i}" ${i?"hidden":""}>
      <div class="voice-img"><img src="${IMG[SVC_SCENE[c.id]]}" alt="" width="1200" height="900"></div>
      <figure class="voice-q"><blockquote>“${c.q} <b>${c.ask}</b>”</blockquote><figcaption>A logistics or IT lead, every week</figcaption>
      <a class="btn btn-neon btn-sm" href="#services" data-goto="${c.id}">How ${c.tag.toLowerCase()} helps</a></figure></div>`).join("")}
    <div class="voice-tabs" role="tablist" aria-label="Challenges">${CHALLENGES.map((c,i)=>`<button class="voice-tab" role="tab" id="vt${i}" aria-controls="vp${i}" aria-selected="${i===0}" tabindex="${i?-1:0}" type="button"><span class="ico" aria-hidden="true"><img src="${IMG[SVC_ICO[c.id]]}" alt="" width="22" height="22"></span><span>${c.tag}</span></button>`).join("")}</div>
  </div>
</div></section>

<section class="sec sec-light" aria-labelledby="twin-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Our approach</span><h2 id="twin-h" class="h-2">The operation and its digital twin.</h2>
  <p class="lead" style="margin-top:18px">Always starting from the reality on the floor. Pick a situation and see how we translate it into what the system must do, and what the floor gets back.</p></div></div>
  <div class="twin">
    <div class="twin-tabs" role="tablist" aria-label="Situations on the warehouse floor" id="twintabs">
      ${TWIN.map((t,i)=>`<button class="twin-tab" role="tab" id="tt${i}" aria-controls="twinpanel" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span class="n">0${i+1}</span><span>${t.floor}</span></button>`).join("")}
    </div>
    <div class="twin-panel" id="twinpanel" role="tabpanel" aria-labelledby="tt0" aria-live="polite">
      <img src="${IMG.twin}" alt="Isometric illustration: a physical warehouse next to its digital twin, connected by a data link">
      <dl class="twin-steps" id="twinsteps"></dl>
    </div>
  </div>
  <p class="twin-note">Illustrative examples. Every project starts from your own floor.</p>
</div></section>

<section class="band pattern sec results" aria-labelledby="res-h"><div class="wrap res-grid">
  <div><span class="eyebrow">Proof</span><h2 id="res-h" class="h-2">Results the operation can actually run.</h2>
    <p class="lead" style="margin-top:18px">A Belgian technical wholesaler with three warehouses asked which site should ship which order. We modelled 50,000+ real shipments and recommended the scenario every warehouse could carry.</p>
    <div class="big-stats"><div><b>−19%</b><span>transport cost in the recommended scenario</span></div><div><b>~85%</b><span>of the theoretical maximum saving captured</span></div><div><b>58%</b><span>of baseline cost in one warehouse’s flows</span></div></div>
    <a class="btn btn-neon" href="#case-network-analysis">Read the case</a></div>
  <div class="res-media"><img src="${IMG.warehouse}" alt="Isometric illustration of a warehouse with performance indicators"></div>
</div></section>

<section class="sec sec-light sec-white shorts" aria-labelledby="mo-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Automation, in motion</span><h2 id="mo-h" class="h-2">People, systems and robots working as one operation.</h2>
  <p class="lead" style="margin-top:18px">We don’t sell robots. We help you decide what fits your operation, and make it work with your WMS and your people.</p></div>
  <div class="sec-tools"><button class="anim-toggle light" type="button" data-anim-toggle aria-pressed="false">Pause animation</button></div></div>
  <div class="shorts-grid">${[["gtp","Goods-to-person robots","AMRs bring the shelf to the picker, so people stop walking the aisles."],["conveyor","Conveyors and pack stations","Totes flow to the right station; your team handles the exceptions."],["drone","Drone cycle counts","Every location counted while the operation keeps running."]].map(([k,t,d])=>`<figure class="short"><div class="short-media"><canvas data-iso="${k}" role="img" aria-label="Animated illustration: ${t}"></canvas><span class="short-tag">Animation</span></div><figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join("")}</div>
  <p class="shorts-note"><a class="link" href="#contact" data-topic="Something else">Talk to us about automation readiness</a></p>
</div></section>

<section class="sec band pattern pattern-dark" aria-labelledby="how-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">How we work</span><h2 id="how-h" class="h-2">From first conversation to a team that runs it without us</h2></div></div>
  <ol class="steps">${STEPS.map((s,i)=>`<li><div class="top"><span class="n">0${i+1}</span><span class="ico" aria-hidden="true"><img src="${IMG[STEP_ICO[i]]}" alt="" width="24" height="24"></span></div><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join("")}</ol>
</div></section>

<section class="sec sec-light" aria-labelledby="why-h"><div class="wrap why">
  <div><span class="eyebrow">Why Ant8</span><h2 id="why-h" class="h-2">Senior. Hands-on. Logistics only.</h2></div>
  <ul>${WHY.map(w=>`<li>${SPARK}<span><b>${w[0]}</b> ${w[1]}</span></li>`).join("")}</ul>
</div></section>

<section class="sec sec-light sec-white" aria-labelledby="ins-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Insights</span><h2 id="ins-h" class="h-2">What we see on the floor</h2></div><div class="sec-tools"><a class="link" href="#insights">All insights</a></div></div>
  <div class="ev-grid">
    <a class="ev-card" href="#case-network-analysis"><span class="ev-img pattern"><b>−19%</b></span><span class="ev-body"><span class="tag">Case</span><b class="ev-title">19% lower transport cost, within today’s capacity</b><span class="ev-desc">Which warehouse should ship which order? A network analysis on 50,000+ shipments.</span><span class="ev-meta"><span><small>Service</small>Network analysis</span><span><small>Read</small>5 min</span></span></span></a>
    <a class="ev-card" href="#why-wms-go-lives-slip"><span class="ev-img"><img src="${IMG.twin}" alt=""></span><span class="ev-body"><span class="tag">Article</span><b class="ev-title">Why do most WMS go-lives slip?</b><span class="ev-desc">More than half run into delays. A common cause: nobody on the team has run a project like this before.</span><span class="ev-meta"><span><small>Service</small>Project management</span><span><small>Read</small>5 min</span></span></span></a>
  </div>
</div></section>
${ctaBand()}`};

PAGES.services = { title:"Services · Ant8", desc:"Project management, interim management, analysis, network analysis, expertise on demand and AI agents for warehouses. Independent of any WMS or TMS.", html:()=>`
<section class="phero"><div class="wrap">
  <span class="eyebrow">Services</span><h1 class="h-1" tabindex="-1" style="max-width:16ch">Six ways we help. One goal: simplify your logistics.</h1>
  <p class="lead">Every service starts from the reality on your warehouse floor and ends when your team runs it without us. We work with any WMS or TMS, so our advice is never tied to a product.</p>
  <div class="chips">${SERVICES.map(s=>`<button class="chip" type="button" data-scroll="${s.id}">${s.name}</button>`).join("")}</div>
  <div style="margin-top:40px">${assessBanner(true)}</div>
</div></section>

<section class="sec sec-light sec-white" aria-labelledby="ap-h"><div class="wrap">
  <div class="approach-head"><div><span class="eyebrow">Our approach</span><h2 id="ap-h" class="h-2">IT and operations, speaking the same language.</h2>
  <p class="lead" style="margin-top:20px">We have run these projects as the operator, the project lead and the WMS implementer. So we translate what the floor needs into what the system must do, and back again.</p></div>
  <div class="stats"><div class="stat"><b>56%</b><span>of WMS go-lives run into delays</span></div><div class="stat"><b>30%</b><span>of WMS projects fail</span></div></div></div>
  <div class="options">
    <div class="opt"><small>Option 1</small><h3>A big-name consultancy</h3><p>Sharp slides and frameworks, but they have never worked a shift in a warehouse.</p></div>
    <div class="opt"><small>Option 2</small><h3>Your warehouse lead</h3><p>Knows the operation inside out, but running it takes every hour they have.</p></div>
    <div class="opt win"><small>Option 3 · Ant8</small><h3>People who have done it from all sides</h3><p>Operator, analyst, project lead and implementer. We know how systems can serve the operation.</p></div>
  </div>
  <p class="source">Source: FulfillmentIQ, “Overcoming WMS implementation timeline delays”, 2024.</p>
</div></section>

<section class="sec sec-light" style="padding-top:calc(var(--sec)*.5)"><div class="wrap">
${SERVICES.slice(0,5).map((s,i)=>`
  <article class="srow ${i%2?"flip":""}" id="${s.id}" aria-labelledby="${s.id}-h">
    <div class="txt"><span class="eyebrow">${s.eyebrow}</span><h2 id="${s.id}-h" class="h-2" style="font-size:clamp(1.9rem,3vw,2.6rem)">${s.title}</h2>
      <p class="problem">${s.problem}</p><p class="how">${s.how}</p>
      <p class="proof">${SPARK}<span>${s.proof}</span></p>
      <div class="acts"><a class="btn btn-teal btn-sm" href="#contact" data-topic="${s.name}">${s.cta}</a>${s.link?`<a class="link" href="#${s.link[0]}">${s.link[1]}</a>`:""}</div></div>
    ${s.caseCard?`<a class="quote-card pattern" href="#case-network-analysis" style="text-decoration:none"><blockquote>“The cheapest scenario on paper overloads one warehouse. We advised the one the operation can actually run.”</blockquote><div><span class="eyebrow" style="margin-bottom:6px">Case · Belgian technical wholesaler</span><b class="k">−19% transport cost</b><span class="link" style="display:inline-block;margin-top:12px">Read the case</span></div></a>`
      : s.illus?`<div class="media illus"><img src="${IMG[s.illus]}" alt="Illustration of an analysis dashboard"></div>` : photo(s.photo, s.scene)}
  </article>`).join("")}

  <article class="ai-box band pattern pattern-dark" id="ai-agents" aria-labelledby="ai-h">
    <span class="eyebrow">06 · AI agents &amp; custom apps</span>
    <h2 id="ai-h" class="h-2" style="font-size:clamp(1.9rem,3vw,2.6rem);max-width:20ch">AI agents and custom apps, made for your warehouse</h2>
    <p class="problem" style="font-weight:700;margin-top:16px">Your people spend hours on work a machine could do.</p>
    <div class="ai-cards">
      <div class="ai-card"><h4>AI in your workflow</h4><p>Agents take over repetitive checks, so your people spend their time where their knowledge counts.</p><div class="acts"><a class="link" href="#contact" data-topic="AI agents & custom apps">Ask how it works</a></div></div>
      <div class="ai-card"><h4>AI workflow automation</h4><p>An agent runs a complete process across your systems. Your team stays in the loop and only handles the exceptions.</p><div class="acts"><a class="link" href="#contact" data-topic="AI agents & custom apps">Ask how it works</a></div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-top:28px;padding-bottom:28px;border-bottom:1px solid var(--line)"><p class="proof" style="display:flex;gap:10px;margin:0">${SPARK}<span>Built by our in-house developers, around your systems.</span></p><a class="btn btn-teal btn-sm" href="#contact" data-topic="AI agents & custom apps">Talk to an expert about AI</a></div>
    <h3 class="h-3" style="margin-top:32px">Ready to use: two proven tools</h3>
    <p class="muted" style="font-size:.9375rem;margin-top:4px">When the fix already exists, we bring it in. Built by ${extLink("logiminds", "Logiminds", "link")}, part of Gembit.</p>
    <div class="ai-cards" style="margin-top:20px">
      <div class="ai-card"><span class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7 7l3 3m4 0l3-3M7 17l3-3m4 0l3 3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></svg></span>
        <small>Inventory-as-a-Service</small><h4>Count your whole warehouse without stopping it.</h4><p>Drones scan every location while your operation keeps running. No shutdown, no one working at height.</p>
        <div class="acts"><a class="btn btn-teal btn-sm" href="#contact" data-topic="Inventory-as-a-Service">Ask about it</a><span class="review-only">${todo("Product sheet PDF","<span class='muted' style='font-size:.875rem'>Download link</span>","span")}</span></div></div>
      <div class="ai-card"><span class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><rect x="8" y="7" width="8" height="10" rx="1"/><path d="M10 10h4M10 13h4"/></svg></span>
        <small>Intelligent inbound delivery</small><h4>Save 20–30 minutes on every delivery.</h4><p>Delivery notes are read and booked in your WMS automatically. Your team only checks the exceptions.</p>
        <div class="acts"><a class="btn btn-teal btn-sm" href="#contact" data-topic="Intelligent inbound delivery">Ask about it</a><span class="review-only">${todo("Product sheet PDF","<span class='muted' style='font-size:.875rem'>Download link</span>","span")}</span></div></div>
    </div>
  </article>
</div></section>

<section class="sec alt" aria-labelledby="for-h"><div class="wrap">
  <h2 id="for-h" class="h-2" style="max-width:20ch">Any warehouse, from a single site to a network</h2>
  <div class="who"><div><h3>Logistics service providers</h3><p>3PLs that run warehouses for their customers.</p></div><div><h3>In-house logistics</h3><p>Manufacturers, wholesalers and retailers with their own warehouse.</p></div><div><h3>Any size, any sector</h3><p>Whatever your volume, range or number of sites.</p></div></div>
  <div class="reach"><img src="${IMG.map}" alt="Map: Belgium connected to the Netherlands, Germany, Luxembourg and France"><p>Based in Belgium. Working wherever your warehouses are, with most projects in Belgium and its neighbours: the Netherlands, Luxembourg, France and Germany.</p></div>
</div></section>

<section class="sec" aria-labelledby="whys-h"><div class="wrap why">
  <div><span class="eyebrow">Why Ant8</span><h2 id="whys-h" class="h-2">Senior. Hands-on. Logistics only.</h2></div>
  <ul>${WHY.map(w=>`<li>${SPARK}<span><b>${w[0]}</b> ${w[1]}</span></li>`).join("")}</ul>
</div></section>

<section class="sec alt" aria-labelledby="faq-h"><div class="wrap">
  <h2 id="faq-h" class="h-2" style="max-width:820px;margin:0 auto 28px">Questions we hear most about Ant8</h2>
  ${faqList(FAQ,"faq")}
</div></section>
${ctaBand()}`};

PAGES.assessment = { title:"Free logistics assessment · Ant8", desc:"How mature is your warehouse? Rate 33 key practices across 11 areas, from inbound to sustainability, and get a free score per area straight away.", html:()=>`
<section class="phero"><div class="wrap grid">
  <div><span class="eyebrow">Free logistics assessment</span><h1 class="h-1" tabindex="-1">How does your warehouse score?</h1>
  <p class="lead">33 questions across 11 areas of your operation, three per area, each rated from 1 to 5 against concrete descriptions. About 11 minutes, a score per area straight away, whatever system you run.</p>
  <div class="ticks"><span>${SPARK} Your score straight away</span><span>${SPARK} No product advice</span><span>${SPARK} Independent of any WMS</span></div>
  <a class="btn btn-neon" href="#tool" data-scroll="tool" style="margin-top:30px">Start the assessment</a></div>
  <div class="media illus" style="aspect-ratio:4/3"><img src="${IMG.warehouse}" alt="Isometric illustration of a warehouse with live performance indicators"></div>
</div></section>
<section class="sec alt" id="tool" aria-labelledby="hw-h"><div class="wrap">
  <span class="eyebrow">How it works</span><h2 id="hw-h" class="h-2" style="max-width:16ch">Choose, rate, see your score</h2>
  <div class="as-grid">
    <div class="as-card" id="asq" aria-live="polite"></div>
    <div class="as-card dark pattern" id="asr" aria-live="polite"></div>
  </div>
  <div class="as-card" style="margin-top:20px" id="asform">
    <p class="as-step">4 · Talk it through</p>
    <h3 class="h-3" style="margin:8px 0 6px">Want to know what to fix first?</h3>
    <p class="muted" style="margin-bottom:20px">Get your detailed report and discuss it with one of our experts.</p>
    <form class="form" novalidate data-kind="report">
      <div class="row">${field("Name","name","text",true,"name")}${field("Company","company","text",true,"organization")}</div>
      <div class="row">${field("Job title","job","text",false,"organization-title")}${field("Email","email","email",true,"email")}</div>
      <div class="row">${field("Phone (optional)","phone","tel",false,"tel")}<div></div></div>
      <div class="hp" aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="field" data-f="consent"><label class="check"><input type="checkbox" name="consent"> <span>I agree that Ant8 contacts me about my results. See our <a href="#privacy">privacy notice</a>.</span></label><span class="err">Please tick this box so we can contact you.</span></div>
      <div><button class="btn btn-neon" type="submit">Get your detailed report</button></div>
      <p class="form-note">Your answers and scores are sent directly to our team. You can also write to ${CONFIG.email}.</p>
      <div class="form-status" role="status"></div>
    </form>
  </div>
</div></section>
<section class="sec-tight sec-light"><div class="wrap triad">
  <div><h3>For whom</h3><p>Warehouses and logistics teams that want to know where they stand before they invest.</p></div>
  <div><h3>What you get</h3><p>A score and maturity level per area straight away, and a report with a first step for your weakest areas.</p></div>
  <div><h3>What it costs</h3><p>Nothing. A 30-minute talk with an expert is optional.</p></div>
</div></section>`};

PAGES.about = { title:"About Ant8 · We’ve been in your shoes", desc:"Ant8 grew out of the warehouse floor. Senior, hands-on logistics experts, part of the Gembit group, independent in our advice.", html:()=>`
<section class="phero"><div class="wrap grid">
  <div><span class="eyebrow">About Ant8</span><h1 class="h-1" tabindex="-1">We’ve been in your shoes</h1>
  <div class="stack" style="--s:18px;margin-top:24px"><p class="lead" style="margin:0">Ant8 grew out of the warehouse floor. Our founder ran distribution centres, built new sites and led WMS projects, and learned one lesson the hard way: bring in someone who has done it before. Today that is the standard for every expert we put on a project.</p>
  <p class="muted">Warehouses are changing faster than ever: new WMS and TMS platforms, automation, AI. Yet people who have run these projects are hard to find. <b style="color:var(--ink)">That gap is why Ant8 exists.</b></p></div></div>
  <figure class="quote-card neon" style="margin:0;justify-content:flex-end"><blockquote style="font-size:clamp(1.4rem,2.3vw,1.9rem);font-weight:700;color:#013538;line-height:1.25">“Don’t buy the expensive car if you don’t know how to drive. A system is only as good as the people driving it.”</blockquote></figure>
</div></section>
<section class="sec alt" aria-labelledby="mis-h"><div class="wrap">
  <span class="eyebrow">Our mission</span><h2 id="mis-h" class="h-2" style="max-width:22ch">We make logistics technology work for the people who actually do the work.</h2>
  <div class="values">
    <div>${SPARK}<h3>Results, not reports</h3><p>We start from the problem and measure what changes.</p></div>
    <div>${SPARK}<h3>From the floor</h3><p>We have run warehouses ourselves, so we speak your team’s language.</p></div>
    <div>${SPARK}<h3>Independent</h3><p>No vendor ties. Your operation decides which system fits.</p></div>
    <div>${SPARK}<h3>IT and operations, one language</h3><p>We translate what the floor needs into what the system must do, and back again.</p></div>
  </div>
</div></section>
<section class="sec-tight sec-light"><div class="wrap"><div class="facts facts-2">${[["25","years of logistics experience"],["20","experts in the Gembit group"]].map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join("")}</div></div></section>
<section class="sec sec-light sec-white" aria-labelledby="exp-h"><div class="wrap person">
  ${photo("Kris on the warehouse floor", "scene-ant8")}
  <div><span class="eyebrow">Our experts</span><h2 id="exp-h" class="h-2">Senior. Hands-on. Logistics only.</h2>
  <p class="muted" style="margin-top:16px;padding-bottom:20px;border-bottom:1px solid var(--line)">Every Ant8 expert has worked on the floor before advising on it.</p>
  <h3 class="h-3" style="margin-top:20px">Kris Lalou</h3><p class="muted" style="font-size:.9375rem">Founder &amp; Managing Director</p>
  ${todo("Draft bio from the sales deck: Kris to approve",`<p style="margin-top:4px">Kris spent fifteen years on the operations side of the table. As site manager he led a distribution centre of more than 100 FTE, built a new DC from the ground up and implemented a new WMS and TMS. Asked what he would do differently next time, his answer was simple: hire someone with the experience he has now. That became the standard for every Ant8 expert.</p>`,"div","")}
  <div style="display:flex;gap:20px;align-items:center;margin-top:22px;flex-wrap:wrap"><a class="btn btn-teal btn-sm" href="#contact">Book a call</a>${extLink("krisLinkedin","LinkedIn","link")}</div></div>
</div></section>
<section class="sec-tight sec-light sec-white" style="padding-top:0"><div class="wrap duo">
  <div class="light"><span class="eyebrow">Part of Gembit</span><h2 class="h-3" style="font-size:1.6rem">Backed by a group, independent in our advice</h2><p class="muted" style="margin:12px 0 18px">Ant8 is part of Gembit. That gives us our own developers and decades of WMS experience under one roof, while our advice stays independent.</p>${CONFIG.links.gembit?`<a class="link" href="${esc(CONFIG.links.gembit)}" target="_blank" rel="noopener">Discover Gembit</a>`:`<span class="review-only">${todo("Gembit URL","<span class='muted'>Discover Gembit</span>","span")}</span>`}</div>
  <div class="band pattern" style="border-radius:var(--r-lg)"><span class="eyebrow">Careers</span><h2 class="h-3" style="font-size:1.6rem">Join our team of senior experts</h2><p style="color:#C9D6D5;margin:12px 0 22px">Have you run warehouses or WMS projects yourself? We’d like to meet you.</p><a class="btn btn-neon btn-sm" href="#careers">See our vacancies</a></div>
</div></section>
${ctaBand()}`};

PAGES.contact = { title:"Contact · Talk to a senior logistics expert · Ant8", desc:"No sales desk. Tell us what is going on in your warehouse and speak directly with a senior logistics expert.", html:()=>`
<section class="phero"><div class="wrap contact-grid">
  <div><span class="eyebrow">Contact</span><h1 class="h-1" tabindex="-1">Talk to someone who has done it before</h1>
  <p class="lead">No sales desk. You speak directly with a senior logistics expert.</p>
  <span class="eyebrow" style="margin-top:36px">What happens next</span>
  <ol class="next-steps" style="margin-top:0">
    <li><span class="n">1</span><span><b>We call you back.</b> A short conversation to understand your situation.</span></li>
    <li><span class="n">2</span><span><b>We propose a next step that fits.</b> A site visit, a short analysis, a quotation, or an AI scan of one document flow.</span></li>
    <li><span class="n">3</span><span><b>You decide.</b> No obligation, no follow-up you didn’t ask for.</span></li>
  </ol>
  <div style="border-top:1px solid var(--line);margin-top:28px;padding-top:20px;display:grid;gap:6px"><a class="link" href="mailto:${CONFIG.email}" style="justify-self:start">${CONFIG.email}</a><a href="tel:${CONFIG.phoneHref}" style="text-decoration:none">${CONFIG.phone}</a></div></div>
  <div class="panel"><h2 class="h-3" style="margin-bottom:18px">Tell us what is going on</h2>
    <form class="form" novalidate data-kind="contact">
      <div class="row">${field("Name","name","text",true,"name")}${field("Company","company","text",true,"organization")}</div>
      <div class="row">${field("Email","email","email",true,"email")}${field("Phone (optional)","phone","tel",false,"tel")}</div>
      <div class="field" data-f="topic"><label for="f-topic">Topic</label><select id="f-topic" name="topic">${["Project management","Interim management","Analysis","Network analysis","Expertise on demand","AI agents & custom apps","Inventory-as-a-Service","Intelligent inbound delivery","Something else"].map(t=>`<option value="${t}" ${t===pendingTopic?"selected":""}>${t}</option>`).join("")}</select></div>
      <div class="field" data-f="msg"><label for="f-msg">What is going on in your warehouse?</label><textarea id="f-msg" name="msg" required maxlength="1500"></textarea><span class="err">Tell us briefly what is going on.</span></div>
      <div class="hp" aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="field" data-f="consent"><label class="check"><input type="checkbox" name="consent"> <span>I agree that Ant8 processes my details to answer my question. See our <a href="#privacy">privacy notice</a>.</span></label><span class="err">Please tick this box so we can answer you.</span></div>
      <div><button class="btn btn-neon" type="submit">Book a call with an expert</button></div>
      <p class="form-note">Your message is sent directly to our team. You can also write to ${CONFIG.email}.</p>
      <div class="form-status" role="status"></div>
    </form></div>
</div></section>
<section class="sec-tight sec-light" aria-labelledby="bf-h"><div class="wrap">
  <h2 id="bf-h" class="h-3" style="max-width:820px;margin:0 auto 18px;font-size:1.75rem">Before you get in touch</h2>
  ${faqList([FAQ[5],FAQ[3],FAQ[4]])}
  <div style="max-width:820px;margin:20px auto 0"><a class="link" href="#faq">All questions</a></div>
</div></section>
<section class="sec-tight sec-light" style="padding-top:0"><div class="wrap"><div class="banner" style="background:var(--surface-2);border:0">
  <div><h3>Not ready to talk yet?</h3><p>Find out where your warehouse stands first, or follow along.</p></div>
  <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><a class="btn btn-teal btn-sm" href="#assessment">Assess your warehouse</a>${extLink("linkedin","Follow us on LinkedIn","link")}</div></div></div></section>`};

PAGES.insights = { title:"Insights · What we see on the floor · Ant8", desc:"Lessons from WMS projects, warehouse analyses and interim roles. Written by the people who did the work.", html:()=>`
<section class="phero"><div class="wrap">
  <span class="eyebrow">Insights</span><h1 class="h-1" tabindex="-1">What we see on the floor</h1>
  <p class="lead">Lessons from WMS projects, warehouse analyses and interim roles. Written by the people who did the work.</p>
  <div class="chips" role="group" aria-label="Filter insights">${["All","Articles","Cases","Videos"].map((f,i)=>`<button class="chip" type="button" data-filter="${f}" aria-pressed="${i===0}">${f}</button>`).join("")}</div>
</div></section>
<section class="sec-tight sec-light"><div class="wrap" id="insightlist">
  <a class="feature" href="#case-network-analysis" data-kind="Cases"><div class="l pattern"><b>−19%</b></div><div class="r"><span class="tag tag-outline">Case</span><h2>19% lower transport cost, within today’s capacity</h2><p style="color:#C9D6D5">A Belgian technical wholesaler with three warehouses: which warehouse should ship which order?</p><span class="by" style="display:flex;gap:10px;align-items:center;font-size:.8125rem;color:#C9D6D5"><span class="av" style="background:#34605F;color:#fff">KL</span>Kris Lalou · Network analysis</span></div></a>
  <div class="cards">
    <a class="card" href="#why-wms-go-lives-slip" data-kind="Articles"><div class="th"><img src="${IMG.warehouse}" alt=""></div><small>Article · Project management</small><h3>Why do most WMS go-lives slip?</h3><div class="by"><span class="av">KL</span>Kris Lalou · 5 min read</div></a>
    <div class="card" data-kind="Articles" aria-disabled="true"><div class="th"><img src="${IMG.dash}" alt=""><span class="soon">In preparation</span></div><small>Article · AI agents</small><h3>AI agents that read your delivery notes and check your invoices</h3><div class="by"><span class="av">KL</span>Kris Lalou</div></div>
    <div class="card" data-kind="Videos" aria-disabled="true"><div class="th dark pattern"><span class="play" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span><span class="soon">In preparation</span></div><small>Video · AI agents</small><h3>From order email to booked order, with your team in the loop</h3><div class="by"><span class="av">KL</span>Kris Lalou · Video</div></div>
  </div>
  <p class="muted" id="emptyfilter" style="display:none;margin-top:24px">Nothing in this category yet. <button class="as-idk" type="button" data-filter="All">Show all insights</button></p>
</div></section>
<section class="sec-tight sec-light" style="padding-top:0"><div class="wrap">${assessBanner()}</div></section>
${ctaBand()}`};

PAGES["why-wms-go-lives-slip"] = { title:"Why do most WMS go-lives slip? · Ant8 Insights", desc:"More than half of WMS go-lives run into delays. A common cause: nobody on the team has run a project like this before.", html:()=>`
<article class="sec-tight sec-light"><div class="wrap"><div class="article">
  <p class="crumbs"><a href="#insights">Insights</a> / <a href="#services">Project management</a></p>
  <span class="tag" style="margin-top:20px">Article</span>
  <h1 class="h-1" tabindex="-1" style="font-size:clamp(2.2rem,4.5vw,3.5rem);margin-top:16px">Why do most WMS go-lives slip?</h1>
  <div class="byline"><span class="who2"><span class="av" style="width:44px;height:44px">KL</span><span><b>Kris Lalou</b>Founder &amp; Managing Director, Ant8</span></span><span>5 min read</span></div>
  <div class="review-only" style="margin-top:20px">${todo("Draft article built from the sales deck: Kris to review, complete and date","<p class='muted' style='font-size:.875rem'>Add publish date, a main image and an optional click-to-load video.</p>")}</div>
  <div class="inshort"><span class="eyebrow" style="margin:0">In short</span><p>More than half of WMS go-lives run into delays. A common cause: nobody on the team has run a project like this before. The integrator builds the system; someone still has to make it fit the operation.</p></div>
  <div class="prose">
    <h2>What do the numbers say?</h2>
    <p>56% of WMS go-lives run into delays, and 30% of WMS projects fail (FulfillmentIQ, 2024). Those are not software problems first. They are project problems.</p>
    <h2>Why does nobody own the project?</h2>
    <p>IT says it is an operations problem. Operations says it is an IT problem. The vendor keeps sending invoices.</p>
    <p>The integrator builds what is specified. If nobody translates what the floor needs into what the system must do, the gaps only show up during testing, or worse, after go-live.</p>
    <blockquote>“A system is only as good as the people driving it.”</blockquote>
    <h2>Why can’t the warehouse lead just run it?</h2>
    <p>They know the operation inside out. But running it takes every hour they have. Too deep in the daily work to step back and see the big picture, or what a modern WMS could bring.</p>
    <h2>What helps?</h2>
    <p>Someone who has run these projects from all sides: as the operator, the project lead and the implementer. Someone who speaks both languages, catches miscommunication early and keeps IT, operations and the vendor working towards one go-live.</p>
  </div>
  <div class="author"><span class="av">KL</span><div><span class="eyebrow" style="margin-bottom:6px">Written by</span><h2 class="h-3">Kris Lalou</h2><p class="muted" style="font-size:.9375rem;margin:4px 0 14px">Fifteen years in warehouse operations before advising on them.</p><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><a class="btn btn-neon btn-sm" href="#contact" data-topic="Project management">Ask Kris about this</a>${extLink("krisLinkedin","LinkedIn","link")}</div></div></div>
  <div class="related"><a href="#services" data-goto="project-management"><small>Related service</small>Project management →</a><a href="#assessment"><small>Free assessment</small>Assess your warehouse →</a></div>
</div></div></article>`};

PAGES["case-network-analysis"] = { title:"Case: 19% lower transport cost, within today’s capacity · Ant8", desc:"A Belgian technical wholesaler with three warehouses: which warehouse should ship which order? Network analysis on 50,000+ shipments.", html:()=>`
<section class="phero" style="padding-bottom:40px"><div class="wrap">
  <p class="crumbs"><a href="#insights">Insights</a> / Case</p>
  <span class="tag" style="margin-top:20px">Case · Network analysis</span>
  <h1 class="h-1" tabindex="-1" style="margin-top:16px;max-width:18ch">19% lower transport cost, within today’s capacity</h1>
  <p class="lead">A Belgian technical wholesaler with three warehouses. The question: which warehouse should ship which order?</p>
</div></section>
<section class="band pattern sec-tight"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px">
  <div class="stat"><b style="color:var(--neon)">−19%</b><span>transport cost in the recommended scenario</span></div>
  <div class="stat"><b>~85%</b><span>of the theoretical maximum saving (−23%) captured</span></div>
  <div class="stat"><b>58%</b><span>of baseline cost sat in one warehouse’s flows</span></div>
</div></section>
<section class="sec sec-light"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,6vw,88px)">
  <div><h2 class="h-2" style="font-size:clamp(1.75rem,2.6vw,2.25rem)">The challenge</h2>
    <p class="muted" style="margin-top:14px">With several warehouses, habit decided where an order shipped from, not cost. Every warehouse had to keep roughly today’s workload: the cheapest scenario on paper is worthless if it overloads one site.</p>
    <h2 class="h-2" style="font-size:clamp(1.75rem,2.6vw,2.25rem);margin-top:40px">The approach</h2>
    <ol class="case-steps">
      <li><span><b>Data baseline.</b> Orders, shipments, pallets and revenue per region, straight from ERP, WMS and TMS.</span></li>
      <li><span><b>Scenario model.</b> From today’s allocation to the unconstrained cost optimum, and the realistic options in between.</span></li>
      <li><span><b>Cost vs. capacity.</b> Transport cost, workload per warehouse and operational simplicity, side by side.</span></li>
      <li><span><b>Decision.</b> One recommended scenario the operation can actually run, with the saving quantified.</span></li>
    </ol>
    <p class="muted" style="margin-top:18px;font-size:.9375rem">Delivered as expertise on demand: we built the model with the client’s team and handed it over.</p></div>
  <div><h2 class="h-2" style="font-size:clamp(1.75rem,2.6vw,2.25rem)">The result</h2>
    <div class="chart" role="img" aria-label="Transport cost index: today 100, recommended scenario 81, theoretical optimum 77">
      <p class="muted" style="font-size:.875rem">Transport cost per scenario (index, today = 100)</p>
      <div class="row2"><span>Today</span><span class="trk"><i style="width:100%"></i></span><b>100</b></div>
      <div class="row2 rec"><span><b style="text-align:left">Recommended</b></span><span class="trk"><i style="width:81%"></i></span><b>81</b></div>
      <div class="row2"><span>Theoretical optimum</span><span class="trk"><i style="width:77%"></i></span><b>77</b></div>
    </div>
    <blockquote style="margin:36px 0 0;border-left:3px solid var(--neon);padding-left:20px;font-size:1.25rem;font-weight:700;line-height:1.35">“The cheapest scenario on paper overloads one warehouse. We advised the one the operation can actually run.”</blockquote>
    <p class="muted" style="margin-top:28px;font-size:.9375rem">Based on 4 months of data: 50,000+ shipments, 75,000 pallets, 16 regions, 5 scenarios. One province was kept split across two warehouses.</p></div>
</div></section>
<section class="sec-tight sec-light" style="padding-top:0"><div class="wrap"><div class="banner"><div><h3>Several warehouses, one question?</h3><p>We model your real shipments and show which site should serve each region.</p></div><a class="btn btn-neon" href="#contact" data-topic="Network analysis">Talk to an expert about your network</a></div></div></section>
${ctaBand()}`};

PAGES.careers = { title:"Careers · Ant8", desc:"Have you run warehouses or WMS projects yourself? Join Ant8’s team of senior logistics experts.", html:()=>`
<section class="phero"><div class="wrap grid">
  <div><span class="eyebrow">Careers at Ant8</span><h1 class="h-1" tabindex="-1">Join our team of senior experts</h1>
  <p class="lead">Have you run warehouses or WMS projects yourself? We’d like to meet you. At Ant8 you work on the floor and at the table, between IT, operations and the vendor.</p>
  <div style="margin-top:28px;display:flex;gap:16px;flex-wrap:wrap"><a class="btn btn-neon" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("Careers at Ant8")}">Send us your story</a></div></div>
  <div class="media illus" style="aspect-ratio:4/3"><img src="${IMG.twin}" alt="Illustration: a warehouse and its digital twin"></div>
</div></section>
<section class="sec-tight alt"><div class="wrap">${todo("Needs ANT8 input: open vacancies",`<h2 class="h-3">Open positions</h2><p class="muted" style="margin-top:8px">No vacancies are listed yet. Add roles here, or keep this open application.</p>`)}</div></section>
${ctaBand()}`};

PAGES.privacy = { title:"Privacy notice · Ant8", desc:"How Ant8 handles personal data sent through this website.", html:()=>legal("Privacy notice",`
  <p>Ant8 (${CONFIG.address}, ${CONFIG.vat}) is responsible for the personal data you send us through this website.</p>
  <h2>What we collect</h2><p>Only what you enter in the contact or assessment form: name, company, job title, email, phone (optional), your message and, for the assessment, your answers and scores.</p>
  <h2>Why</h2><p>To answer your question or send and discuss your assessment report. The legal basis is your consent, which you can withdraw at any time.</p>
  <h2>How long</h2><p>We keep your details only as long as needed to follow up on your request.</p>
  <h2>Your rights</h2><p>You can ask to see, correct or delete your data, or object to its use, by emailing <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>. You can also lodge a complaint with the Belgian Data Protection Authority.</p>`)};
PAGES.cookies = { title:"Cookies · Ant8", desc:"This website does not use tracking cookies.", html:()=>legal("Cookies",`
  <p>This website does not set cookies and does not use analytics or advertising trackers.</p>
  <p>If we add analytics later, we will ask for your consent first and update this page.</p>`)};
function legal(t,body){return `<section class="sec-tight sec-light"><div class="wrap"><div class="article"><span class="eyebrow">Legal</span><h1 class="h-1" tabindex="-1" style="font-size:clamp(2.2rem,4.5vw,3.5rem)">${t}</h1>
  <div class="review-only" style="margin-top:20px">${todo("Template: legal review required (GDPR) before launch","<p class='muted' style='font-size:.875rem'>Check with your legal adviser and the final form provider.</p>")}</div>
  <div class="prose">${body}</div></div></div></section>`}
PAGES["404"] = { title:"Page not found · Ant8", desc:"", html:()=>`<section class="sec"><div class="wrap"><h1 class="h-1" tabindex="-1">This page doesn’t exist.</h1><p class="lead">The link may be outdated. Go to the <a class="link" href="#home">homepage</a> or <a class="link" href="#contact">talk to an expert</a>.</p></div></section>`};

function field(label,name,type,req,ac){
  return `<div class="field" data-f="${name}"><label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" ${req?"required":""} autocomplete="${ac}" maxlength="120"><span class="err">${type==="email"?"Enter a valid email address.":"Please fill in your "+label.toLowerCase()+"."}</span></div>`;
}


export { megaHtml, CONFIG, IMG, SPARK, SERVICES, FAQ, WHY, STEPS, TWIN, ASSESS, LEVELS, DOMAIN_W, DOMAIN_SVC, NAV, ROUTE_NAV, PAGES, esc, extLink };
