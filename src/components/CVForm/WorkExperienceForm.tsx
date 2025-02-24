import React from 'react';
import { WorkExperience } from '../../types/cv';
import { Building2, Briefcase, Calendar, MapPin, ListChecks, Trophy } from 'lucide-react';

interface Props {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ experiences, onChange }: Props) {
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        institution: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        achievements: '',
        location: '',
      },
    ]);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updatedExperiences);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Experience
        </button>
      </div>

      {experiences.map((experience, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={experience.institution}
                  onChange={(e) => updateExperience(index, 'institution', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Institution name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={experience.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Job title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={experience.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={experience.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
            <div className="mt-1 relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <ListChecks className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                required
                value={experience.responsibilities}
                onChange={(e) => updateExperience(index, 'responsibilities', e.target.value)}
                rows={3}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="Describe your main responsibilities..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Achievements</label>
            <div className="mt-1 relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <Trophy className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                value={experience.achievements}
                onChange={(e) => updateExperience(index, 'achievements', e.target.value)}
                rows={3}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="List your key achievements (optional)..."
              />
            </div>
          </div>
        </div>
      ))}

      {experiences.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No work experience added yet. Click "Add Experience" to begin.
        </p>
      )}
    </div>
  );
}