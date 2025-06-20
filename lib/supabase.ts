import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xyywtmzobhbiixsabgvc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eXd0bXpvYmhiaWl4c2FiZ3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTk5MjEsImV4cCI6MjA2NTk5NTkyMX0.nj3dzaveljcwVWopZ4qaV3N_4WxFMZVeRhQsjgeLZBg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})