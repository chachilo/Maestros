import React from 'react';
import { Publication } from '../../types/cv';
import { BookOpen, Link } from 'lucide-react';

interface Props {
  publications: Publication[];
  onChange: (publications: Publication[]) => void;
}

export default function PublicationsForm({ publications, onChange }: Props) {
  const addPublication = () => {
    onChange([
      ...publications,
      {
        title: '',
        description: '',
        link: '',
      },
    ]);
  };

  const updatePublication = (index: number, field: keyof Publication, value: string) => {
    const updatedPublications = publications.map((pub, i) =>
      i === index ? { ...pub, [field]: value } : pub
    );
    onChange(updatedPublications);
  };

  const removePublication = (index: number) => {
    onChange(publications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Publications</h2>
        <button
          type="button"
          onClick={addPublication}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Publication
        </button>
      </div>

      {publications.map((publication, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Publication {index + 1}</h3>
            </div>
            <button
              type="button"
              onClick={() => removePublication(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={publication.title}
                onChange={(e) => updatePublication(index, 'title', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Publication title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={publication.description}
                onChange={(e) => updatePublication(index, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Brief description of the publication..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link (Optional)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={publication.link}
                  onChange={(e) => updatePublication(index, 'link', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {publications.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No publications added yet. Click "Add Publication" to begin.
        </p>
      )}
    </div>
  );
}