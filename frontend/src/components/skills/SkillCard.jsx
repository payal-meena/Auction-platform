import React from 'react';

const SkillCard = ({ name, wantsToLearn, rating, reviews, level, image, colorClass }) => {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all group">
      <div className={`h-32 bg-gradient-to-br ${colorClass} relative`}>
        <span className="absolute top-4 right-4 bg-background-dark text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          {level}
        </span>
      </div>
      <div className="p-5 -mt-12">
        <div className="bg-white dark:bg-background-dark p-1 rounded-full w-fit mb-3">
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Wants to learn: {wantsToLearn}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="text-xs font-bold">{rating} ({reviews})</span>
          </div>
          <button className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background-dark px-4 py-2 rounded-lg text-xs font-bold transition-all">
            Swap Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;