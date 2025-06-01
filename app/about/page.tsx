import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Award, Users, Building, History, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-cyan-600 to-cyan-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Car showroom"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white text-cyan-700 mb-6 px-4 py-1 text-sm">מאז 2010</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">אודות ניו דרים קאר</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              אנחנו מחויבים לספק את חווית הרכב הטובה ביותר בישראל, עם מבחר רחב של רכבים חדשים ומשומשים באיכות גבוהה
              ושירות לקוחות מעולה.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100">
                צור קשר
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                הרכבים שלנו
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">+5,000</div>
              <div className="text-gray-600 dark:text-gray-300">רכבים שנמכרו</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">+10</div>
              <div className="text-gray-600 dark:text-gray-300">שנות ניסיון</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">+20</div>
              <div className="text-gray-600 dark:text-gray-300">מותגי רכב</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-300">לקוחות מרוצים</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 mb-4">הסיפור שלנו</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">מי אנחנו</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              ניו דרים קאר נוסדה בשנת 2010 מתוך תשוקה לרכבים ומחויבות לשירות לקוחות יוצא דופן. מאז, הפכנו לאחד מסוכנויות
              הרכב המובילות בישראל.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="ניו דרים קאר showroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 text-right">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">החזון שלנו</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    להיות הבחירה הראשונה של לקוחות בישראל כשמדובר ברכישת רכב, על ידי הצעת מבחר רחב, מחירים הוגנים ושירות
                    מעולה.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">המשימה שלנו</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    לספק ללקוחותינו את חווית הרכישה הטובה ביותר, עם שקיפות מלאה, יושרה ושירות אישי המותאם לצרכים של כל
                    לקוח.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">הערכים שלנו</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    אנו מאמינים ביושרה, שקיפות, מקצועיות, שירות אישי ומחויבות ארוכת טווח ללקוחותינו גם לאחר הרכישה.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                    <Heart className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 mb-4">השירותים שלנו</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">מה אנחנו מציעים</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              אנו מציעים מגוון רחב של שירותים כדי לענות על כל צרכי הרכב שלכם, מרכישה ועד תחזוקה.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <Building className="h-6 w-6" />
                </div>
                <CardTitle>רכבים חדשים</CardTitle>
                <CardDescription>מבחר רחב של רכבים חדשים ממיטב היצרנים</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["מבחר דגמים עדכניים", "אחריות יצרן מלאה", "אפשרויות מימון גמישות", "מחירים תחרותיים"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <History className="h-6 w-6" />
                </div>
                <CardTitle>רכבים משומשים</CardTitle>
                <CardDescription>רכבים משומשים באיכות גבוהה עם היסטוריה מלאה</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["בדיקת איכות קפדנית", "היסטוריית רכב מלאה", "אחריות על רכבים משומשים", "מבחר רחב של דגמים"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle>שירותי מימון וליסינג</CardTitle>
                <CardDescription>פתרונות מימון וליסינג מותאמים אישית</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["תנאי מימון אטרקטיביים", "ליסינג פרטי ועסקי", "תהליך אישור מהיר", "ייעוץ פיננסי מקצועי"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 mb-4">הצוות שלנו</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">הכירו את המומחים שלנו</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              הצוות המקצועי שלנו מורכב ממומחי רכב עם שנים של ניסיון בתעשייה, מחויבים לספק לכם את השירות הטוב ביותר.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "דוד כהן",
                role: "מנכ״ל",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "מיכל לוי",
                role: "מנהלת מכירות",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "יוסי אברהם",
                role: "יועץ מימון",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "רונית גולן",
                role: "שירות לקוחות",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 mb-4">המלצות</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">מה הלקוחות שלנו אומרים</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              אלפי לקוחות מרוצים בחרו בנו לאורך השנים. הנה מה שחלקם אומרים על החוויה שלהם עם ניו דרים קאר.
            </p>
          </div>

          <Tabs defaultValue="testimonial-1" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="testimonial-1">אורי</TabsTrigger>
              <TabsTrigger value="testimonial-2">שירה</TabsTrigger>
              <TabsTrigger value="testimonial-3">יעקב</TabsTrigger>
            </TabsList>
            <div className="relative">
              <TabsContent value="testimonial-1">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="אורי ישראלי"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <p className="text-lg md:text-xl italic mb-4">
                          &quot;חוויית הקנייה בניו דרים קאר הייתה מעולה. הצוות היה מקצועי, סבלני וענה על כל השאלות שלי. הרכב
                          שקניתי עונה בדיוק על הצרכים שלי והמחיר היה הוגן. ממליץ בחום!&quot;
                        </p>
                        <div>
                          <h4 className="font-bold">אורי ישראלי</h4>
                          <p className="text-gray-600 dark:text-gray-400">קנה טויוטה קורולה</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="testimonial-2">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="שירה כהן"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <p className="text-lg md:text-xl italic mb-4">
                          &quot;תהליך הליסינג היה פשוט וקל. קיבלתי הסבר מפורט על כל האפשרויות והצוות עזר לי למצוא את העסקה
                          המשתלמת ביותר עבורי. שירות מעולה ויחס אישי!&quot;
                        </p>
                        <div>
                          <h4 className="font-bold">שירה כהן</h4>
                          <p className="text-gray-600 dark:text-gray-400">ליסינג יונדאי טוסון</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="testimonial-3">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="יעקב לוי"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <p className="text-lg md:text-xl italic mb-4">
                          &quot;זו הפעם השנייה שאני קונה רכב בניו דרים קאר, והפעם הייתה טובה כמו הראשונה. אני מעריך את היושרה
                          והשקיפות שלהם. גם השירות לאחר המכירה מצוין!&quot;
                        </p>
                        <div>
                          <h4 className="font-bold">יעקב לוי</h4>
                          <p className="text-gray-600 dark:text-gray-400">קנה קיה ספורטאז&apos;</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים למצוא את הרכב המושלם?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            צוות המומחים שלנו מוכן לעזור לכם למצוא את הרכב המתאים לצרכים ולתקציב שלכם. צרו קשר עוד היום!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100">
              צור קשר
            </Button>
            <Button size="lg" className="text-cyan-700 border-white hover:bg-gray-100">
              הרכבים שלנו
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
