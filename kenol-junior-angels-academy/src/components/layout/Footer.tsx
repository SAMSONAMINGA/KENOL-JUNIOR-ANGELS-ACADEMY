import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="Kenol Junior Angels Academy"
              width={200}
              height={45}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">
              A nurturing, CBC-aligned learning environment for PP1, PP2 & Grades 1–8.
              Strive To Excel, Sky is The Limit.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-white transition">Academics</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition">Admissions</Link></li>
              <li><Link href="/fees" className="hover:text-white transition">Fees</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Levels</h3>
            <ul className="space-y-2 text-sm">
              <li>Pre-Primary (PP1 & PP2)</li>
              <li>Lower Primary (Grade 1–3)</li>
              <li>Upper Primary (Grade 4–6)</li>
              <li>Junior Secondary (Grade 7–8)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Kenol Town, near Kenol Catholic Church</li>
              <li>P.O. Box 340 – 01020, Kenol</li>
              <li>
                <a href="tel:0723248400" className="hover:text-white transition">
                  0723 248 400
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Kenol Junior Angels Academy. All rights reserved.</p>
          <p className="text-gray-500">Motto: Strive To Excel, Sky is The Limit</p>
        </div>
      </div>
    </footer>
  );
}
