import { NativeModules } from 'react-native';

const FastRSANativeModules = (NativeModules as NativeModulesDef).FastRsa;
const isDebuggingEnabled = typeof atob !== 'undefined';

typeof global.FastRSAEncodeText === 'undefined' &&
  !isDebuggingEnabled &&
  FastRSANativeModules.install();

export default class TextEncoder {
  get encoding(): string {
    return 'utf-8';
  }

  encode(input: string = ''): Uint8Array {
    if (typeof global.FastRSAEncodeText === 'function') {
      const result = global.FastRSAEncodeText(input, 'utf-8');
      return new Uint8Array(result);
    }
    const result = FastRSANativeModules.encodeText(input, 'utf-8');
    return new Uint8Array(result);
  }
}
