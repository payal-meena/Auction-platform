import React, { useState } from 'react';

// --- Static Data for Logs ---
const MOCK_LOGS = [
  { id: "#EX-98241", u1: "James L.", u2: "Emma S.", s1: "React", s2: "Marketing", time: "2 mins ago", status: "Active", risk: "Low", ip: "192.168.1.1" },
  { id: "#EX-98235", u1: "Sarah J.", u2: "Mike T.", s1: "Python", s2: "UI Design", time: "12 mins ago", status: "Flagged", risk: "High", ip: "45.22.10.8" },
  { id: "#EX-98212", u1: "Alice W.", u2: "Sofia R.", s1: "Spanish", s2: "SEO", time: "1 hour ago", status: "Completed", risk: "None", ip: "102.12.0.4" },
];

const Monitoring = () => {
  const [showAudit, setShowAudit] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeAuditTab, setActiveAuditTab] = useState('chat');

  const openAudit = (log) => {
    setSelectedLog(log);
    setShowAudit(true);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#050505] font-['Space_Grotesk'] text-slate-300">
      
      {/* 1. Minimalist Header - Only Heading */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center px-8 shrink-0 z-30">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
            <span className="size-2.5 bg-[#25f47b] rounded-full animate-pulse shadow-[0_0_15px_#25f47b]"></span>
            SYSTEM MONITORING
          </h2>
          <span className="text-[10px] text-[#25f47b]/50 font-mono tracking-[0.2em] ml-6">REAL-TIME DATA STREAM</span>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Live Connections" value="1,202" trend="+12%" icon="sync" color="#25f47b" />
            <StatCard label="Flagged High Risk" value="14" trend="+3" icon="warning" color="#ef4444" />
            <StatCard label="Avg. Response Time" value="1.2s" trend="-0.4s" icon="timer" color="#3b82f6" />
            <StatCard label="Security Score" value="98%" trend="Stable" icon="verified_user" color="#a855f7" />
        </div>

        {/* Logs Table Container */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Activity Logs</h3>
            <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-[#25f47b] text-black text-[10px] font-black uppercase rounded shadow-[0_0_15px_rgba(37,244,123,0.3)]">Live Feed</button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.01] text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Stream ID</th>
                <th className="px-8 py-5">Nodes</th>
                <th className="px-8 py-5">Skill Vector</th>
                <th className="px-8 py-5">Network IP</th>
                <th className="px-8 py-5 text-center">Risk Level</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="text-sm font-mono font-bold text-[#25f47b]">{log.id}</span>
                        <span className="text-[10px] text-slate-600 mt-1">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            <Avatar seed={log.u1} />
                            <Avatar seed={log.u2} />
                        </div>
                        <span className="text-xs font-medium text-slate-300">{log.u1} & {log.u2}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 bg-white/5 rounded border border-white/10 text-slate-400">{log.s1}</span>
                        <span className="material-symbols-outlined text-[14px] text-slate-700">arrow_right_alt</span>
                        <span className="text-[10px] px-2.5 py-1 bg-white/5 rounded border border-white/10 text-slate-400">{log.s2}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-[11px] text-slate-500">{log.ip}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase border ${
                        log.risk === 'High' ? 'border-red-500/50 text-red-500 bg-red-500/10' : 
                        log.risk === 'Low' ? 'border-[#25f47b]/50 text-[#25f47b] bg-[#25f47b]/10' : 'border-slate-500/50 text-slate-500'
                    }`}>
                      {log.risk}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => openAudit(log)} className="px-4 py-2 bg-white/5 hover:bg-[#25f47b] hover:text-black transition-all rounded text-[10px] font-bold uppercase border border-white/10">
                        Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Audit Modal */}
      {showAudit && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-8 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-white font-black uppercase tracking-widest text-xl">Audit Log: {selectedLog.id}</h3>
                <p className="text-[10px] text-[#25f47b] font-bold mt-1 uppercase tracking-tighter">SECURE CONNECTION ESTABLISHED</p>
              </div>
              <button onClick={() => setShowAudit(false)} className="size-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Navigation */}
            <div className="flex bg-white/[0.01] px-8 border-b border-white/5">
                <AuditTab label="Chat Stream" active={activeAuditTab === 'chat'} onClick={() => setActiveAuditTab('chat')} icon="forum" />
                <AuditTab label="Technical Metadata" active={activeAuditTab === 'tech'} onClick={() => setActiveAuditTab('tech')} icon="terminal" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 bg-gradient-to-b from-transparent to-[#25f47b]/5">
              {activeAuditTab === 'chat' ? (
                <div className="space-y-8 max-w-2xl mx-auto">
                    <ChatBubble name={selectedLog.u1} time="14:22" text="Hi, I saw your React request. Can you help me with a Marketing plan in return?" isRight={false} />
                    <ChatBubble name={selectedLog.u2} time="14:25" text="Sure! I have 5 years of experience in digital marketing. Let's swap." isRight={true} />
                </div>
              ) : (
                <div className="font-mono text-xs text-slate-500 space-y-3 p-6 bg-black/50 rounded-xl border border-white/5">
                    <p className="text-[#25f47b]">{`> [AUTH] Handshake success via ${selectedLog.ip}`}</p>
                    <p>{`> [PROTOCOL] Skill_Vector_Active: ${selectedLog.s1} <-> ${selectedLog.s2}`}</p>
                    <p>{`> [META] Connection_Latency: 24ms`}</p>
                    <p className="text-yellow-500">{`> [AUDIT] Privacy filters enabled`}</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-black flex items-center justify-between border-t border-white/5">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">End of Transcript</span>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-red-500/10 text-red-500 text-[10px] font-black uppercase rounded border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Flag Content</button>
                  <button className="px-6 py-2.5 bg-[#25f47b] text-black text-[10px] font-black uppercase rounded hover:brightness-110 transition-all">Verify Connection</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ label, value, trend, icon, color }) => (
    <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity" style={{ color }}>
            <span className="material-symbols-outlined text-[56px]">{icon}</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        <div className="flex items-end gap-3 mt-3">
            <span className="text-3xl font-black text-white">{value}</span>
            <span className="text-[10px] font-bold mb-1.5" style={{ color: trend.startsWith('+') ? '#25f47b' : '#ef4444' }}>{trend}</span>
        </div>
    </div>
);

const AuditTab = ({ label, active, onClick, icon }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-3 px-8 py-5 border-b-2 transition-all text-[11px] font-bold uppercase tracking-widest ${
            active ? 'border-[#25f47b] text-[#25f47b] bg-[#25f47b]/5' : 'border-transparent text-slate-500 hover:text-slate-300'
        }`}
    >
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        {label}
    </button>
);

const Avatar = ({ seed }) => (
    <img className="size-8 rounded-full border-2 border-[#050505] bg-white/10" src={`https://api.dicebear.com/7.x/initials/svg?seed=${seed}`} alt="" />
);

const ChatBubble = ({ name, time, text, isRight }) => (
  <div className={`flex flex-col gap-3 ${isRight ? 'items-end ml-auto' : ''} max-w-[80%]`}>
    <div className={`p-5 text-sm leading-relaxed rounded-3xl ${
      isRight 
      ? 'bg-[#25f47b]/10 border border-[#25f47b]/20 text-[#25f47b] rounded-tr-none' 
      : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
    }`}>
      {text}
    </div>
    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter px-2">{name} • {time}</span>
  </div>
);

export default Monitoring;