'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitContactForm } from '../../utils/data';
import type {
  ContactBudgetRange,
  ContactCompanySize,
  ContactHowHeard,
  ContactInquiryType,
  ContactProcessFrequency,
  ContactTimeline,
} from '../../utils/supabase';

type InquiryLane = ContactInquiryType | '';

const INQUIRY_TYPE_FROM_QUERY: Record<string, InquiryLane> = {
  workflow: 'workflow-automation',
  build: 'custom-build',
};

const COMPANY_SIZES: { value: ContactCompanySize; label: string }[] = [
  { value: '1-9', label: '1–9' },
  { value: '10-49', label: '10–49' },
  { value: '50-200', label: '50–200' },
  { value: '200+', label: '200+' },
];

const HOW_HEARD: { value: ContactHowHeard; label: string }[] = [
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'social', label: 'Social' },
  { value: 'referral', label: 'Referral' },
  { value: 'search', label: 'Search' },
  { value: 'other', label: 'Other' },
];

const INQUIRY_OPTIONS: { value: InquiryLane; label: string }[] = [
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'custom-build', label: 'Custom Build' },
  { value: 'unqualified', label: 'Not sure yet' },
];

const PROCESS_FREQUENCIES: { value: ContactProcessFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'as-needed', label: 'As-needed' },
];

const TIMELINES: { value: ContactTimeline; label: string }[] = [
  { value: 'asap', label: 'ASAP' },
  { value: 'within-month', label: 'Within a month' },
  { value: 'exploring', label: 'Just exploring' },
];

