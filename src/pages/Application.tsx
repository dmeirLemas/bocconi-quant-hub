
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Application = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    year: '',
    program: '',
    gpa: '',
    motivation: '',
    experience: '',
    skills: '',
    availability: '',
    portfolio: '',
    linkedin: '',
    references: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your application. We'll review it and get back to you within 2 weeks.",
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      studentId: '',
      year: '',
      program: '',
      gpa: '',
      motivation: '',
      experience: '',
      skills: '',
      availability: '',
      portfolio: '',
      linkedin: '',
      references: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-10">
            <h1 className="text-4xl font-bold text-white mb-4">Join QFA</h1>
            <p className="text-xl text-gray-200">
              Take the first step towards an exceptional career in quantitative finance
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    required
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="MSc 1st">MSc 1st Year</option>
                    <option value="MSc 2nd">MSc 2nd Year</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                    Program *
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Program</option>
                    <option value="BSc Finance">BSc Finance</option>
                    <option value="BSc Economics">BSc Economics</option>
                    <option value="BSc Management">BSc Management</option>
                    <option value="MSc Finance">MSc Finance</option>
                    <option value="MSc Data Science">MSc Data Science</option>
                    <option value="MSc Economics">MSc Economics</option>
                    <option value="MSc Mathematical Finance">MSc Mathematical Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-2">
                    Current GPA *
                  </label>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    step="0.01"
                    min="0"
                    max="30"
                    required
                    value={formData.gpa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 28.5"
                  />
                </div>
              </div>
            </div>

            {/* Motivation and Experience */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Yourself</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join QFA? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    required
                    rows={4}
                    value={formData.motivation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Describe your interest in quantitative finance and what you hope to gain from QFA membership..."
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Any internships, projects, or coursework related to finance, mathematics, or programming..."
                  />
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Skills
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Programming languages (Python, R, MATLAB, C++), software (Bloomberg Terminal, Excel), etc..."
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Time Commitment *
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">How many hours per week can you commit?</option>
                    <option value="2-4 hours">2-4 hours</option>
                    <option value="5-8 hours">5-8 hours</option>
                    <option value="9-12 hours">9-12 hours</option>
                    <option value="12+ hours">12+ hours</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Projects (Optional)
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Link to your GitHub, personal website, or project portfolio"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                    References (Optional)
                  </label>
                  <textarea
                    id="references"
                    name="references"
                    rows={3}
                    value={formData.references}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Professor or professional references (name, title, contact information)"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Application
              </button>
              <p className="mt-4 text-sm text-gray-600 text-center">
                * Required fields. Applications are reviewed on a rolling basis.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
