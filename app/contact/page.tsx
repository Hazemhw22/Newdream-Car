"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(2, { message: "השם חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "אנא הזן כתובת אימייל תקינה" }),
  phone: z.string().min(9, { message: "אנא הזן מספר טלפון תקין" }),
  subject: z.string().min(1, { message: "אנא בחר נושא" }),
  message: z.string().min(10, { message: "ההודעה חייבת להכיל לפחות 10 תווים" }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitted(true)
    // In a real app, you would send the form data to your server here
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-cyan-600 to-cyan-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/Used-Cars-Feature1024x301.jpg?height=400&width=1200"
            alt="Contact us background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white text-cyan-700 mb-6 px-4 py-1 text-sm">אנחנו כאן בשבילך</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">צור קשר</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              יש לך שאלות? אנחנו כאן כדי לעזור. צוות שירות הלקוחות שלנו זמין לענות על כל שאלה ולסייע בכל צורך.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle>כתובת</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">רחוב הרכב 123, חורה, ישראל</p>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="text-cyan-600 dark:text-cyan-400 text-sm mt-2 inline-block hover:underline"
                >
                  הצג במפה
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle>טלפון</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">+972 (50) 123-4567</p>
                <p className="text-gray-600 dark:text-gray-400">+972 (8) 765-4321</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>אימייל</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">info@newdreamcar.co.il</p>
                <p className="text-gray-600 dark:text-gray-400">support@newdreamcar.co.il</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle>שעות פעילות</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">א&lsquo;-ה&apos;: 9:00 - 19:00</p>
                <p className="text-gray-600 dark:text-gray-400">ו&apos;: 9:00 - 14:00</p>
                <p className="text-gray-600 dark:text-gray-400">שבת: סגור</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">שלח לנו הודעה</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  מלא את הטופס להלן ואנו נחזור אליך בהקדם האפשרי. אנו מתחייבים להגיב לכל פניה תוך 24 שעות.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mb-4">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">תודה על פנייתך!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        קיבלנו את הודעתך ונחזור אליך בהקדם האפשרי.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>שלח הודעה נוספת</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>שם מלא</FormLabel>
                                <FormControl>
                                  <Input placeholder="הזן את שמך המלא" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>אימייל</FormLabel>
                                <FormControl>
                                  <Input placeholder="הזן את כתובת האימייל שלך" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>טלפון</FormLabel>
                              <FormControl>
                                <Input placeholder="הזן את מספר הטלפון שלך" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>נושא הפנייה</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="purchase" />
                                    </FormControl>
                                    <FormLabel className="font-normal mr-2">רכישת רכב</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="leasing" />
                                    </FormControl>
                                    <FormLabel className="font-normal mr-2">ליסינג</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="service" />
                                    </FormControl>
                                    <FormLabel className="font-normal mr-2">שירות לקוחות</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="other" />
                                    </FormControl>
                                    <FormLabel className="font-normal mr-2">אחר</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>הודעה</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="כתוב את הודעתך כאן..."
                                  className="resize-none min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          שלח הודעה
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map and Social Media */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <h2 className="text-3xl font-bold mb-4">המיקום שלנו</h2>
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/huramap.png?height=400&width=600&text=Google+Map"
                    alt="מפת מיקום"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-3xl font-bold mb-4">עקבו אחרינו</h2>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 mb-4">שאלות נפוצות</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">יש לך שאלות?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              אלו השאלות הנפוצות ביותר שאנו מקבלים. אם לא מצאת תשובה לשאלתך, אל תהסס לפנות אלינו.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>מהם תנאי המימון שאתם מציעים?</AccordionTrigger>
                <AccordionContent>
                  אנו מציעים מגוון אפשרויות מימון עם ריביות אטרקטיביות ותנאים גמישים. התנאים משתנים בהתאם לסוג הרכב,
                  גילו, מחירו והיסטוריית האשראי שלך. צוות המימון שלנו ישמח לעזור לך למצוא את האפשרות המתאימה ביותר
                  עבורך.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>האם אתם מציעים אחריות על רכבים משומשים?</AccordionTrigger>
                <AccordionContent>
                  כן, אנו מציעים אחריות על כל הרכבים המשומשים שלנו. תקופת האחריות משתנה בהתאם לגיל הרכב ומצבו, אך בדרך
                  כלל היא נעה בין 6 ל-12 חודשים. האחריות מכסה תקלות מכניות ואלקטרוניות עיקריות.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>כיצד אוכל לקבוע נסיעת מבחן?</AccordionTrigger>
                <AccordionContent>
                  ניתן לקבוע נסיעת מבחן בקלות דרך אתר האינטרנט שלנו, בטלפון או בביקור במגרש המכוניות שלנו. אנו ממליצים
                  לתאם מראש כדי להבטיח שהרכב שמעניין אותך יהיה זמין. נסיעות המבחן בדרך כלל נמשכות כ-30 דקות.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>האם אתם מקבלים רכבים בטרייד-אין?</AccordionTrigger>
                <AccordionContent>
                  כן, אנו מקבלים רכבים בטרייד-אין. אנו מציעים הערכה הוגנת לרכב הישן שלך בהתבסס על מצבו, גילו,
                  הקילומטראז&apos; וערך השוק הנוכחי. ההערכה ניתנת ללא התחייבות וניתן להשתמש בערך הרכב כחלק מהתשלום עבור הרכב
                  החדש.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>מהו תהליך הרכישה אצלכם?</AccordionTrigger>
                <AccordionContent>
                  תהליך הרכישה שלנו פשוט ושקוף. לאחר שבחרת רכב ואולי ערכת נסיעת מבחן, הצוות שלנו יעבור איתך על כל
                  האפשרויות הזמינות, כולל מימון וביטוח. לאחר שהגעת להחלטה, אנו מטפלים בכל העבודה הניירת הנדרשת ומסייעים
                  בהעברת הבעלות. בדרך כלל, ניתן להשלים את התהליך תוך יום או יומיים.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

     {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-cyan-800 text-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים לצעד הבא?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            בין אם אתם מחפשים רכב חדש, רכב משומש או אפשרויות מימון, אנחנו כאן כדי לעזור. צרו קשר עוד היום ונשמח לענות על כל שאלה.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-cyan-700 hover:bg-gray-100 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-700"
            >
              <Phone className="mr-2 h-5 w-5" /> התקשר עכשיו
            </Button>
            <Button
              size="lg"
              className="bg-white text-cyan-700  hover:bg-gray-100 border-white dark:bg-black dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-800"
            >
              <Mail className="mr-2 h-5 w-5" /> שלח אימייל
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
