import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://yufpwelwdgedyheasjuz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZnB3ZWx3ZGdlZHloZWFzanV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODE2NzQsImV4cCI6MjA0Mzk1NzY3NH0.Z-7fB6GwB1wMgGnlZ9O5sewCM_h2HH8sYlZxBe8qS3Y';
export const supabase = createClient(supabaseUrl, supabaseKey);
