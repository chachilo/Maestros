import React, { useState } from 'react';
import { TeacherCV } from '../types/cv';
import BasicInfoForm from './CVForm/BasicInfoForm';
import WorkExperienceForm from './CVForm/WorkExperienceForm';
import EducationForm from './CVForm/EducationForm';
import SkillsForm from './CVForm/SkillsForm';
import LanguagesForm from './CVForm/LanguagesForm';
import CertificationsForm from './CVForm/CertificationsForm';
import PublicationsForm from './CVForm/PublicationsForm';
import ReferencesForm from './CVForm/ReferencesForm';

const initialCV: TeacherCV = {
  basicInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    nationality: '',
    linkedIn: '',
    socialMedia: [],
    professionalSummary: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  publications: [],
  references: []
};

const steps = [
  { id: 1, name: 'Basic Information' },
  { id: 2, name: 'Work Experience' },
  { id: 3, name: 'Education' },
  { id: 4, name: 'Skills' },
  { id: 5, name: 'Languages' },
  { id: 6, name: 'Certifications' },
  { id: 7, name: 'Publications' },
  { id: 8, name: 'References' }
];

export default function CVForm() {
  const [cv, setCV] = useState<TeacherCV>(initialCV);
  const [currentStep, setCurrentStep] = useState(1);

  const updateCV = <K extends keyof TeacherCV>(
    section: K,
    data: TeacherCV[K]
  ) => {
    setCV(prev => ({ ...prev, [section]: data }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the CV data to your backend
    console.log('CV Data:', cv);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm 
            data={cv.basicInfo}
            onChange={(data) => updateCV('basicInfo', data)}
          />
        );
      case 2:
        return (
          <WorkExperienceForm
            experiences={cv.workExperience}
            onChange={(data) => updateCV('workExperience', data)}
          />
        );
      case 3:
        return (
          <EducationForm
            education={cv.education}
            onChange={(data) => updateCV('education', data)}
          />
        );
      case 4:
        return (
          <SkillsForm
            skills={cv.skills}
            onChange={(data) => updateCV('skills', data)}
          />
        );
      case 5:
        return (
          <LanguagesForm
            languages={cv.languages}
            onChange={(data) => updateCV('languages', data)}
          />
        );
      case 6:
        return (
          <CertificationsForm
            certifications={cv.certifications}
            onChange={(data) => updateCV('certifications', data)}
          />
        );
      case 7:
        return (
          <PublicationsForm
            publications={cv.publications}
            onChange={(data) => updateCV('publications', data)}
          />
        );
      case 8:
        return (
          <ReferencesForm
            references={cv.references}
            onChange={(data) => updateCV('references', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Teacher CV Form</h1>
            <p className="mt-2 text-sm text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
            </p>
            <div className="mt-4 relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {currentStep === steps.length ? (
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Submit CV
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
}