const BUDGET_RANGES: { value: ContactBudgetRange; label: string }[] = [
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5k-15k', label: '$5k–15k' },
  { value: '15k-25k', label: '$15k–25k' },
  { value: '25k-plus', label: '$25k+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const CONFIRMATION_SLA = 'two business days';

const emptyForm = {
  name: '',
  email: '',
  company: '',
  companySize: '' as ContactCompanySize | '',
  howHeard: '' as ContactHowHeard | '',
  inquiryType: '' as InquiryLane,
  toolsNeeded: '',
  processToday: '',
  processFrequency: '' as ContactProcessFrequency | '',
  timeline: '' as ContactTimeline | '',
  currentWorkaround: '',
  teamUsers: '',
  mustHaveIntegrations: '',
  budgetRange: '' as ContactBudgetRange | '',
  problem: '',
  loomUrl: '',
};

function splitName(name: string): { first_name: string; last_name: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first_name: '', last_name: '' };
  if (parts.length === 1) return { first_name: parts[0], last_name: '' };
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') };
}

function buildMessage(form: typeof emptyForm): string {
  const lines: string[] = [];

  if (form.inquiryType === 'workflow-automation') {
    lines.push(`Tools: ${form.toolsNeeded.trim()}`);
    lines.push(`Process today: ${form.processToday.trim()}`);
    if (form.processFrequency) lines.push(`Frequency: ${form.processFrequency}`);
    if (form.timeline) lines.push(`Timeline: ${form.timeline}`);
  } else if (form.inquiryType === 'custom-build') {
    lines.push(`Current workaround: ${form.currentWorkaround.trim()}`);
    lines.push(`Who would use this: ${form.teamUsers.trim()}`);
    if (form.mustHaveIntegrations.trim()) {
      lines.push(`Must-have integrations: ${form.mustHaveIntegrations.trim()}`);
    }
    if (form.budgetRange) lines.push(`Budget range: ${form.budgetRange}`);
    if (form.timeline) lines.push(`Timeline: ${form.timeline}`);
  } else {
    lines.push(form.problem.trim());
  }

  if (form.loomUrl.trim()) {
    lines.push(`Loom: ${form.loomUrl.trim()}`);
  }

  return lines.join('\n\n');
}

function submitLabel(inquiryType: InquiryLane): string {
  switch (inquiryType) {
    case 'workflow-automation':
      return 'Get a proposal';
    case 'custom-build':
      return 'Start scoping this';
    case 'unqualified':
      return 'Send it over';
    default:
      return 'Send it over';
  }
}

const fieldClass = (hasError?: boolean) =>
  `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
    hasError ? 'border-red-300' : 'border-gray-300'
  }`;

export default function ContactPage() {
  const searchParams = useSearchParams();
  const typeFromQuery = searchParams?.get('type') ?? null;
  const prefilledType: InquiryLane =
    typeFromQuery && INQUIRY_TYPE_FROM_QUERY[typeFromQuery]
      ? INQUIRY_TYPE_FROM_QUERY[typeFromQuery]
      : '';
  const hasPrefill = Boolean(prefilledType);

  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    inquiryType: prefilledType,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (prefilledType) {
      setFormData((prev) =>
        prev.inquiryType === prefilledType
          ? prev
          : { ...prev, inquiryType: prefilledType }
      );
    }
  }, [prefilledType]);

  const inquiryType = formData.inquiryType;
  const showBranchFields = Boolean(inquiryType);

  const validateForm = () => {
    const next: Record<string, string> = {};

    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) next.company = 'Company is required';
    if (!formData.companySize) next.companySize = 'Company size is required';
    if (!inquiryType) next.inquiryType = 'Please select what you\'re looking for';

    if (inquiryType === 'workflow-automation') {
      if (!formData.toolsNeeded.trim()) {
        next.toolsNeeded = 'Tell us which tools need to talk to each other';
      }
      if (!formData.processToday.trim()) {
        next.processToday = 'Describe what this process looks like today';
      }
      if (!formData.processFrequency) {
        next.processFrequency = 'How often does this run?';
      }
    }

    if (inquiryType === 'custom-build') {
      if (!formData.currentWorkaround.trim()) {
        next.currentWorkaround = 'Tell us about the current workaround';
      }
      if (!formData.teamUsers.trim()) {
        next.teamUsers = 'Who on your team would use this?';
      }
      if (!formData.budgetRange) {
        next.budgetRange = 'Budget range is required';
      }
    }

    if (inquiryType === 'unqualified') {
      if (!formData.problem.trim()) {
        next.problem = 'Tell us what problem you\'re trying to solve';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInquirySelect = (value: InquiryLane) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
    if (errors.inquiryType) {
      setErrors((prev) => ({ ...prev, inquiryType: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedType = formData.inquiryType;
    if (
      selectedType !== 'workflow-automation' &&
      selectedType !== 'custom-build' &&
      selectedType !== 'unqualified'
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { first_name, last_name } = splitName(formData.name);
      const result = await submitContactForm({
        first_name,
        last_name,
        email: formData.email.trim(),
        company: formData.company.trim(),
        company_size: formData.companySize || undefined,
        inquiry_type: selectedType,
        budget_range:
          selectedType === 'custom-build' && formData.budgetRange
            ? formData.budgetRange
            : undefined,
        how_heard: formData.howHeard || undefined,
        timeline: formData.timeline || undefined,
        process_frequency:
          selectedType === 'workflow-automation' && formData.processFrequency
            ? formData.processFrequency
            : undefined,
        tools_needed:
          selectedType === 'workflow-automation'
            ? formData.toolsNeeded.trim()
            : undefined,
        process_today:
          selectedType === 'workflow-automation'
            ? formData.processToday.trim()
            : undefined,
        current_workaround:
          selectedType === 'custom-build'
            ? formData.currentWorkaround.trim()
            : undefined,
        team_users:
          selectedType === 'custom-build' ? formData.teamUsers.trim() : undefined,
        must_have_integrations:
          selectedType === 'custom-build' && formData.mustHaveIntegrations.trim()
            ? formData.mustHaveIntegrations.trim()
            : undefined,
        loom_url: formData.loomUrl.trim() || undefined,
        message: buildMessage({ ...formData, inquiryType: selectedType }),
      });

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(
          `Got it. We'll reply within ${CONFIRMATION_SLA} with next steps.`
        );
        setFormData({
          ...emptyForm,
          inquiryType: hasPrefill ? selectedType : '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Tell us what you&apos;re trying to automate.
            </h1>
            <div className="text-lg text-gray-600 space-y-4 leading-relaxed">
              <p>We work with SMBs on two kinds of projects:</p>
              <ul className="space-y-2 pl-1">
                <li className="flex gap-2">
                  <span className="text-gray-900 shrink-0">→</span>
                  <span>
                    <strong className="text-gray-900">Workflow automation</strong> — wiring your
                    existing tools together to solve a specific problem
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-900 shrink-0">→</span>
                  <span>
                    <strong className="text-gray-900">Custom builds</strong> — designing and building
                    internal tools or dashboards when off-the-shelf isn&apos;t enough
                  </span>
                </li>
              </ul>
              <p>
                Tell us what you&apos;re working on and we&apos;ll get back to you within{' '}
                {CONFIRMATION_SLA}.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {submitStatus === 'success' && (
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
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-800">{submitMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!hasPrefill && (
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-3">
                    What are you looking for? *
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {INQUIRY_OPTIONS.map((option) => {
                      const selected = inquiryType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInquirySelect(option.value)}
                          disabled={isSubmitting}
                          className={`px-4 py-3 rounded-lg border text-sm font-semibold text-left transition-colors ${
                            selected
                              ? 'border-blue-500 bg-blue-50 text-gray-900'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.inquiryType && (
                    <p className="mt-2 text-sm text-red-600">{errors.inquiryType}</p>
                  )}
                </fieldset>
              )}

              {hasPrefill && inquiryType && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  Looking for:{' '}
                  <strong className="text-gray-900">
                    {INQUIRY_OPTIONS.find((o) => o.value === inquiryType)?.label}
                  </strong>
                </div>
              )}

              {showBranchFields && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={fieldClass(Boolean(errors.name))}
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={fieldClass(Boolean(errors.email))}
                      placeholder="you@company.com"
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={fieldClass(Boolean(errors.company))}
                        disabled={isSubmitting}
                        autoComplete="organization"
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="companySize"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company size *
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className={fieldClass(Boolean(errors.companySize))}
                        disabled={isSubmitting}
                      >
                        <option value="">Select company size</option>
                        {COMPANY_SIZES.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                      {errors.companySize && (
                        <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="howHeard"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      How&apos;d you hear about us?
                    </label>
                    <select
                      id="howHeard"
                      name="howHeard"
                      value={formData.howHeard}
                      onChange={handleInputChange}
                      className={fieldClass()}
                      disabled={isSubmitting}
                    >
                      <option value="">Select an option</option>
                      {HOW_HEARD.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {inquiryType === 'workflow-automation' && (
                    <>
                      <div>
                        <label
                          htmlFor="toolsNeeded"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Which tools need to talk to each other? *
                        </label>
                        <textarea
                          id="toolsNeeded"
                          name="toolsNeeded"
                          value={formData.toolsNeeded}
                          onChange={handleInputChange}
                          rows={3}
                          className={fieldClass(Boolean(errors.toolsNeeded))}
                          disabled={isSubmitting}
                        />
                        {errors.toolsNeeded && (
                          <p className="mt-1 text-sm text-red-600">{errors.toolsNeeded}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="processToday"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          What does this process look like today? *
                        </label>
                        <textarea
                          id="processToday"
                          name="processToday"
                          value={formData.processToday}
                          onChange={handleInputChange}
                          rows={4}
                          className={fieldClass(Boolean(errors.processToday))}
                          disabled={isSubmitting}
                        />
                        {errors.processToday && (
                          <p className="mt-1 text-sm text-red-600">{errors.processToday}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="processFrequency"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          How often does this run? *
                        </label>
                        <select
                          id="processFrequency"
                          name="processFrequency"
                          value={formData.processFrequency}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.processFrequency))}
                          disabled={isSubmitting}
                        >
                          <option value="">Select frequency</option>
                          {PROCESS_FREQUENCIES.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.processFrequency && (
                          <p className="mt-1 text-sm text-red-600">{errors.processFrequency}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className={fieldClass()}
                          disabled={isSubmitting}
                        >
                          <option value="">Select timeline</option>
                          {TIMELINES.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {inquiryType === 'custom-build' && (
                    <>
                      <div>
                        <label
                          htmlFor="currentWorkaround"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          What&apos;s the current workaround? *
                        </label>
                        <textarea
                          id="currentWorkaround"
                          name="currentWorkaround"
                          value={formData.currentWorkaround}
                          onChange={handleInputChange}
                          rows={4}
                          className={fieldClass(Boolean(errors.currentWorkaround))}
                          disabled={isSubmitting}
                        />
                        {errors.currentWorkaround && (
                          <p className="mt-1 text-sm text-red-600">{errors.currentWorkaround}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="teamUsers"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Who on your team would use this? *
                        </label>
                        <input
                          type="text"
                          id="teamUsers"
                          name="teamUsers"
                          value={formData.teamUsers}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.teamUsers))}
                          disabled={isSubmitting}
                        />
                        {errors.teamUsers && (
                          <p className="mt-1 text-sm text-red-600">{errors.teamUsers}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="mustHaveIntegrations"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Must-have integrations
                        </label>
                        <textarea
                          id="mustHaveIntegrations"
                          name="mustHaveIntegrations"
                          value={formData.mustHaveIntegrations}
                          onChange={handleInputChange}
                          rows={3}
                          className={fieldClass()}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="budgetRange"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Budget range *
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.budgetRange))}
                          disabled={isSubmitting}
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_RANGES.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.budgetRange && (
                          <p className="mt-1 text-sm text-red-600">{errors.budgetRange}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className={fieldClass()}
                          disabled={isSubmitting}
                        >
                          <option value="">Select timeline</option>
                          {TIMELINES.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {inquiryType === 'unqualified' && (
                    <div>
                      <label
                        htmlFor="problem"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        What&apos;s the problem you&apos;re trying to solve? *
                      </label>
                      <textarea
                        id="problem"
                        name="problem"
                        value={formData.problem}
                        onChange={handleInputChange}
                        rows={5}
                        className={fieldClass(Boolean(errors.problem))}
                        disabled={isSubmitting}
                      />
                      {errors.problem && (
                        <p className="mt-1 text-sm text-red-600">{errors.problem}</p>
                      )}
                    </div>
                  )}

                  {(inquiryType === 'workflow-automation' ||
                    inquiryType === 'custom-build') && (
                    <div>
                      <label
                        htmlFor="loomUrl"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Got a Loom of the mess?
                      </label>
                      <input
                        type="url"
                        id="loomUrl"
                        name="loomUrl"
                        value={formData.loomUrl}
                        onChange={handleInputChange}
                        className={fieldClass()}
                        placeholder="https://www.loom.com/share/..."
                        disabled={isSubmitting}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Optional, but the fastest way for us to understand what&apos;s actually going
                        on.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : submitLabel(inquiryType)}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
