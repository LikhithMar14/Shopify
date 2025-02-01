
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="text-center md:text-left space-y-2">
            <p className="text-lg font-semibold">
              © {currentYear} {APP_NAME}
            </p>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for all things related to products and shopping.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right Section (Social Media Icons) */}
          <div className="flex justify-center gap-6">
            <Link 
              href="https://www.facebook.com" 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.twitter.com" 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.instagram.com" 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com" 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;