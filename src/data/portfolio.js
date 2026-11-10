/**
 * Edit all personal details here. Never publish sample work as real work.
 * Social URLs are blank until supplied; the UI keeps those icons visible but inactive.
 */
export const profile = {
  name: 'Dulmali Nipunika',
  firstName: 'Dulmali',
  role: 'Software Developer & Creative Technologist',
  secondRole: 'Growing Visual Designer',
  eyebrow: 'HELLO THERE',
  statement: 'I build thoughtful digital experiences with code, curiosity, and a little creativity.',
  intro: 'A Computing & Information Systems undergraduate who enjoys turning meaningful ideas into elegant, user-friendly digital experiences.',
  about: 'I am an undergraduate at Sabaragamuwa University of Sri Lanka. I love creating functional web experiences, improving my design skills, and exploring how technology can solve meaningful problems. My work sits at the intersection of engineering, visual storytelling, and continuous learning.',
  location: 'Sri Lanka',
  university: 'Sabaragamuwa University of Sri Lanka',
  degree: 'BSc in Computing & Information Systems',
  github: 'https://github.com/AVPDD6240N',
  linkedin: 'https://www.linkedin.com/in/dulmali-nipunika-bab46b316',
  instagram: '', facebook: '', youtube: '',
  email: '', // supply your professional email here
  resume: '/assets/PORTFOLIO-SUMMARY-DRAFT.pdf', // Temporary draft profile PDF. Replace with your official CV before publishing
  portrait: '/assets/portrait-cutout.png',
};

export const projects = [
  {
    id: 'aluminiwave', title: 'AluminiWave', type:'Web platform', year:'University project', color:'lilac', monogram:'AW',
    desc:'An alumni–student engagement platform that brings mentorship, events, and meaningful community connections together.',
    contribution:'Focused on the mentorship page and frontend experience within a team project.',
    stack:['React','Tailwind CSS','Supabase'],
    link:'', // add the exact public repository or demo URL
  },
  {
    id:'news',title:'News Web App',type:'Frontend / API',year:'Personal project',color:'apricot',monogram:'NW',
    desc:'A responsive React experience for exploring and reading news, with a focus on layout and content discovery.',
    contribution:'Frontend development and API-based content presentation.',
    stack:['React','JavaScript','Bootstrap'],link:'https://github.com/AVPDD6240N/News-Web-App',
  },
  {
    id:'tictactoe',title:'Tic Tac Toe',type:'Interactive web app',year:'Personal project',color:'mint',monogram:'XO',
    desc:'A playful React game demonstrating component-driven design, reusable UI, and interactive state management.',
    contribution:'Game interface and interactive logic.',stack:['React','Tailwind CSS','JavaScript'],link:'https://github.com/AVPDD6240N/TIC-TAC-TOE',
  },
  {
    id:'covid',title:'COVID-19 Dashboard',type:'Data interface',year:'Personal project',color:'blue',monogram:'19',
    desc:'A clear, responsive information experience for presenting public-health statistics.',
    contribution:'Responsive information layout and presentation.',stack:['HTML','CSS','JavaScript'],link:'https://github.com/AVPDD6240N/Covid-19',
  },
];

export const skills = [
  {name:'React',symbol:'⚛',type:'Development',note:'Reusable interfaces'},
  {name:'JavaScript',symbol:'JS',type:'Development',note:'Interactive experiences'},
  {name:'Tailwind',symbol:'≈',type:'Development',note:'Responsive styling'},
  {name:'Supabase',symbol:'◫',type:'Development',note:'App data & services'},
  {name:'Figma',symbol:'✿',type:'Design',note:'UI ideas & prototypes'},
  {name:'Git / GitHub',symbol:'⌘',type:'Workflow',note:'Team collaboration'},
];

