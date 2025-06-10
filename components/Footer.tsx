import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info - RTL */}
          <div>
            <h3 className="text-xl font-bold mb-4">אוטו שוקת</h3>
            <p className="text-gray-400 mb-4 text-right">
              מצא את הרכב המושלם עבורך עם פלטפורמת החיפוש המקיפה ביותר לרכבים.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - RTL */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2 text-right">
              <li>
                <Link href="/new-cars" className="text-gray-400 hover:text-white transition-colors">
                  רכבים חדשים
                </Link>
              </li>
              <li>
                <Link href="/used-cars" className="text-gray-400 hover:text-white transition-colors">
                  רכבים משומשים
                </Link>
              </li>
              <li>
                <Link href="/sell-car" className="text-gray-400 hover:text-white transition-colors">
                  מכר את הרכב שלך
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-white transition-colors">
                  השווה רכבים
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  חדשות רכב
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  אודותינו
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cars - RTL */}
          <div>
            <h3 className="text-lg font-semibold mb-4">רכבים פופולריים</h3>
            <ul className="space-y-2 text-right">
              <li>
                <Link href="/cars/tata-nexon" className="text-gray-400 hover:text-white transition-colors">
                  טאטא נקסון
                </Link>
              </li>
              <li>
                <Link href="/cars/maruti-baleno" className="text-gray-400 hover:text-white transition-colors">
                  מארוטי בלנו
                </Link>
              </li>
              <li>
                <Link href="/cars/hyundai-creta" className="text-gray-400 hover:text-white transition-colors">
                  יונדאי קרטה
                </Link>
              </li>
              <li>
                <Link href="/cars/mahindra-xuv700" className="text-gray-400 hover:text-white transition-colors">
                  מהינדרה XUV700
                </Link>
              </li>
              <li>
                <Link href="/cars/kia-seltos" className="text-gray-400 hover:text-white transition-colors">
                  קיה סלטוס
                </Link>
              </li>
              <li>
                <Link href="/cars/toyota-fortuner" className="text-gray-400 hover:text-white transition-colors">
                  טויוטה פורצ&apos;ונר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - RTL */}
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400 text-right">רחוב הרכב 123, עיר הרכב, 12345</span>
                <MapPin className="ml-2 h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">+972 (50) 123-4567</span>
                <Phone className="ml-2 h-5 w-5 text-gray-400" />
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">info@newdreamcar.co.il</span>
                <Mail className="ml-2 h-5 w-5 text-gray-400" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer - RTL */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 ניו דרים קאר. כל הזכויות שמורות.</p>
            <div className="flex space-x-reverse space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                תנאי שירות
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                מפת אתר
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
