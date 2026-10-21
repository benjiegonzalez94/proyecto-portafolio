/**
 * Script para automatizar la ejecución de la migración de analíticas en Supabase
 * usando la Management API (requiere SUPABASE_ACCESS_TOKEN y SUPABASE_PROJECT_REF).
 */
import fs from 'node:fs';
import path from 'node:path';

async function runMigration() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const projectRef = process.env.SUPABASE_PROJECT_REF || 'zkohdxyhytvtneijfbyd';

  if (!token) {
    console.error('Error: Debes definir SUPABASE_ACCESS_TOKEN.');
    console.log('Obtén tu token personal en: https://supabase.com/dashboard/account/tokens');
    process.exit(1);
  }

  const sqlPath = path.resolve('supabase/migrations/20261021_portfolio_analytics.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  console.log(`Aplicando migración de analíticas en el proyecto ${projectRef}...`);

  const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sqlContent }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error ejecutando migración:', errorText);
    process.exit(1);
  }

  const result = await response.json();
  console.log('✓ Migración de analíticas aplicada con éxito:', result);
}

runMigration().catch((err) => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
