import type { NextConfig } from 'next';
const config: NextConfig = { outputFileTracingIncludes: { '/*': ['./content/**/*.html'] } };
export default config;
