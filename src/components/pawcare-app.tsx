import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlus,
  Clock3,
  Heart,
  HeartPulse,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  PawPrint,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
  UserRound,
  Users,
  Weight,
  X,
} from "lucide-react";

import brunoJungle from "@/assets/bruno-jungle.jpg";
import communityPets from "@/assets/pets-community.jpg";
import shopStill from "@/assets/pet-care-shop.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Tab = "home" | "health" | "ai" | "social" | "shop";

const navItems: Array<{ id: Tab; label: string; icon: typeof Home }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "ai", label: "AI Center", icon: Sparkles },
  { id: "social", label: "Community", icon: Users },
  { id: "shop", label: "Shop", icon: ShoppingBag },
];

const reminders = [
  { id: 1, title: "Morning breakfast & kibble", note: "1.5 cups dry kibble + fresh warm water", time: "8:30 AM", type: "Meal", done: true },
  { id: 2, title: "Probiotic supplement", note: "1 chewable tablet after breakfast", time: "10:00 AM", type: "Medicine", done: false },
  { id: 3, title: "Evening coat brushing", note: "Undercoat comb session", time: "6:00 PM", type: "Grooming", done: false },
];

const records = [
  { title: "Deworming & tick pill", type: "Prescription", date: "24 Aug", vet: "Dr. Ramesh Kumar", icon: ShieldCheck },
  { title: "DHPP booster vaccine", type: "Vaccination", date: "10 Jun", vet: "Dr. Ramesh Kumar", icon: Syringe },
  { title: "Routine dental inspection", type: "Check-up", date: "18 May", vet: "Apollo Pet Clinic", icon: Stethoscope },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-jungle">
        <PawPrint className="size-5" />
      </div>
      <div>
        <div className="font-display text-xl font-bold leading-none">PAWCARE</div>
        <div className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">Grow happy. Live healthy.</div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase text-primary">{eyebrow}</p>
        <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function PetSwitcher() {
  const [pet, setPet] = useState<"Bruno" | "Luna">("Bruno");
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card p-1 shadow-soft">
      <button aria-label="Select Bruno" onClick={() => setPet("Bruno")} className={cn("flex items-center gap-2 rounded-full px-2 py-1.5 text-xs font-semibold transition-colors", pet === "Bruno" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground")}>
        <img src={brunoJungle} alt="Bruno" className="size-7 rounded-full object-cover" width={1024} height={1024} />
        <span className="hidden sm:inline">Bruno</span>
      </button>
      <button aria-label="Select Luna" onClick={() => setPet("Luna")} className={cn("grid size-7 place-items-center rounded-full text-xs font-bold transition-colors", pet === "Luna" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>
        L
      </button>
      <ChevronDown className="mr-1 size-3.5 text-muted-foreground" />
    </div>
  );
}

function Shell({ tab, setTab, children }: { tab: Tab; setTab: (tab: Tab) => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="jungle-canopy" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return <Button key={item.id} variant="ghost" onClick={() => setTab(item.id)} className={cn("rounded-full px-4 text-muted-foreground", tab === item.id && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}><Icon />{item.label}</Button>;
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-card" aria-label="Notifications"><Bell /></Button>
            <PetSwitcher />
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-[1440px] px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-50 flex h-16 items-center justify-around rounded-2xl border border-canopy/15 bg-canopy px-2 text-primary-foreground shadow-jungle lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => setTab(item.id)} className={cn("flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold text-primary-foreground/60 transition-all", tab === item.id && "bg-primary text-primary-foreground")}><Icon className="size-4" />{item.label === "Community" ? "Social" : item.label}</button>;
        })}
      </nav>
    </div>
  );
}

function HomeView({ setTab }: { setTab: (tab: Tab) => void }) {
  const [tasks, setTasks] = useState(reminders);
  const [reminderOpen, setReminderOpen] = useState(false);
  const completed = tasks.filter((task) => task.done).length;
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="hero-jungle relative min-h-[410px] overflow-hidden rounded-3xl bg-canopy text-primary-foreground shadow-jungle sm:min-h-[430px]">
        <img src={brunoJungle} alt="Bruno the golden retriever in tropical foliage" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover object-[center_38%] sm:object-[68%_45%]" />
        <div className="absolute inset-0 bg-hero-shade" />
        <div className="leaf leaf-one" aria-hidden="true" /><div className="leaf leaf-two" aria-hidden="true" />
        <div className="relative flex min-h-[410px] max-w-2xl flex-col justify-end p-6 sm:min-h-[430px] sm:p-10">
          <div className="mb-auto flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md"><Leaf className="size-3.5" /> Tuesday · Care trail on track</div>
          <p className="mb-2 text-xs font-bold uppercase text-primary-glow">Good morning, Varshini</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">Bruno is ready<br />for a wild day.</h1>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/75 sm:text-base">One supplement, a sunset brush, and plenty of tail-wagging adventure ahead.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setReminderOpen(true)} className="h-11 rounded-full bg-primary px-5"><CirclePlus /> Add reminder</Button>
            <Button onClick={() => setTab("health")} variant="outline" className="h-11 rounded-full border-primary-foreground/30 bg-background/10 px-5 text-primary-foreground hover:bg-background/20 hover:text-primary-foreground"><HeartPulse /> View health</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_.9fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <SectionHeading eyebrow="Today's care trail" title={`${completed} of ${tasks.length} tasks complete`} action={<span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">On track</span>} />
          <div className="space-y-2">
            {tasks.map((task) => (
              <button key={task.id} onClick={() => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, done: !entry.done } : entry))} className={cn("group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5", task.done ? "border-secondary/30 bg-secondary/30" : "border-border bg-background hover:border-primary/30")}>
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-full border transition-colors", task.done ? "border-secondary bg-secondary text-secondary-foreground" : "border-primary/30 text-primary")}>
                  {task.done ? <Check className="size-4" /> : <Clock3 className="size-4" />}
                </span>
                <span className="min-w-0 flex-1"><span className={cn("block text-sm font-semibold", task.done && "text-muted-foreground line-through")}>{task.title}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{task.note}</span></span>
                <span className="text-right"><span className="block text-xs font-bold">{task.time}</span><span className="text-[10px] text-muted-foreground">{task.type}</span></span>
              </button>
            ))}
          </div>
          <Progress value={(completed / tasks.length) * 100} className="mt-4 bg-secondary/30" />
        </div>

        <div className="rounded-2xl bg-accent p-5 text-accent-foreground shadow-soft sm:p-6">
          <div className="flex items-center justify-between"><div className="grid size-11 place-items-center rounded-xl bg-background/70 text-accent-foreground"><Bot /></div><span className="flex items-center gap-1 text-[10px] font-bold uppercase"><span className="size-2 animate-pulse rounded-full bg-primary" /> PawCare AI</span></div>
          <h2 className="mt-6 font-display text-2xl font-semibold">A little gut support goes a long way.</h2>
          <p className="mt-2 text-sm leading-relaxed text-accent-foreground/70">Bruno's sensitive stomach history makes today's probiotic especially helpful. Give it after food and keep fresh water nearby.</p>
          <Button onClick={() => setTab("ai")} className="mt-5 rounded-full bg-canopy text-primary-foreground hover:bg-canopy/90"><Sparkles /> Ask PawCare AI</Button>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="At a glance" title="Bruno's health snapshot" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[{ icon: Weight, label: "Weight", value: "28.5 kg", note: "Healthy range" }, { icon: Thermometer, label: "Temperature", value: "38.4°C", note: "Normal" }, { icon: Activity, label: "Activity", value: "6,420", note: "steps today" }, { icon: CalendarDays, label: "Next visit", value: "3 days", note: "Rabies booster" }].map((stat) => <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform hover:-translate-y-1 sm:p-5"><stat.icon className="size-5 text-primary" /><p className="mt-4 text-xs font-semibold text-muted-foreground">{stat.label}</p><p className="mt-1 font-display text-xl font-semibold sm:text-2xl">{stat.value}</p><p className="mt-1 text-[11px] text-secondary-foreground">{stat.note}</p></div>)}
        </div>
      </section>

      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent className="max-w-md rounded-2xl border-border bg-card">
          <DialogHeader><DialogTitle className="font-display text-2xl">Add to Bruno's trail</DialogTitle><DialogDescription>Create a quick care reminder for today.</DialogDescription></DialogHeader>
          <div className="space-y-3"><input aria-label="Reminder title" placeholder="What does Bruno need?" className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring" /><div className="grid grid-cols-2 gap-3"><input aria-label="Reminder time" type="time" className="h-11 rounded-xl border border-input bg-background px-4 text-sm" /><select aria-label="Reminder type" className="h-11 rounded-xl border border-input bg-background px-3 text-sm"><option>Medication</option><option>Feeding</option><option>Grooming</option><option>Appointment</option></select></div><Button className="h-11 w-full rounded-xl" onClick={() => setReminderOpen(false)}>Save reminder</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HealthView() {
  return <div className="space-y-6 animate-fade-in"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase text-primary">Clinical canopy</p><h1 className="mt-1 font-display text-4xl font-semibold">Bruno's health</h1><p className="mt-2 text-sm text-muted-foreground">A complete, calm view of care records and vital trends.</p></div><Button className="rounded-full"><CirclePlus /> Add clinical log</Button></div><section className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><div className="overflow-hidden rounded-2xl bg-canopy text-primary-foreground shadow-jungle"><div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr]"><img src={brunoJungle} alt="Bruno's health profile" width={1024} height={1024} className="size-28 rounded-2xl object-cover" /><div><div className="flex items-start justify-between"><div><p className="text-xs text-primary-foreground/60">Golden Retriever · 2.5 years</p><h2 className="mt-1 font-display text-3xl font-semibold">Bruno</h2></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">Healthy</span></div><div className="mt-5 grid grid-cols-3 gap-2"><div><p className="text-[10px] text-primary-foreground/50">WEIGHT</p><p className="mt-1 font-semibold">28.5 kg</p></div><div><p className="text-[10px] text-primary-foreground/50">TEMP</p><p className="mt-1 font-semibold">38.4°C</p></div><div><p className="text-[10px] text-primary-foreground/50">BLOOD</p><p className="mt-1 font-semibold">DEA 1.1+</p></div></div></div></div></div><div className="grid grid-cols-2 gap-4"><div className="rounded-2xl border border-border bg-card p-5 shadow-soft"><Heart className="text-destructive" /><p className="mt-4 text-xs text-muted-foreground">Resting heart rate</p><p className="font-display text-3xl font-semibold">84 <span className="text-sm">bpm</span></p></div><div className="rounded-2xl border border-border bg-card p-5 shadow-soft"><Activity className="text-secondary-foreground" /><p className="mt-4 text-xs text-muted-foreground">Weekly activity</p><p className="font-display text-3xl font-semibold">74%</p><Progress value={74} className="mt-3" /></div></div></section><section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6"><SectionHeading eyebrow="Care history" title="Recent clinical records" action={<Button variant="ghost" size="icon"><MoreHorizontal /></Button>} /><div className="divide-y divide-border">{records.map((record) => <div key={record.title} className="flex items-center gap-4 py-4"><span className="grid size-11 place-items-center rounded-xl bg-muted text-primary"><record.icon className="size-5" /></span><span className="min-w-0 flex-1"><strong className="block text-sm">{record.title}</strong><span className="text-xs text-muted-foreground">{record.type} · {record.vet}</span></span><span className="text-xs font-semibold text-muted-foreground">{record.date}</span></div>)}</div></section></div>;
}

