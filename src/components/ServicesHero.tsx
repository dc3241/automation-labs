'use client';

export default function ServicesHero() {
  const scrollToApply = () => {
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            We don&apos;t connect tools.
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-500 mb-6 sm:mb-8">
            We build automations that run your ops.
          </h2>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto px-1 sm:px-0">
          Custom-coded automation systems for ecommerce brands. No Make.com. No
          monthly middleware. You own it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            Apply for a build →
          </button>
        </div>
      </div>
    </section>
  );
}
