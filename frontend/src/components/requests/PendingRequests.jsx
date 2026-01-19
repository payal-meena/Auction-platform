import React from 'react';

const RequestItem = ({ name, skill, message, img }) => (
  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#193322] border border-slate-100 dark:border-[#23482f]">
    <div className="flex gap-3 mb-3">
      <img className="h-10 w-10 rounded-lg object-cover" src={img} alt={name} />
      <div>
        <p className="text-slate-900 dark:text-white text-sm font-bold">{name}</p>
        <p className="text-slate-500 dark:text-[#92c9a4] text-xs">wants to learn <span className="text-primary font-medium">{skill}</span></p>
      </div>
    </div>
    {message && <p className="text-slate-600 dark:text-slate-400 text-xs italic mb-4">"{message}"</p>}
    <div className="grid grid-cols-2 gap-2">
      <button className="py-1.5 rounded-lg bg-primary text-background-dark text-xs font-bold">Accept</button>
      <button className="py-1.5 rounded-lg border border-slate-200 dark:border-[#326744] text-xs font-medium">Decline</button>
    </div>
  </div>
);

const PendingRequests = () => {
  return (
    <div className="bg-white dark:bg-[#112217] rounded-2xl border border-slate-200 dark:border-[#23482f] p-6 shadow-sm">
      <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
        Pending Requests <span className="bg-primary text-background-dark text-[10px] h-5 w-5 flex items-center justify-center rounded-full">2</span>
      </h2>
      <div className="flex flex-col gap-4">
        <RequestItem name="Liam Wilson" skill="React" message="Hey! I saw you're looking for French..." img="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" />
        <RequestItem name="Elena Rossi" skill="Sketching" img="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" />
      </div>
    </div>
  );
};

export default PendingRequests;