import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SkillCard from '../../components/skills/SkillCard';

const steps = [
  { id: 1, title: "Request", icon: "search_check", desc: "Browse thousands of skills and send a swap request to experts." },
  { id: 2, title: "Accept", icon: "handshake", desc: "Get matched with a partner who wants to learn what you offer." },
  { id: 3, title: "Chat", icon: "chat_bubble", desc: "Use our secure messaging system to coordinate sessions." },
  { id: 4, title: "Learn", icon: "school", desc: "Meet up virtually or in person. Dive deep into new knowledge." },
  { id: 5, title: "Rate", icon: "star_rate", desc: "Share your experience and help build a trusted community." },
];

const featuredSkills = [
  { name: "Python Development", wants: "Jazz Guitar", rating: 4.9, reviews: 24, level: "Expert", color: "from-primary/20 to-primary/5", img: "https://i.pravatar.cc/150?u=1" },
  { name: "UI/UX Design", wants: "Baking", rating: 5.0, reviews: 12, level: "Intermediate", color: "from-blue-500/20 to-blue-500/5", img: "https://i.pravatar.cc/150?u=2" },
  { name: "Spanish Language", wants: "Digital Marketing", rating: 4.8, reviews: 38, level: "Native", color: "from-purple-500/20 to-purple-500/5", img: "https://i.pravatar.cc/150?u=3" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-['Lexend'] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-5">
        <Navbar />

        {/* Hero Section */}
        <main className="mt-8">
          <section id='hero' className="flex min-h-[520px] flex-col gap-6 rounded-xl items-center justify-center p-8 relative overflow-hidden bg-[linear-gradient(rgba(16,34,22,0.85),rgba(16,34,22,0.95)),url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center">
            <div className="flex flex-col gap-4 text-center max-w-2xl">
              <h1 className="text-white text-4xl font-black leading-tight md:text-6xl">
                Learn Skills, Save Money, Exchange Knowledge
              </h1>
              <h2 className="text-slate-300 text-base md:text-xl">
                The peer-to-peer platform where your expertise is your currency. Swap what you know for what you want to learn.
              </h2>
            </div>
            
            <div className="w-full max-w-[560px] space-y-3">
              <div className="flex w-full items-stretch rounded-xl h-14 md:h-16 shadow-2xl shadow-primary/10 overflow-hidden">
                <div className="flex bg-white/5 backdrop-blur-sm items-center justify-center pl-5 border border-white/10 border-r-0">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                </div>
                <input 
                  className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 border-x-0 text-white focus:ring-0 focus:outline-none placeholder:text-slate-500 px-4"
                  placeholder="What do you want to learn? (e.g. Guitar, Python)"
                />
                <button className="bg-primary text-background-dark font-bold px-6 hover:bg-primary/90 transition-all border border-primary">
                  Find Match
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center">Popular: Digital Marketing, Baking, Piano, Spanish</p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mt-16" id='how-it-works'>
            <div className="flex items-center justify-between px-4 pb-6">
              <h2 className="text-3xl font-bold">How SwapSkill Works</h2>
              <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-primary/20 to-transparent rounded-full hidden md:block"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[40px_1fr] gap-x-6 px-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-1 pt-3">
                    <div className="text-primary bg-primary/10 p-2 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[28px]">{step.icon}</span>
                    </div>
                    {index !== steps.length - 1 && <div className="w-[2px] bg-primary/20 h-12 grow"></div>}
                  </div>
                  <div className="flex flex-1 flex-col py-4">
                    <p className="text-lg font-bold"> {step.id}. {step.title}</p>
                    <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Featured Skills */}
          <section className="mt-16 mb-20 px-4" id='browse-skills'>
            <div className="flex items-center justify-between pb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Skills</h2>
                <p className="text-slate-500 text-sm mt-1">Hand-picked swaps trending this week</p>
              </div>
              <button className="text-primary font-semibold flex items-center gap-2 hover:underline">
                View All <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSkills.map((skill, i) => (
                <SkillCard
                  key={i}
                  name={skill.name}
                  wantsToLearn={skill.wants}
                  rating={skill.rating}
                  reviews={skill.reviews}
                  level={skill.level}
                  colorClass={skill.color}
                  image={skill.img}
                />
              ))}
            </div>
          </section>

          <section id="about" className="mt-24 px-4 scroll-mt-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Image Side */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-background-dark/10 dark:bg-white/5 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 aspect-video md:aspect-auto">
          <img 
            src="https://scontent.fbho4-3.fna.fbcdn.net/v/t39.30808-6/333148712_1542848719543769_4936215051879104106_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=2285d6&_nc_ohc=3jorZRCvrS8Q7kNvwEkPbyW&_nc_oc=AdmKB_jGl4qqrbee-cfI_ksRN765wSHJAYLVVjXoJRZBbUOh22hfxgaz2t03ghvaMgaVGhUK5K9DiJoTedfOgTEg&_nc_zt=23&_nc_ht=scontent.fbho4-3.fna&_nc_gid=C1LJoPRw9xhUxQU3PfR8Hw&oh=00_AfrF7Djr7NMqey9KkRlz7mkcNmMMb4sufCtgWt-ppcqryw&oe=6974366B" 
            alt="People collaborating and learning" 
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text Side */}
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit uppercase tracking-wider">
          Our Mission
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          Democratizing knowledge through human connection.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          At SwapSkill, we believe that everyone is an expert in something and a student of everything. Our platform removes the financial barriers to learning by turning your skills into a valuable currency.
        </p>
        
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div>
            <h4 className="text-primary text-2xl font-bold">50k+</h4>
            <p className="text-slate-500 text-sm">Active Learners</p>
          </div>
          <div>
            <h4 className="text-primary text-2xl font-bold">500+</h4>
            <p className="text-slate-500 text-sm">Skills Exchanged</p>
          </div>
        </div>
        
        <button className="mt-4 flex items-center gap-2 text-primary font-bold hover:translate-x-2 transition-transform">
          Learn more about our story <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </div>
    </div>
  </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Home;