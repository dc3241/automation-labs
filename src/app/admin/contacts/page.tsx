'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchContactSubmissions, updateContactSubmissionStatus } from '../../../../utils/data';
import { ContactSubmission } from '../../../../utils/supabase';

const INQUIRY_FILTERS = [
  { value: 'all', label: 'All types' },
  { value: 'workflow-automation', label: 'Workflow automation' },
  { value: 'custom-build', label: 'Custom build' },
  { value: 'unqualified', label: 'Not sure yet' },
  { value: 'brand-deal', label: 'Brand deal' },
  { value: 'other', label: 'Other' },
] as const;

const COMPANY_SIZE_FILTERS = [
  { value: 'all', label: 'All sizes' },
  { value: '1-9', label: '1–9' },
  { value: '10-49', label: '10–49' },
  { value: '50-200', label: '50–200' },
  { value: '200+', label: '200+' },
  { value: '1-10', label: '1–10 (legacy)' },
  { value: '11-50', label: '11–50 (legacy)' },
  { value: '51-200', label: '51–200 (legacy)' },
] as const;

const BUDGET_FILTERS = [
  { value: 'all', label: 'All budgets' },
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5k-15k', label: '$5k–15k' },
  { value: '15k-25k', label: '$15k–25k' },
  { value: '25k-plus', label: '$25k+' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export default function AdminContacts() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [companySizeFilter, setCompanySizeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await fetchContactSubmissions();
      setSubmissions(data);
    } catch {
      setError('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      if (inquiryFilter !== 'all' && submission.inquiry_type !== inquiryFilter) {
        return false;
      }
      if (companySizeFilter !== 'all' && submission.company_size !== companySizeFilter) {
        return false;
      }
      if (budgetFilter !== 'all' && submission.budget_range !== budgetFilter) {
        return false;
      }
      return true;
    });
  }, [submissions, inquiryFilter, companySizeFilter, budgetFilter]);

  const handleStatusUpdate = async (id: number, newStatus: ContactSubmission['status']) => {
    try {
      setUpdatingId(id);
      const result = await updateContactSubmissionStatus(id, newStatus);

      if (result.success) {
        setSubmissions((prev) =>
          prev.map((submission) =>
            submission.id === id
              ? { ...submission, status: newStatus, updated_at: new Date().toISOString() }
              : submission
          )
        );
      } else {
        alert('Failed to update status: ' + result.error);
      }
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getInquiryLabel = (type?: string) => {
    switch (type) {
      case 'workflow-automation':
        return 'Workflow automation';
      case 'custom-build':
        return 'Custom build';
      case 'unqualified':
        return 'Not sure yet';
      case 'brand-deal':
        return 'Brand deal / sponsorship';
      case 'other':
        return 'Something else';
      default:
        return type || '—';
    }
  };

  const getBudgetLabel = (value?: string) => {
    switch (value) {
      case 'under-5k':
        return 'Under $5k';
      case '5k-15k':
        return '$5k–15k';
      case '15k-25k':
        return '$15k–25k';
      case '25k-plus':
        return '$25k+';
      case 'not-sure':
        return 'Not sure yet';
      default:
        return value || '—';
    }
  };

  const getHowHeardLabel = (value?: string) => {
    switch (value) {
      case 'newsletter':
        return 'Newsletter';
      case 'social':
        return 'Social';
      case 'referral':
        return 'Referral';
      case 'search':
        return 'Search';
      case 'other':
        return 'Other';
      default:
        return value || '—';
    }
  };

  const getTimelineLabel = (value?: string) => {
    switch (value) {
      case 'asap':
        return 'ASAP';
      case 'within-month':
        return 'Within a month';
      case 'exploring':
        return 'Just exploring';
      default:
        return value || '—';
    }
  };

  const getFrequencyLabel = (value?: string) => {
    switch (value) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'as-needed':
        return 'As-needed';
      default:
        return value || '—';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={loadSubmissions}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Submissions</h1>
          <p className="text-gray-600">Manage and respond to contact form submissions</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="inquiryFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Inquiry type
            </label>
            <select
              id="inquiryFilter"
              value={inquiryFilter}
              onChange={(e) => setInquiryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {INQUIRY_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="companySizeFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company size
            </label>
            <select
              id="companySizeFilter"
              value={companySizeFilter}
              onChange={(e) => setCompanySizeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {COMPANY_SIZE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budgetFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Budget range
            </label>
            <select
              id="budgetFilter"
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {BUDGET_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">
              Contact form submissions will appear here once users start submitting the form.
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching submissions</h3>
            <p className="text-gray-600">Try clearing or changing the filters above.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </p>
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {[submission.first_name, submission.last_name].filter(Boolean).join(' ')}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}
                      >
                        {submission.status}
                      </span>
                      {submission.inquiry_type && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-800">
                          {getInquiryLabel(submission.inquiry_type)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-gray-900">{submission.email}</p>
                      </div>
                      {submission.company && (
                        <div>
                          <p className="text-sm text-gray-600">Company</p>
                          <p className="text-gray-900">{submission.company}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Company size</p>
                        <p className="text-gray-900 font-medium">
                          {submission.company_size || '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Budget range</p>
                        <p className="text-gray-900 font-medium">
                          {getBudgetLabel(submission.budget_range)}
                        </p>
                      </div>
                      {submission.how_heard && (
                        <div>
                          <p className="text-sm text-gray-600">How they heard</p>
                          <p className="text-gray-900">{getHowHeardLabel(submission.how_heard)}</p>
                        </div>
                      )}
                      {submission.timeline && (
                        <div>
                          <p className="text-sm text-gray-600">Timeline</p>
                          <p className="text-gray-900">{getTimelineLabel(submission.timeline)}</p>
                        </div>
                      )}
                      {submission.process_frequency && (
                        <div>
                          <p className="text-sm text-gray-600">Process frequency</p>
                          <p className="text-gray-900">
                            {getFrequencyLabel(submission.process_frequency)}
                          </p>
                        </div>
                      )}
                      {submission.team_users && (
                        <div>
                          <p className="text-sm text-gray-600">Who would use this</p>
                          <p className="text-gray-900">{submission.team_users}</p>
                        </div>
                      )}
                    </div>

                    {submission.tools_needed && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Tools to connect</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{submission.tools_needed}</p>
                        </div>
                      </div>
                    )}

                    {submission.process_today && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Process today</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{submission.process_today}</p>
                        </div>
                      </div>
                    )}

                    {submission.current_workaround && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Current workaround</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">
                            {submission.current_workaround}
                          </p>
                        </div>
                      </div>
                    )}

                    {submission.must_have_integrations && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Must-have integrations</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">
                            {submission.must_have_integrations}
                          </p>
                        </div>
                      </div>
                    )}

                    {submission.loom_url && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Loom</p>
                        <a
                          href={submission.loom_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 break-all"
                        >
                          {submission.loom_url}
                        </a>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Full message</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">{submission.message}</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      Submitted: {formatDate(submission.created_at)}
                      {submission.updated_at !== submission.created_at && (
                        <span className="ml-4">Updated: {formatDate(submission.updated_at)}</span>
                      )}
                    </div>
                  </div>

                  <div className="lg:flex-shrink-0">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Update Status:</label>
                      <select
                        value={submission.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            submission.id,
                            e.target.value as ContactSubmission['status']
                          )
                        }
                        disabled={updatingId === submission.id}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                      {updatingId === submission.id && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          Updating...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
