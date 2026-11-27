import { readCatalog,json } from '../../../lib/catalog';
export async function GET(){try{const data=await readCatalog();return json({items:data.items.filter(p=>p.published).sort((a,b)=>a.sortOrder-b.sortOrder),revision:data.revision})}catch{ return json({error:'The catalogue could not load. Please try again.'},503)}}
