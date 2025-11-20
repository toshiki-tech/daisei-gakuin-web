import { redirect } from 'next/navigation'

export default async function CoursesPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  // Redirect to courses index page
  redirect(`/${locale}/courses/index`)
}

