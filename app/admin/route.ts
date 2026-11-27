import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const html = readFileSync(join(process.cwd(), 'content', 'admin.html'), 'utf8');
import { requireAdmin } from '../../lib/admin-auth';
export async function GET(request:Request){try{await requireAdmin(request)}catch(e){if(e instanceof Response)return e;return new Response('Admin login is not configured.',{status:503})}return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Frame-Options':'SAMEORIGIN'}})}
