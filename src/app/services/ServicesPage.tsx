import Link from 'next/link';

function WorkflowVisualPlaceholder() {
  return (
    <div
      className="aspect-[4/3] rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex flex-col justify-center"
      aria-hidden
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4">Example flow</p>
      <div className="flex flex-col gap-3">
        {['Trigger: New hire signed', 'Enrich + route to payroll', 'Notify IT + send welcome'].map(
          (step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1">
                {step}
              </span>
            </div>
          )
        )}
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Workflow diagram coming soon</p>
    </div>
  );
}

function DashboardVisualPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="aspect-[16/10] rounded-lg border border-gray-200 bg-gradient-to-br from-slate-800 to-slate-900 p-4 flex flex-col"
      role="img"
      aria-label={`${title} preview placeholder`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
      </div>
      <p className="text-white font-semibold text-sm mb-1">{title}</p>
      <p className="text-slate-400 text-xs mb-4">{subtitle}</p>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-slate-700/60 rounded-md h-full min-h-[48px]" />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The automation work, done by someone who&apos;s done it before.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10">
            We help SMB teams across HR, Sales, Marketing, Operations, Finance, and
            Customer Service automate the work that&apos;s eating their week. Two ways
            we do that — workflow automation and custom builds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=workflow"
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-center"
            >
              Start a workflow project
            </Link>
            <Link
              href="/contact?type=build"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              Start a custom build
            </Link>
          </div>
        </div>
      </section>

      {/* Three-tier overview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three ways we help you automate.
            </h2>
            <p className="text-lg text-gray-600">Pick the tier that matches the problem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col">
              <span className="text-3xl mb-4" aria-hidden>🔍</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Tools</h3>
              <p className="text-gray-600 mb-4">Free, hand-picked recommendations.</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">Free</p>
              <p className="text-sm text-gray-600 mb-6 flex-1">
                Best for: teams who want to figure out their own automation stack.
              </p>
              <p className="text-sm text-gray-500">Tools directory coming soon.</p>
            </div>

            <div className="bg-white rounded-lg border-2 border-blue-500 shadow-md p-8 flex flex-col relative">
              <span className="text-3xl mb-4" aria-hidden>⚙️</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Workflow Automation</h3>
              <p className="text-gray-600 mb-4">We wire your tools together to solve a specific problem.</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">Starting at $1,500 per project</p>
              <p className="text-sm text-gray-600 mb-6 flex-1">
                Best for: teams who know what they want automated but don&apos;t have time to build it.
              </p>
              <a href="#workflow-details" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                See how it works →
              </a>
            </div>

            <div className="bg-gray-900 text-white rounded-lg border border-gray-800 p-8 flex flex-col">
              <span className="text-3xl mb-4" aria-hidden>🏗️</span>
              <h3 className="text-xl font-semibold mb-2">Custom Builds</h3>
              <p className="text-gray-300 mb-4">Internal tools and dashboards built for how your team works.</p>
              <p className="text-lg font-semibold mb-4">Custom quote</p>
              <p className="text-sm text-gray-300 mb-6 flex-1">
                Best for: teams hitting the limits of off-the-shelf software.
              </p>
              <a href="#build-details" className="text-white font-semibold hover:text-gray-200 inline-flex items-center">
                See how it works →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Automation */}
      <section id="workflow-details" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                Workflow Automation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Wire your existing tools together to solve a real problem.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                You already pay for the tools. They just don&apos;t talk to each other. We
                build the connections — usually in Make.com, n8n, or Zapier — that turn
                five disconnected SaaS apps into one workflow that runs itself.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">What we typically build:</h3>
              <ul className="space-y-3 text-gray-600 mb-8 list-disc pl-5 leading-relaxed">
                <li>New-hire onboarding flows that move signed offers through IT, payroll, and welcome comms automatically</li>
                <li>Lead enrichment workflows that research every prospect before your team makes the first call</li>
                <li>Content repurposing pipelines that turn one video into ten platform-ready posts</li>
                <li>SOP generation from a single Loom recording — transcript, structure, and draft doc in under five minutes</li>
                <li>Invoice intake flows that pull from email, categorize, and post to your accounting tool</li>
                <li>Support ticket routing based on AI-classified urgency and topic</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works:</h3>
              <ol className="space-y-4 text-gray-600 mb-8 list-decimal pl-5 leading-relaxed">
                <li><strong className="text-gray-900">Discovery call (30 min, free)</strong> — You describe the workflow, we ask the questions that surface the gotchas.</li>
                <li><strong className="text-gray-900">Scoped proposal (within 2 business days)</strong> — Fixed price, fixed timeline, clear deliverable.</li>
                <li><strong className="text-gray-900">Build (typically 3-7 business days)</strong> — We build the workflow, test it on real data, and document it.</li>
                <li><strong className="text-gray-900">Handoff and 30-day support</strong> — Walkthrough call, written docs, and a month of free fixes if anything breaks.</li>
              </ol>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                <p className="text-xl font-semibold text-gray-900 mb-2">Starting at $1,500 per project</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Most projects land between $1,500 and $4,500 depending on complexity
                  and tool count. We give you a fixed price before any work begins.
                </p>
              </div>

              <Link
                href="/contact?type=workflow"
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Start a workflow project
              </Link>
            </div>

            <div className="lg:sticky lg:top-24">
              <WorkflowVisualPlaceholder />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Builds */}
      <section id="build-details" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="lg:order-1 order-2 lg:sticky lg:top-24">
              <div className="space-y-4">
                <DashboardVisualPlaceholder
                  title="Content Dashboard"
                  subtitle="Marketing command center"
                />
                <DashboardVisualPlaceholder
                  title="Revenue Tracking Dashboard"
                  subtitle="Multi-stream revenue visibility"
                />
              </div>
            </div>

            <div className="lg:order-2 order-1">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                Custom Builds
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                When off-the-shelf software doesn&apos;t fit, we build something that does.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Some problems can&apos;t be solved by connecting existing tools. The workflow
                your team actually runs doesn&apos;t match how any single SaaS product
                thinks. That&apos;s when we build something custom — a real internal tool
                designed around how you work, not how a vendor wants you to work.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">What we typically build:</h3>
              <ul className="space-y-3 text-gray-600 mb-8 list-disc pl-5 leading-relaxed">
                <li>Internal dashboards that pull from multiple tools into one view your team can act on</li>
                <li>Custom request portals — IT, HR, ops requests with status tracking and routing</li>
                <li>Departmental command centers — onboarding tracking, pipeline visibility, support insights</li>
                <li>AI-powered internal tools — chatbots trained on your docs, summarization tools, custom RAG systems</li>
                <li>Replacements for spreadsheet-driven processes that have outgrown spreadsheets</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works:</h3>
              <ol className="space-y-4 text-gray-600 mb-8 list-decimal pl-5 leading-relaxed">
                <li><strong className="text-gray-900">Discovery call (45 min, free)</strong> — We walk through the problem, the current workflow, and what success looks like.</li>
                <li><strong className="text-gray-900">Proposal and design brief (within 5 business days)</strong> — Scope, timeline, milestone-based pricing, and a design direction.</li>
                <li><strong className="text-gray-900">Build (typically 2-6 weeks)</strong> — Iterative milestones with check-ins. You see progress weekly, not at the end.</li>
                <li><strong className="text-gray-900">Launch and 60-day support</strong> — Deployment, team training, and two months of free fixes and tweaks.</li>
              </ol>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <p className="text-xl font-semibold text-gray-900 mb-2">Custom quote per project</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Custom builds are scoped individually. Most projects land between
                  $5,000 and $25,000 depending on complexity, integrations, and team size.
                  You get a clear quote before any work begins.
                </p>
              </div>

              <Link
                href="/contact?type=build"
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Start a custom build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fit check */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Is this a fit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-100 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">✓ This works well if you...</h3>
              <ul className="space-y-3 text-gray-700 list-disc pl-5 leading-relaxed">
                <li>Run an SMB or department of 10-200 people</li>
                <li>Know what&apos;s eating your team&apos;s time but don&apos;t have engineering bandwidth to fix it</li>
                <li>Want a fixed scope, fixed timeline, and a real human to talk to</li>
                <li>Already use SaaS tools and want to get more value from them</li>
                <li>Prefer &quot;built right&quot; over &quot;built fast&quot;</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">✗ This probably isn&apos;t a fit if you...</h3>
              <ul className="space-y-3 text-gray-700 list-disc pl-5 leading-relaxed">
                <li>Need enterprise-scale infrastructure or compliance work (HIPAA, SOC 2, regulated industries)</li>
                <li>Want someone to operate your tools for you long-term (we build, we don&apos;t run)</li>
                <li>Need work done in under 48 hours — quality work needs scope</li>
                <li>Don&apos;t have a clear problem to solve, just &quot;we should use AI somewhere&quot;</li>
                <li>Want the cheapest option — we&apos;re not it</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Recent builds.</h2>
            <p className="text-lg text-gray-600">
              A look at custom tools we&apos;ve shipped for real teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-100">
                <DashboardVisualPlaceholder
                  title="Content Dashboard"
                  subtitle="Marketing · Custom Build"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Marketing · Custom Build
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">Content Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  A centralized command center for social media teams managing
                  content across multiple platforms. Replaced three separate spreadsheets
                  and a scattered approval process with one tool the team actually uses.
                </p>
                <p className="text-sm text-gray-400 mt-4 italic">Case study coming soon</p>
              </div>
            </article>

            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-100">
                <DashboardVisualPlaceholder
                  title="Revenue Tracking Dashboard"
                  subtitle="Finance · Custom Build"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Finance · Custom Build
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">Revenue Tracking Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  A multi-stream revenue visibility tool tracking brand deals,
                  affiliate income, ad revenue, and service work in one view.
                  Built to replace a fragmented mess of platform dashboards.
                </p>
                <p className="text-sm text-gray-400 mt-4 italic">Case study coming soon</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
            Common questions.
          </h2>
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {[
              {
                q: 'How long does a typical project take?',
                a: 'Workflow projects typically run 3-7 business days from kickoff to handoff. Custom builds run 2-6 weeks depending on scope. We give you a specific timeline in your proposal — no "it\'ll be ready when it\'s ready."',
              },
              {
                q: 'What tools do you work with?',
                a: 'For workflows: Make.com, n8n, Zapier, plus direct API integrations when needed. For custom builds: modern web stacks (React, Next.js, Supabase, Postgres) and AI infrastructure (OpenAI, Claude, vector databases). If you\'re already using something specific, tell us — we\'ll work in your stack when it makes sense.',
              },
              {
                q: 'Do you offer ongoing support after the project ends?',
                a: 'Every workflow project includes 30 days of free support for fixes and adjustments. Every custom build includes 60 days. Beyond that, we offer monthly retainers for ongoing maintenance, feature additions, and new workflows — but you\'re not locked into anything.',
              },
              {
                q: 'Can you train my team to maintain what you build?',
                a: 'Yes. Every project ends with a handoff session where we walk your team through the workflow or tool, including how to make common changes. We also document everything in writing so the knowledge doesn\'t leave with us.',
              },
              {
                q: 'What if I\'m not sure what I need yet?',
                a: 'That\'s what the discovery call is for. Free, 30 minutes, no commitment. We\'ll talk through what\'s eating your team\'s time and figure out whether a workflow, a custom build, or something else entirely is the right move. Sometimes the answer is "you don\'t need us yet" — we\'ll tell you that too.',
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed pr-8">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to automate the work?</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Tell us what you&apos;re trying to fix. We&apos;ll get back to you within two
            business days — and if we&apos;re not the right fit, we&apos;ll say so.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
            >
              Get in touch
            </Link>
            <Link
              href="/newsletter"
              className="border border-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-200 text-center"
            >
              Read the newsletter first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
