import React from 'react';
import { Certification } from '../../types/cv';
import { Award, Building2, Calendar } from 'lucide-react';

interface Props {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationsForm({ certifications, onChange }: Props) {
  const addCertification = () => {
    onChange([
      ...certifications,
      {
        name: '',
        institution: '',
        dateObtained: '',
        expirationDate: '',
      },
    ]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange(updatedCertifications);
  };

  const removeCertification = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        <button
          type="button"
          onClick={addCertification}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Certification
        </button>
      </div>

      {certifications.map((certification, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Certification {index + 1}</h3>
            </div>
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certification Name
              </label>
              <input
                type="text"
                required
                value={certification.name}
                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Certification name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issuing Institution
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={certification.institution}
                  onChange={(e) => updateCertification(index, 'institution', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Institution name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Obtained
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={certification.dateObtained}
                  onChange={(e) => updateCertification(index, 'dateObtained', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date (Optional)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={certification.expirationDate}
                  onChange={(e) => updateCertification(index, 'expirationDate', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {certifications.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No certifications added yet. Click "Add Certification" to begin.
        </p>
      )}
    </div>
  );
}