
import React from 'react';

const MySkillCard = ({
  title,
  level,
  icon = 'school',
  description,
  experience,
  category,
  exchangeSkills,
  status = 'Active',
  isOffer = true,
  onEdit,
  onDelete,
  onViewCurriculum
}) => {
  return (
    <div className="bg-[#0f2d1f] border border-[#1f4a34] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all font-['Lexend']">


      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-4">
        {/* ICON */}
        <div
          className={`${isOffer
            ? 'bg-slate-100 dark:bg-[#112217]'
            : 'bg-primary/5 dark:bg-[#112217]'
            } p-3 rounded-xl`}
        >
          <span className="material-symbols-outlined text-primary text-3xl">
            {icon}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>

         <button
  onClick={() => {
    if (onDelete) { // safety check
      if (window.confirm(`Are you sure you want to delete ${title}?`)) {
        onDelete(); // call the parent delete function
      }
    }
  }}
  className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
>
  <span className="material-symbols-outlined text-xl">delete</span>
</button>


        </div>
      </div>


      {/* ===== TITLE ===== */}
      <h4 className="text-white font-bold text-lg capitalize mb-1">
        {title}
      </h4>

      {/* ===== LEVEL ===== */}
      <span className="inline-block mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#2fff9a]/20 text-[#2fff9a]">
        {level}
      </span>

      {/* ===== DESCRIPTION ===== */}
      {description && (
        <p className="text-xs text-[#9adfc1] leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>
      )}

      {/* ===== META TAGS ===== */}
      <div className="flex flex-wrap gap-2 mb-4">
        {experience && (
          <span className="px-2 py-0.5 text-[10px] rounded bg-[#143d2a] text-[#9adfc1]">
            {experience} yrs
          </span>
        )}

        {category && (
          <span className="px-2 py-0.5 text-[10px] rounded bg-[#143d2a] text-[#9adfc1]">
            {category}
          </span>
        )}

        {exchangeSkills && (
          <span className="px-2 py-0.5 text-[10px] rounded bg-[#2fff9a]/10 text-[#2fff9a]">
            Exchange: {Array.isArray(exchangeSkills)
              ? exchangeSkills.join(', ')
              : exchangeSkills}
          </span>
        )}
      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1f4a34]">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#2fff9a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2fff9a]"></span>
          {status}
        </span>

        {isOffer && (
          <button
            onClick={onViewCurriculum}
            className="text-[#2fff9a] text-xs font-bold hover:underline"
          >
            View Curriculum
          </button>
        )}
      </div>
    </div>
  );
};

export default MySkillCard;
