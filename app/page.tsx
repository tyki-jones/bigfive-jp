import { supabase } from './lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('questions').select('*')

  return (
    <main>
      <h1>Connection Test</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Connected to Supabase! Questions in database: {data?.length ?? 0}</p>
      )}
    </main>
  )
}