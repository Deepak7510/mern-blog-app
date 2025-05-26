import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  routeUserAbout,
  routeUserContact,
  RouteUserIndexBlogs,
} from "@/helpers/route";
import AppLogo from "@/components/common/AppLogo";

export default function UserFooter() {
  return (
    <footer className="py-6 mt-10 bg-neutral-100 dark:bg-neutral-950 border-t border-gray-200 dark:border-gray-800">
      <div className="px-6 md:px-20 grid md:grid-cols-3 sm:grid-cols-2 gap-6 md:gap-20">
        {/* Branding */}
        <div>
          <Link to={"/user/index-blogs"}>
            <AppLogo />
          </Link>
          <p className="text-sm font-medium mt-2 leading-relaxed">
            Learn Web helps you master modern web development through hands-on
            training and real-world projects. Gain practical skills in HTML,
            CSS, JavaScript, and more with expert-led courses. Learn at your own
            pace, build portfolio-worthy projects, and join thousands of
            learners transforming their careers with industry-ready knowledge.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <Link to={RouteUserIndexBlogs}>Home</Link>
            </li>
            <li>
              <Link to={routeUserAbout}>About</Link>
            </li>
            <li>
              <Link to={routeUserContact}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="font-medium">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm mb-2">Email: deepakkumaryadav75100@gmail.com</p>
          <p className="text-sm mb-2">Phone: +91 7510064500</p>
          <p className="text-sm">Address: Balrampur, India</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 text-center">
        <div className="flex justify-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Youtube className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Separator className="my-7 bg-gray-700" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Learn Web. All rights reserved.
      </p>
    </footer>
  );
}
