import {useEffect,useState} from 'react';
import {Routes,Route,useLocation,Link} from 'react-router-dom';
import {X,Sparkles} from 'lucide-react';
import {SiteNavbar,Footer,SparkleEgg} from './components/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import DesignPage from './pages/DesignPage';
import CertificationsPage from './pages/CertificationsPage';
import VolunteeringPage from './pages/VolunteeringPage';
import BlogPage,{ArticlePage} from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import {AdminLogin,AdminApp} from './admin/AdminApp';
export default function App(){
 const {pathname}=useLocation();const [sound,setSound]=useState(false);const [surprise,setSurprise]=useState(false);
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});document.title=(pathname==='/'?'Home':pathname.split('/')[1].replace(/^./,x=>x.toUpperCase()))+' • Dulmali Nipunika'},[pathname]);
 const isAdmin=pathname.startsWith('/admin');
 const tone=()=>{if(!sound)return;try{const Context=window.AudioContext||window.webkitAudioContext;const ctx=new Context();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type='sine';osc.frequency.setValueAtTime(640,ctx.currentTime);osc.frequency.exponentialRampToValueAtTime(820,ctx.currentTime+.12);gain.gain.setValueAtTime(.018,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.19);osc.start();osc.stop(ctx.currentTime+.19);osc.onended=()=>ctx.close()}catch{}};
 if(isAdmin)return <Routes><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin/*" element={<AdminApp/>}/></Routes>;
 return <div onClick={e=>{if(e.target.closest('a,button,[role="button"]'))tone()}}><SiteNavbar sound={sound} onToggle={()=>setSound(x=>!x)}/><main id="main-content"><Routes><Route path="/" element={<HomePage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/projects" element={<ProjectsPage/>}/><Route path="/design" element={<DesignPage/>}/><Route path="/certifications" element={<CertificationsPage/>}/><Route path="/volunteering" element={<VolunteeringPage/>}/><Route path="/blog" element={<BlogPage/>}/><Route path="/blog/:slug" element={<ArticlePage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<div className="container notfound"><span>404 ✳</span><h1>A little lost in the universe?</h1><Link to="/" className="pill-btn pill-primary">Back home</Link></div>}/></Routes></main><Footer/><SparkleEgg onFound={()=>setSurprise(true)}/>{surprise&&<div className="surprise-overlay" role="presentation" onClick={()=>setSurprise(false)}><div className="surprise-card" role="dialog" aria-modal="true" aria-label="Surprise" onClick={e=>e.stopPropagation()}><button type="button" className="surprise-close" aria-label="Close" onClick={()=>setSurprise(false)}><X size={18}/></button><span className="surprise-big">✿</span><h2>You found a little secret!</h2><p>Thank you for exploring my creative corner of the internet. Keep learning, creating, and dreaming.</p><span className="handwriting">— Dulmali ♡</span></div></div>}</div>;
}
