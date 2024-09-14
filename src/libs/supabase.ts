import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_URL_BACKEND;
const supabaseKey = import.meta.env.VITE_DB_CONNECTION_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        params: {
            eventsPerSecond: 20
        }
    }
});