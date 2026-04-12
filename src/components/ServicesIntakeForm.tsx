'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  businessType: string;
  packageInterest: string;
  description: string;
  hearAbout: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  businessType: '',
  packageInterest: '',
  description: '',
  hearAbout: '',
};

export default function ServicesIntakeForm() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!formData.businessType) next.businessType = 'Please select a business type';
    if (!formData.packageInterest) {
      next.packageInterest = 'Please select a package';
    }
    if (!formData.description.trim()) {
      next.description = "Please describe what you'd like automated";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSubmitted(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <section
      id="apply"
      className="scroll-mt-20 sm:scroll-mt-24 bg-gray-50 py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-1 sm:px-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to stop doing it manually?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your business and where automation would make the
              biggest difference. We&apos;ll follow up within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-800">
                    Thanks — we&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="intake-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="intake-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="intake-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-business-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business type *
                </label>
                <select
                  id="intake-business-type"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                    errors.businessType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select business type</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="marketing-agency">Marketing Agency</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.businessType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-package"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Which package interests you? *
                </label>
                <select
                  id="intake-package"
                  name="packageInterest"
                  value={formData.packageInterest}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                    errors.packageInterest ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a package</option>
                  <option value="order-intelligence">
                    Order Intelligence Dashboard
                  </option>
                  <option value="review-intelligence">
                    Review Intelligence Pipeline
                  </option>
                  <option value="client-reporting">
                    Client Reporting Autopilot
                  </option>
                  <option value="not-sure">Not sure yet</option>
                </select>
                {errors.packageInterest && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.packageInterest}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Describe what you&apos;d like automated *
                </label>
                <textarea
                  id="intake-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="What should the automation do? What systems are involved?"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-hear-about"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  id="intake-hear-about"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit your application →
              </button>

              <p className="text-sm text-gray-500 text-center">
                We review every submission personally. If it&apos;s a fit,
                we&apos;ll reach out to schedule a call.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
