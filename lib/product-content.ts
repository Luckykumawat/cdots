import profiles from '../content/product-pages.json';
export type PageBlock={title:string;body:string};
export type ProductPage={headline:string;audience:string;benefits:PageBlock[];useCases:PageBlock[];steps:PageBlock[];faqs:PageBlock[]};
export function slugify(name:string){return name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90)}
export function enrichEntry<T extends {id:string;name:string;kind:string;description:string;details?:string;tagline?:string;slug?:string;page?:ProductPage}>(p:T):T&{slug:string;page:ProductPage}{
 const profile=(profiles as Record<string,{slug:string;page:ProductPage}>)[p.id];
 const fallback:ProductPage=p.kind==='website'?{
 headline:`${p.name}, brought to the web.`,audience:`Explore ${p.name}, a website project from the Dot Workspace collection.`,
 benefits:[{title:'A project with a clear purpose',body:p.description},{title:'Explore the experience',body:'Visit the linked website or project reference to see the design and experience in context.'}],
 useCases:[{title:'Explore this project',body:p.details||p.description},{title:'Plan a similar project',body:'If you are thinking about a website for your own business, contact Lokesh to discuss your goals and requirements.'}],
 steps:[{title:'Understand the project',body:'Read the overview and browse any available project images.'},{title:'Explore the website',body:'Use Visit website to open the linked website or project reference.'},{title:'Discuss your own idea',body:'Contact Lokesh if you would like to discuss a similar website or digital experience.'}],
 faqs:[{title:'Is this the website itself?',body:'This page introduces a portfolio project. Visit website opens the separate website or project reference.'},{title:'Can you build a similar website?',body:'Contact Lokesh to discuss the design, functionality and scope your own business needs.'}]
 }:{headline:p.tagline||p.name,audience:'Explore what this product does and decide whether it fits your needs.',benefits:[{title:'What it helps you do',body:p.description}],useCases:[],steps:[{title:'Learn about the product',body:p.details||p.description},{title:'Open the app',body:'Use the app link on this page, or contact Lokesh if access is not public.'}],faqs:[{title:'How do I access this product?',body:'Open the linked app to follow its current access process. If no public link is listed, use Ask about access.'}]};
 return {...p,slug:p.slug||profile?.slug||slugify(p.name)||p.id,page:p.page??profile?.page??fallback};
}
