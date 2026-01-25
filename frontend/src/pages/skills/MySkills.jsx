import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, X, Search } from 'lucide-react';
import UserNavbar from '../../components/common/UserNavbar';
import MySkillCard from '../../components/skills/MySkillCard';
import EditSkillModal from '../../components/modals/EditSkillModal';
import AddSkillModal from '../../components/modals/AddSkillModal';
import CurriculumModal from '../../components/modals/CurriculumModal';
import EditCurriculumModal from '../../components/modals/EditCurriculumModal';
import api from '../../api/api';

const MySkills = () => {
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [wantedSkills, setWantedSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isEditCurriculumOpen, setIsEditCurriculumOpen] = useState(false);
  const [isWantedModalOpen, setIsWantedModalOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeSkillTitle, setActiveSkillTitle] = useState('');
  const [skillType, setSkillType] = useState('Offer'); // Offer or Learn

  // For adding wanted skills
  const [wantedSkillName, setWantedSkillName] = useState('');
  const [wantedProficiency, setWantedProficiency] = useState('beginner');
  const [wantedDescription, setWantedDescription] = useState('');

  const token = localStorage.getItem('token');

  // ===== API CALLS =====
  const fetchMySkills = async () => {
    try {
      setLoading(true);
      const res = await api.get('/skills/my', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOfferedSkills(res.data.offered || []);
      setWantedSkills(res.data.learn || []);
    } catch (err) {
      console.error('Fetch skills error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (data) => {
    try {
      await api.post('/skills', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMySkills();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Add skill error:', err);
    }
  };

  const updateSkill = async (id, data) => {
    try {
      await api.put(`/skills/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMySkills();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Update skill error:', err);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMySkills();
    } catch (err) {
      console.error('Delete skill error:', err);
    }
  };

  // ===== Wanted Skills Modal =====
  const handleAddWantedSkill = async () => {
    if (!wantedSkillName.trim()) return;

    try {
      await api.post(
        '/skills',
        {
          type: 'Learn',
          skillName: wantedSkillName.trim(),
          level: wantedProficiency.charAt(0).toUpperCase() + wantedProficiency.slice(1),
          description: wantedDescription.trim()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMySkills();
      setIsWantedModalOpen(false);
      setWantedSkillName('');
      setWantedProficiency('beginner');
      setWantedDescription('');
    } catch (err) {
      console.error('Error adding wanted skill:', err);
    }
  };

  useEffect(() => {
    fetchMySkills();
  }, []);

  const handleEditClick = (skill) => {
    setSelectedSkill(skill);
    setIsEditModalOpen(true);
  };

  const handleViewCurriculum = (title) => {
    setActiveSkillTitle(title);
    setIsCurriculumOpen(true);
  };

  const openAddModal = (type) => {
    if (type === 'Learn') {
      setIsWantedModalOpen(true);
    } else {
      setSkillType(type); // Offer
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-['Lexend'] relative">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <UserNavbar userName="Alex" />
        <div className="p-8 max-w-[1200px] mx-auto w-full">
          {/* ===== OFFERED SKILLS ===== */}
          <section className="mb-12">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Skills I Offer</h3>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition"
                onClick={() => openAddModal('Offer')}
              >
                <PlusCircle size={20} /> Add New Skill
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-slate-500">Loading skills...</div>
            ) : offeredSkills.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No skills added yet.
                <button
                  className="ml-2 text-green-500 hover:underline"
                  onClick={() => openAddModal('Offer')}
                >
                  Add your first skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offeredSkills.map((skill) => (
                  <MySkillCard
                    key={skill._id}
                    title={skill.skillName}
                    level={skill.level}
                    experience={skill.experience}
                    description={skill.description}
                    category={skill.category}
                    exchangeSkills={skill.exchangeSkills}
                    status={skill.isActive ? 'Active' : 'Paused'}
                    isOffer
                    onEdit={() => handleEditClick(skill)}
                    onDelete={() => deleteSkill(skill._id)}
                    onViewCurriculum={() => handleViewCurriculum(skill.skillName)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ===== WANTED SKILLS ===== */}
          <section>
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Skills I Want to Learn</h3>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-50 transition"
                onClick={() => openAddModal('Learn')}
              >
                <PlusCircle size={20} /> Add Wanted Skill
              </button>
            </div>

            {wantedSkills.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No wanted skills yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wantedSkills.map((skill) => (
                  <MySkillCard
                    key={skill._id}
                    title={skill.skillName}
                    level={skill.level}
                    status="Learning"
                    isOffer={false}
                    onEdit={() => handleEditClick(skill)}
                    onDelete={() => deleteSkill(skill._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ===== MODALS ===== */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addSkill}
        type={skillType} // "Offer"
      />

      <EditSkillModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        skillData={selectedSkill}
        onSubmit={updateSkill}
      />

      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        skillTitle={activeSkillTitle}
      />

      <EditCurriculumModal
        isOpen={isEditCurriculumOpen}
        onClose={() => setIsEditCurriculumOpen(false)}
        skillTitle={activeSkillTitle}
      />

      {/* ===== WANTED SKILL MODAL ===== */}
      {isWantedModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#102216]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#102216]/85 backdrop-blur-xl w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#13ec5b]/20">
            
            <div className="flex justify-between items-center px-8 py-6 border-b border-[#23482f]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#13ec5b]/10 flex items-center justify-center">
                  <PlusCircle className="text-[#13ec5b]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Add Wanted Skill</h2>
              </div>
              <button onClick={() => setIsWantedModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#92c9a4]">What do you want to learn?</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    className="w-full bg-[#193322]/50 border border-[#23482f] focus:border-[#13ec5b] focus:ring-1 focus:ring-[#13ec5b] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-all" 
                    placeholder="Find a skill you want to learn" 
                    type="text"
                    value={wantedSkillName}
                    onChange={(e) => setWantedSkillName(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-slate-500 font-medium py-1">Suggested:</span>
                  {['Python', 'Photography', 'Data Science', 'Guitar'].map(skill => (
                    <button 
                      key={skill} 
                      onClick={() => setWantedSkillName(skill)}
                      className="px-3 py-1 rounded-full bg-[#23482f] text-[#92c9a4] text-xs font-medium hover:bg-[#13ec5b]/20 hover:text-[#13ec5b] transition-all"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#92c9a4]">Target Proficiency</label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <label key={level} className="cursor-pointer group">
                      <input 
                        className="peer hidden" 
                        type="radio" 
                        checked={wantedProficiency === level}
                        onChange={() => setWantedProficiency(level)}
                      />
                      <div className="text-center py-3 rounded-xl border border-[#23482f] bg-[#193322]/30 text-slate-400 peer-checked:bg-[#13ec5b]/10 peer-checked:border-[#13ec5b] peer-checked:text-[#13ec5b] transition-all font-medium text-sm capitalize">
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#92c9a4]">Add a note to potential mentors</label>
                <textarea 
                  className="w-full bg-[#193322]/50 border border-[#23482f] focus:border-[#13ec5b] focus:ring-1 focus:ring-[#13ec5b] rounded-xl py-3 px-4 text-white placeholder-slate-500 outline-none transition-all resize-none" 
                  placeholder="Explain what you're hoping to achieve..." 
                  rows="3"
                  value={wantedDescription}
                  onChange={(e) => setWantedDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="p-8 pt-0 flex gap-4">
              <button 
                onClick={() => setIsWantedModalOpen(false)}
                className="flex-1 px-6 py-4 rounded-xl border border-[#23482f] text-slate-400 font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddWantedSkill}
                className="flex-[2] px-6 py-4 rounded-xl bg-[#13ec5b] text-[#102216] font-bold hover:shadow-lg hover:shadow-[#13ec5b]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                Add to My List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySkills;
