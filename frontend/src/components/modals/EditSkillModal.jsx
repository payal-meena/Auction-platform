import React, { useState, useEffect } from 'react';

const EditSkillModal = ({ isOpen, onClose, skillData, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('beginner');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (skillData) {
      setTitle(skillData.title || '');
      setLevel(skillData.level || 'beginner');
      setDescription(skillData.description || '');
    }
  }, [skillData]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Skill name is required');

    const data = { skillName: title, level, description };
    onSubmit(skillData._id, data); // call parent update function
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="bg-[#112217cc] backdrop-blur-xl border border-[#23482f]/50 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden font-['Lexend']">
        <div className="p-6 border-b border-[#23482f]/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#13ec5b]/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-[#13ec5b]">edit_note</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Edit Skill</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#92c9a4]">Skill Name</label>
            <input 
              className="w-full bg-[#112217] border-[#23482f] text-white rounded-xl focus:ring-[#13ec5b] focus:border-[#13ec5b] placeholder-slate-600 px-4 py-3 outline-none" 
              placeholder="e.g. Python Programming" 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#92c9a4]">Proficiency Level</label>
            <select 
              className="w-full bg-[#112217] border-[#23482f] text-white rounded-xl focus:ring-[#13ec5b] focus:border-[#13ec5b] px-4 py-3 appearance-none outline-none"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#92c9a4]">Description</label>
            <textarea 
              className="w-full bg-[#112217] border-[#23482f] text-white rounded-xl focus:ring-[#13ec5b] focus:border-[#13ec5b] placeholder-slate-600 px-4 py-3 outline-none" 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#23482f] text-white font-semibold rounded-xl hover:bg-white/5 transition-all cursor-pointer" 
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 px-6 py-3 bg-gradient-to-br from-[#13ec5b] to-[#0db344] text-[#102216] font-bold rounded-xl shadow-[0_0_15px_rgba(19,236,91,0.3)] hover:shadow-[0_0_25px_rgba(19,236,91,0.5)] transition-all cursor-pointer" 
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkillModal;
