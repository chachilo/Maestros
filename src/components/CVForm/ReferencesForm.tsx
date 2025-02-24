import React from 'react';
import { Reference } from '../../types/cv';
import { User, Building2, Mail, Phone, Users } from 'lucide-react';

interface Props {
  references: Reference[];
  onChange: (references: Reference[]) => void;
}

export default function ReferencesForm({ references, onChange }: Props) {
  const addReference = () => {
    onChange([
      ...references,
      {
        name: '',
        position: '',
        institution: '',
        email: '',
        phone: '',
        relationship: '',
      },
    ]);
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = references.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    onChange(updatedReferences);
  };

  const removeReference = (index: number) => {
    onChange(references.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">References</h2>
        <button
          type="button"
          onClick={addReference}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Reference
        </button>
      </div>

      {references.map((reference, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Reference {index + 1}</h3>
            </div>
            <button
              type="button"
              onClick={() => removeReference(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={reference.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Reference name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                required
                value={reference.position}
                onChange={(e) => updateReference(index, 'position', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Current position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={reference.institution}
                  onChange={(e) => updateReference(index, 'institution', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Institution name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={reference.email}
                  onChange={(e) => updateReference(index, 'email', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  value={reference.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={reference.relationship}
                  onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Former supervisor"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {references.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No references added yet. Click "Add Reference" to begin.
        </p>
      )}
    </div>
  );
}