// These are deliberately DESIGN-SAMPLE ARTBOARDS, not invented commissions.
// Replace labels, descriptions and artwork with your real posters, logos and social assets.
export const designWorks = [
  {id:'bloom',title:'Bloom & Grow',category:'Poster',kind:'Editorial poster',palette:'rose',art:'bloom',desc:'Sample poster exploring airy type, flower shapes and visual rhythm.',sample:true},
  {id:'atelier',title:'Atelier / 01',category:'Logo',kind:'Identity exploration',palette:'lilac',art:'atelier',desc:'Sample minimal logo system for a fictional creative studio.',sample:true},
  {id:'gooddays',title:'Better Days',category:'Social',kind:'Social media visual',palette:'lemon',art:'gooddays',desc:'Sample social design built around optimistic messaging.',sample:true},
  {id:'oasis',title:'The Oasis Edit',category:'Poster',kind:'Event poster',palette:'sage',art:'oasis',desc:'Sample typographic poster with a calm botanical direction.',sample:true},
  {id:'mono',title:'M / Monogram',category:'Logo',kind:'Lettermark study',palette:'cream',art:'mono',desc:'Sample monogram exploring geometry and negative space.',sample:true},
  {id:'Sunday',title:'Slow Sunday',category:'Social',kind:'Social media carousel',palette:'peach',art:'sunday',desc:'Sample storytelling card with playful editorial composition.',sample:true},
];

// Populate with verified real records. No certificates or volunteering organizations are invented.
export const certificates = [];
// Example item: {title:'Course name',issuer:'Issuing organization',date:'Month YYYY',url:'https://...',image:'/assets/...'}
export const volunteering = [];
// Example item: {role:'Your role',organization:'Organization',period:'Dates',impact:'What you contributed',image:'/assets/...'}

// Blog pieces are EDITABLE EXAMPLE ARTICLES rather than claimed published experiences.
export const posts = [
  {slug:'what-building-with-react-taught-me',sample:true,category:'DEVELOPMENT',date:'Draft · Add date',read:'4 min read',title:'What building with React taught me',excerpt:'Small components, thoughtful state management, and why simple interfaces take practice.',theme:'lavender',content:[
    {heading:'Why this matters',paragraph:'Building an interface is more than making a page look attractive. Each decision affects how someone understands and uses the product.'},
    {heading:'Start with the experience',paragraph:'Before writing components, define the primary user journey. Sketch the most important screens and decide what each action should do.'},
    {heading:'Make complexity manageable',paragraph:'Break a UI into reusable sections. Keep the data separate from the presentation and focus on one clear responsibility per component.'},
    {heading:'A note to my future self',paragraph:'Be curious, test small ideas often, and leave space for iteration. A good product is shaped by how well it serves people.'},
  ]},
  {slug:'learning-the-language-of-design',sample:true,category:'DESIGN NOTES',date:'Draft · Add date',read:'3 min read',title:'Learning the language of visual design',excerpt:'A growing collection of thoughts on whitespace, typography, colors, and designing with intention.',theme:'peach',content:[
    {heading:'Design begins with intention',paragraph:'A useful design helps someone understand information, make a decision, or feel something. Visual polish becomes meaningful when it supports that goal.'},
    {heading:'Make room to breathe',paragraph:'Whitespace helps create focus. Typography builds hierarchy. A small, consistent color palette can make an interface feel calm and confident.'},
    {heading:'Keep a visual notebook',paragraph:'Collect references, identify why they work, then practice making your own layouts. The aim is to develop taste and a distinct point of view.'},
  ]},
  {slug:'making-the-most-of-team-projects',sample:true,category:'STUDENT JOURNAL',date:'Draft · Add date',read:'4 min read',title:'Things worth remembering from team projects',excerpt:'How communication, version control, and small milestones help ideas become working software.',theme:'mint',content:[
    {heading:'Clarity is a team skill',paragraph:'Before writing code, make sure the team understands the problem, the intended outcome, and how progress will be shared.'},
    {heading:'Share work thoughtfully',paragraph:'Small, descriptive commits and clear pull requests help teammates review changes and understand the purpose behind them.'},
    {heading:'Reflect after delivery',paragraph:'The project does not end at the final demo. Note what worked, what slowed you down, and what you would approach differently next time.'},
  ]},
];
