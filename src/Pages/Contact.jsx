import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Contact <span className="text-blue-500">Us</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Have questions, suggestions, or feedback? We'd love to hear from you.
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-300">
                    Chhatrapati Sambhajinagar, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-300">prateekbahad@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-300">+91 94045 57931</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">🌐</div>
                <div>
                  <h3 className="font-semibold">Website</h3>
                  <p className="text-gray-300">www.bloghub.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-8">Send Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-2">
              How can I publish a blog?
            </h3>
            <p className="text-gray-300">
              Create an account, log in, and click on "Create Blog" from your
              dashboard.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-2">Is publishing free?</h3>
            <p className="text-gray-300">
              Yes, publishing blogs on our platform is completely free.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-2">
              Can I edit my blog after publishing?
            </h3>
            <p className="text-gray-300">
              Yes, you can update or delete your blogs anytime from your
              profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