function AiView() {
  const [messages, setMessages] = useState(["Hi Varshini — I'm ready to help with Bruno's care. What are you noticing today?"]);
  const [input, setInput] = useState("");
  const send = () => { if (!input.trim()) return; setMessages((current) => [...current, input, "Based on Bruno's profile, monitor his appetite and hydration today. If symptoms persist or worsen, contact Dr. Ramesh Kumar."]); setInput(""); };
  return <div className="grid min-h-[680px] gap-5 lg:grid-cols-[.72fr_1.28fr] animate-fade-in"><aside className="rounded-2xl bg-canopy p-6 text-primary-foreground shadow-jungle"><div className="grid size-14 place-items-center rounded-2xl bg-primary"><Bot /></div><p className="mt-6 text-xs font-bold uppercase text-primary-glow">PawCare AI Center</p><h1 className="mt-2 font-display text-4xl font-semibold">Your pocket care guide.</h1><p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">Personalized guidance grounded in Bruno's age, breed, activity, and care history.</p><div className="mt-8 space-y-3">{["Symptom triage", "Nutrition planner", "Care recommendations"].map((item, index) => <button key={item} className={cn("flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold", index === 0 ? "bg-primary" : "bg-background/10")}><Sparkles className="size-4" />{item}</button>)}</div><div className="mt-8 rounded-xl bg-background/10 p-4"><p className="text-xs font-semibold">Safety note</p><p className="mt-1 text-[11px] leading-relaxed text-primary-foreground/55">AI guidance does not replace a veterinarian, especially for emergencies.</p></div></aside><section className="flex min-h-[600px] flex-col rounded-2xl border border-border bg-card shadow-soft"><div className="flex items-center gap-3 border-b border-border p-5"><div className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><Leaf /></div><div><h2 className="font-display text-lg font-semibold">Ask PawCare</h2><p className="flex items-center gap-1 text-[10px] text-secondary-foreground"><span className="size-1.5 rounded-full bg-secondary" /> Online · knows Bruno's profile</p></div></div><div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message, index) => <div key={`${message}-${index}`} className={cn("max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed", index % 3 === 1 ? "ml-auto rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted text-foreground")}>{message}</div>)}</div><div className="border-t border-border p-4"><div className="flex items-center gap-2 rounded-xl border border-input bg-background p-2"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about symptoms, meals, or care..." className="h-9 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" /><Button size="icon" className="rounded-lg" onClick={send} aria-label="Send message"><Send /></Button></div></div></section></div>;
}

