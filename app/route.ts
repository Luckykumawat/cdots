import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const html = readFileSync(join(process.cwd(), 'content', 'index.html'), 'utf8');
export function GET(){return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}})}
