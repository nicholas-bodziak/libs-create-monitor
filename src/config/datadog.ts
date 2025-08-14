// Configurações da API do Datadog
// Atenção: Não é recomendado expor chaves sensíveis no frontend. O ideal é usar uma Edge Function (Supabase) para proteger as chaves e evitar CORS.
// Para testes locais, você pode preencher abaixo, mas remova antes de publicar.

export const DATADOG_API_BASE = "https://api.datadoghq.com"; // ajuste para datadoghq.eu, us5.datadoghq.com, etc.
export const DATADOG_APP_BASE = "https://app.datadoghq.com";

// Preencha suas chaves APENAS em ambiente controlado
export const DATADOG_API_KEY = "5c3c6a4e8a324bb80986d28841a4046d"; // DD-API-KEY
export const DATADOG_APP_KEY = "2f42c3d32a881107cf95bed183f8a5ee443bca4e"; // DD-APPLICATION-KEY
