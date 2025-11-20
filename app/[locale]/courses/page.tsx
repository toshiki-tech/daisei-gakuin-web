import { redirect } from 'next/navigation'

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // Redirect to courses index page
  redirect(`/${locale}/courses/index`)
}

