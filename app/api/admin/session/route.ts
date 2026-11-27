import {json} from '../../../../lib/catalog';
import {requireAdmin} from '../../../../lib/admin-auth';

export async function GET(request:Request){try{const user=await requireAdmin(request);return json({user:{email:user.email}})}catch(e){if(e instanceof Response)return json({error:e.status===401?'Sign in to manage your catalogue.':'Only the website owner can manage this catalogue.'},e.status);return json({error:'Admin storage is temporarily unavailable.'},503)}}
