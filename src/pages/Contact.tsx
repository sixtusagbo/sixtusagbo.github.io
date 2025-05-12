import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { socialLinks } from "../config/constants";
import { SocialLinks } from "../components";

function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold">Let's Connect</h1>
        <p className="text-gray-300">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
      </motion.div>

      <motion.div
        className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail size={24} className="text-blue-400" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a
                  href="mailto:miracleagbosixtus@gmail.com"
                  className="text-gray-300 hover:text-white">
                  miracleagbosixtus@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare size={24} className="text-purple-400" />
              <div>
                <h3 className="font-semibold">Social Media</h3>
                <SocialLinks links={socialLinks} className="flex gap-4 mt-2" />
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
