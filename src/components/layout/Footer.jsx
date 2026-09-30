import { Mail, ShieldCheck, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-slate-700 bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2">
                <ShieldCheck
                  size={28}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Smart Security System
                </h2>

                <p className="text-sm text-slate-400">
                  AI Powered Monitoring
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Enterprise level security monitoring platform with AI based
              face recognition, activity tracking, intrusion detection and
              real-time alerts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="/dashboard" className="transition hover:text-cyan-400">
                  Dashboard
                </a>
              </li>

              <li>
                <a href="/activity" className="transition hover:text-cyan-400">
                  Activity Logs
                </a>
              </li>

              <li>
                <a href="/reports" className="transition hover:text-cyan-400">
                  Reports
                </a>
              </li>

              <li>
                <a href="/settings" className="transition hover:text-cyan-400">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-3">
              <a
                href="mailto:support@smartsecurity.com"
                className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400"
              >
                <Mail size={18} />
                support@smartsecurity.com
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400"
              >
                <FaGithub size={18} />
                GitHub
              </a>

              <a
                href="#"
                className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-400"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-6 md:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} Smart Security System. All Rights Reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            Made with
            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />
            using React + Django
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;