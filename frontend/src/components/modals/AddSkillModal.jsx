import React, { useState, useEffect } from 'react';
import { skillService } from '../../services/skillService';

const AddSkillModal = ({ isOpen, onClose, onSkillAdded, type }) => {
  const [category, setCategory] = useState('');
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('Beginner');
  const [experience, setExperience] = useState(0);
  const [description, setDescription] = useState('');
  const [exchangeSkills, setExchangeSkills] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCategory('');
      setSkillName('');
      setProficiency('Beginner');
      setExperience(0);
      setDescription('');
      setExchangeSkills('');
      setThumbnail(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!skillName || !category || !proficiency) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Prepare payload for API
      const formData = new FormData();
      formData.append('skillName', skillName);
      formData.append('category', category);
      formData.append('level', proficiency);
      formData.append('experience', experience);
      formData.append('description', description);
      formData.append('type', type); // Offer or Learn
      formData.append('exchangeSkills', exchangeSkills);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      const response = await skillService.addSkill(formData);

      // Call parent callback
      if (onSkillAdded) onSkillAdded(response);

      // Reset form
      setCategory('');
      setSkillName('');
      setProficiency('Beginner');
      setExperience(0);
      setDescription('');
      setExchangeSkills('');
      setThumbnail(null);

      onClose();
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Failed to add skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-['Lexend']">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="bg-[#112217]/95 backdrop-blur-xl border border-[#13ec5b4d] w-full max-w-2xl rounded-3xl relative flex flex-col max-h-[90dvh] shadow-[0_0_50px_rgba(19,236,91,0.2)] animate-in fade-in zoom-in duration-200 overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 md:p-8 pb-4 flex justify-between items-start sticky top-0 bg-transparent z-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              {type === 'Offer' ? 'Share your expertise' : 'Skill you want to learn'}
            </h3>
            <p className="text-[#92c9a4] text-xs md:text-sm">
              Fill in the details below to list your skill.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5 md:space-y-6 px-6 md:px-10 pb-6" onSubmit={handleSubmit}>
          
          {/* Category & Skill Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Skill Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0d1b12] border border-[#23482f] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#13ec5b] focus:border-[#13ec5b] cursor-pointer outline-none transition-all"
                required
              >
                <option value="">Select a category</option>
                <option>Design & Creative</option>
                <option>Development & IT</option>
                <option>Business & Marketing</option>
                <option>Languages</option>
                <option>Music & Arts</option>
                <option>Education</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Skill Name</label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g. Figma Prototyping"
                className="w-full bg-[#0d1b12] border border-[#23482f] text-white rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#13ec5b] focus:border-[#13ec5b]"
                required
              />
            </div>
          </div>

          {/* Proficiency */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Proficiency Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <label key={level} className="relative cursor-pointer group">
                  <input
                    type="radio"
                    className="peer sr-only"
                    value={level}
                    checked={proficiency === level}
                    onChange={() => setProficiency(level)}
                    required
                  />
                  <div className="py-2.5 md:py-3 text-center border border-[#23482f] rounded-xl text-xs md:text-sm font-medium text-slate-400 peer-checked:bg-[#13ec5b22] peer-checked:border-[#13ec5b] peer-checked:text-[#13ec5b] hover:border-[#13ec5b88] transition-all">
                    {level}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Experience & Exchange Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Years of Experience</label>
              <input
                type="number"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="0"
                className="w-full bg-[#0d1b12] border border-[#23482f] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#13ec5b] focus:border-[#13ec5b] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Skills to Exchange</label>
              <input
                type="text"
                value={exchangeSkills}
                onChange={(e) => setExchangeSkills(e.target.value)}
                placeholder="e.g. Python, Piano..."
                className="w-full bg-[#0d1b12] border border-[#23482f] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#13ec5b] focus:border-[#13ec5b] outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Briefly describe what you can teach..."
              className="w-full bg-[#0d1b12] border border-[#23482f] text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#13ec5b] focus:border-[#13ec5b] placeholder:text-slate-600 resize-none outline-none transition-all"
            ></textarea>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="text-xs md:text-sm font-medium text-[#92c9a4] block ml-1">Thumbnail (Optional)</label>
            <input type="file" onChange={handleThumbnailChange} className="w-full text-sm text-white" />
          </div>

          {/* Submit Button */}
          <div className="pt-4 pb-2">
            <button
              type="submit"
              className="w-full py-3.5 md:py-4 bg-gradient-to-r from-[#13ec5b] to-[#0fbd48] text-[#102216] font-bold text-base md:text-lg rounded-2xl shadow-lg shadow-[#13ec5b33] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#102216]"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  Publish Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
