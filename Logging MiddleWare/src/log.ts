import axios from 'axios';
import { VALID_STACKS, VALID_LEVELS, VALID_PACKAGES } from './constants';

const LOG_ENDPOINT = 'http://20.244.56.114/evaluation-service/logs';

export async function log(stack: string, level: string, pkg: string, message: string): Promise<void> {
  try {
    if (!VALID_STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!VALID_LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!VALID_PACKAGES.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

    const payload = {
      stack,
      level,
      package: pkg,
      message,
    };

    const response = await axios.post(LOG_ENDPOINT, payload);
    console.log('✅ Log created:', response.data.message);
  } catch (err: any) {
    console.error('❌ Logging failed:', err.message);
  }
}