function SocialView() {
  const [liked, setLiked] = useState(false);
  return <div className="space-y-6 animate-fade-in"><div><p className="text-xs font-bold uppercase text-primary">The pack</p><h1 className="mt-1 font-display text-4xl font-semibold">Community clearing</h1><p className="mt-2 text-sm text-muted-foreground">Stories, advice, and new beginnings from pet families nearby.</p></div><section className="relative min-h-[360px] overflow-hidden rounded-3xl"><img src={communityPets} alt="Dogs and cat exploring a tropical garden" loading="lazy" width={1280} height={900} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-community-shade" /><div className="relative flex min-h-[360px] max-w-xl flex-col justify-end p-7 text-primary-foreground"><span className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold">Featured trail story</span><h2 className="font-display text-4xl font-semibold">Every walk tells a story.</h2><p className="mt-2 text-sm text-primary-foreground/75">Bruno and Luna found their favorite sunlit path — shared by Varshini, 3 hours ago.</p></div></section><div className="grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-5 shadow-soft"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">V</div><div><p className="text-sm font-semibold">Varshini</p><p className="text-xs text-muted-foreground">Bangalore · 3h</p></div></div><p className="mt-4 text-sm leading-relaxed">Bruno enjoys his morning walk in the park! The shaded route made today's longer walk a breeze.</p><div className="mt-4 flex items-center gap-2"><Button variant="ghost" onClick={() => setLiked(!liked)} className={cn("rounded-full", liked && "text-destructive")}><Heart className={cn(liked && "fill-current")} /> {liked ? 13 : 12}</Button><Button variant="ghost" className="rounded-full"><MessageCircle /> 2</Button></div></article><article className="rounded-2xl border border-border bg-card p-5 shadow-soft"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground font-semibold">R</div><div><p className="text-sm font-semibold">Dr. Ramesh Kumar</p><p className="text-xs text-muted-foreground">Vet tip · Yesterday</p></div></div><p className="mt-4 text-sm leading-relaxed">Double brush your pet's undercoat during shedding season. Short, calm sessions make it easier for everyone.</p><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="size-4" /> Verified veterinarian</div></article></div><section><SectionHeading eyebrow="Looking for a home" title="Meet Milo" /><div className="flex flex-col gap-5 rounded-2xl bg-accent p-6 text-accent-foreground sm:flex-row sm:items-center"><div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-background/60"><PawPrint className="size-8" /></div><div className="flex-1"><h3 className="font-display text-2xl font-semibold">Milo · Beagle puppy</h3><p className="mt-1 text-sm text-accent-foreground/70">4 months · Friendly, vaccinated, and loves kids and treats.</p><p className="mt-2 flex items-center gap-1 text-xs font-semibold"><MapPin className="size-3.5" /> Koramangala Shelter, Bangalore</p></div><Button className="rounded-full bg-canopy text-primary-foreground hover:bg-canopy/90">Meet Milo</Button></div></section></div>;
}

