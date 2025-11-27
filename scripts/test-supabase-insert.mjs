// Simple standalone script to test inserting a row into Supabase using service_role key
// Run with:
//   npm run test:supabase-insert
// Ensure that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your environment (e.g. .env file)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('Missing Supabase URL. Please set SUPABASE_URL in your .env file.')
  process.exit(1)
}

if (!serviceRoleKey) {
  console.error('Missing service role key. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file.')
  process.exit(1)
}

console.log('Using Supabase URL:', supabaseUrl)
console.log('Using service role key from env:', Boolean(serviceRoleKey))

// Use service_role key as required
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  // Dummy test data, structure matches `app/api/free-trial/route.ts`
  const insertData = {
    name: 'Test User (script)',
    email: 'test-script@example.com',
    phone: '000-0000-0000',
    preferred_time_1: '10:00',
    preferred_time_2: '11:00',
    interested_courses: ['chineseAdults', 'hsk'],
    chinese_experience: true,
    learning_period: '3months',
    visited_china: true,
    china_visit_count: '1',
    learning_purpose: 'Testing Supabase insertion from local script.',
    privacy_agreed: true,
    status: 'pending',
  }

  console.log('Trying to insert test row into table `dcxy_free_trial_applications`...')
  console.log('Payload:', insertData)

  const { data, error } = await supabase
    .from('dcxy_free_trial_applications')
    .insert([insertData])
    .select()

  if (error) {
    console.error('--- Supabase insert FAILED ---')
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)
    console.error('Error details:', error.details)
    console.error('Error hint:', error.hint)
    process.exitCode = 1
    return
  }

  console.log('--- Supabase insert SUCCESS ---')
  console.log('Inserted rows:', data)
}

main().catch((err) => {
  console.error('Unexpected error while running test script:', err)
  process.exitCode = 1
})


