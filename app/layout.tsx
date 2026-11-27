import type { Metadata } from 'next';
export const metadata:Metadata={title:'NexaWorks',description:'Apps, websites and software by Lokesh Kumawat.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
