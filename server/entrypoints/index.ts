import { PORT } from '@/service/envValues';
import { init } from '../service/app';

void init().listen({ port: PORT, host: '0.0.0.0' });
