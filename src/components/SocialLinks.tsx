import { Twitter, Linkedin, Github, Mail, BookOpen } from "lucide-react";

interface SocialLinksProps {
  links: {
    twitter: { url: string; label: string };
    linkedin: { url: string; label: string };
    github: { url: string; label: string };
    email: { url: string; label: string };
    blog: { url: string; label: string };
  };
  className?: string;
}

const SocialLinks = ({
  links,
  className = "flex justify-center space-x-6",
}: SocialLinksProps) => {
  return (
    <div className={className}>
      <a
        href={links.twitter.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={links.twitter.label}>
        <Twitter size={20} />
      </a>
      <a
        href={links.linkedin.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={links.linkedin.label}>
        <Linkedin size={20} />
      </a>
      <a
        href={links.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={links.github.label}>
        <Github size={20} />
      </a>
      <a
        href={links.email.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={links.email.label}>
        <Mail size={20} />
      </a>
      <a
        href={links.blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={links.blog.label}>
        <BookOpen size={20} />
      </a>
    </div>
  );
};

export default SocialLinks;