function ShopView() {
  const products = useMemo(() => [{ name: "Golden Retriever Dry Food", category: "Nutrition", price: "₹2,499", rating: "4.8" }, { name: "GPS Smart Tracker Collar", category: "Accessories", price: "₹3,999", rating: "4.6" }, { name: "Premium Slicker Brush", category: "Grooming", price: "₹649", rating: "4.5" }, { name: "Herbal Oatmeal Shampoo", category: "Grooming", price: "₹499", rating: "4.6" }], []);
  const [cart, setCart] = useState(0);
  return <div className="space-y-7 animate-fade-in"><section className="grid overflow-hidden rounded-3xl bg-canopy text-primary-foreground shadow-jungle lg:grid-cols-2"><div className="flex flex-col justify-center p-7 sm:p-10"><p className="text-xs font-bold uppercase text-primary-glow">Curated for Bruno</p><h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Care from the wild, chosen with science.</h1><p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/65">Nutrition, grooming, and wellness picks matched to Bruno's breed and sensitive stomach.</p><div className="mt-6 flex gap-3"><Button className="rounded-full"><ShoppingBag /> Browse picks</Button><span className="flex items-center rounded-full bg-background/10 px-4 text-xs font-semibold">{cart} in cart</span></div></div><img src={shopStill} alt="Natural pet care products arranged on leaves" loading="lazy" width={1280} height={900} className="h-72 w-full object-cover lg:h-full" /></section><div className="flex items-center gap-3"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input placeholder="Search food, grooming, medicine..." className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" /></div><Button variant="outline" size="icon" className="size-12 rounded-full"><ShoppingBag /></Button></div><section><SectionHeading eyebrow="Jungle-tested favorites" title="Recommended for Bruno" /><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{products.map((product, index) => <article key={product.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1"><div className={cn("relative aspect-square", index % 2 ? "bg-accent" : "bg-muted")}><img src={shopStill} alt={product.name} loading="lazy" width={1280} height={900} className={cn("h-full w-full object-cover", index === 1 && "object-right", index === 2 && "object-center")} /><span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-bold backdrop-blur">{product.category}</span></div><div className="p-4"><p className="min-h-10 text-sm font-semibold leading-snug">{product.name}</p><p className="mt-2 text-xs text-muted-foreground">★ {product.rating}</p><div className="mt-3 flex items-center justify-between gap-2"><strong className="font-display text-lg">{product.price}</strong><Button size="icon" className="rounded-full" aria-label={`Add ${product.name} to cart`} onClick={() => setCart((count) => count + 1)}><CirclePlus /></Button></div></div></article>)}</div></section></div>;
}

export function PawcareApp() {
  const [tab, setTab] = useState<Tab>("home");
  return <Shell tab={tab} setTab={setTab}>{tab === "home" && <HomeView setTab={setTab} />}{tab === "health" && <HealthView />}{tab === "ai" && <AiView />}{tab === "social" && <SocialView />}{tab === "shop" && <ShopView />}</Shell>;
}