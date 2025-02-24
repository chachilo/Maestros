import React from 'react';
import { Skill } from '../../types/cv';
import { Wrench, Brain } from 'lucide-react';

interface Props {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillsForm({ skills, onChange }: Props) {
  const addSkill = () => {
    onChange([
      ...skills,
      {
        name: '',
        type: 'technical',
        level: 'intermediate',
      },
    ]);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange(updatedSkills);
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {skill.type === 'technical' ? (
                  <Wrench className="h-5 w-5 text-gray-400" />
                ) : (
                  <Brain className="h-5 w-5 text-gray-400" />
                )}
                <h3 className="text-sm font-medium text-gray-900">Skill {index + 1}</h3>
              </div>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Skill name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={skill.type}
                  onChange={(e) => updateSkill(index, 'type', e.target.value as 'technical' | 'soft')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skill</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No skills added yet. Click "Add Skill" to begin.
        </p>
      )}
    </div>
  );
}