import React from 'react';
import { Language } from '../../types/cv';
import { Languages, AlignCenterVertical as Certificate } from 'lucide-react';

interface Props {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export default function LanguagesForm({ languages, onChange }: Props) {
  const addLanguage = () => {
    onChange([
      ...languages,
      {
        name: '',
        level: 'intermediate',
        certification: '',
      },
    ]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    onChange(updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
        <button
          type="button"
          onClick={addLanguage}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Language
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((language, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900">Language {index + 1}</h3>
              </div>
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language Name</label>
                <input
                  type="text"
                  required
                  value={language.name}
                  onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Language name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  value={language.level}
                  onChange={(e) => updateLanguage(index, 'level', e.target.value as Language['level'])}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="native">Native</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Certification (Optional)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Certificate className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={language.certification || ''}
                    onChange={(e) => updateLanguage(index, 'certification', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., TOEFL, IELTS, DELF"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {languages.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No languages added yet. Click "Add Language" to begin.
        </p>
      )}
    </div>
  );
}