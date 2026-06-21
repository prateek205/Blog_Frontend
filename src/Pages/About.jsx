import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About <span className="text-blue-500">BlogHub</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
          BlogHub is a platform where writers, developers, designers, and
          creators can share their knowledge, experiences, and ideas with
          readers worldwide. Our mission is to make learning and storytelling
          accessible to everyone.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">
              Our Mission
            </h2>

            <p className="text-gray-300 leading-relaxed">
              To empower creators and readers by providing a simple and modern
              platform for publishing, discovering, and engaging with valuable
              content from around the world.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">
              Our Vision
            </h2>

            <p className="text-gray-300 leading-relaxed">
              To build a global community where knowledge is shared freely,
              creativity is celebrated, and every voice has the opportunity to
              inspire others.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold mb-3">Easy Publishing</h3>
            <p className="text-gray-300">
              Create and publish blogs effortlessly with a clean writing
              experience.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">🌎</div>
            <h3 className="text-xl font-semibold mb-3">Global Audience</h3>
            <p className="text-gray-300">
              Reach readers worldwide and share your knowledge with the
              community.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Modern Platform</h3>
            <p className="text-gray-300">
              Built with modern technologies for speed, security, and seamless
              user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-500">500+</h3>
            <p className="text-gray-300 mt-2">Blogs Published</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-500">200+</h3>
            <p className="text-gray-300 mt-2">Writers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-500">50K+</h3>
            <p className="text-gray-300 mt-2">Readers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-500">100K+</h3>
            <p className="text-gray-300 mt-2">Views</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10">
          <h2 className="text-4xl font-bold mb-4">
            Start Your Blogging Journey Today
          </h2>

          <p className="text-gray-300 mb-8">
            Join our growing community of writers and readers. Share your
            stories, ideas, and expertise with the world.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
