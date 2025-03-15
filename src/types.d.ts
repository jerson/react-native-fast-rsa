/**
 * Contains all method available inside of `NativeModules`
 */
interface FastRSANativeModules {
  /**
   * this method use `NativeModules` in a more traditional way
   * using `JNI` on android in order to call shared a library.
   */
  call(name: string, payload: number[]): Promise<number[]>;

  encodeText(input: string, encoding: string): number[];
  decodeText(
    input: number[],
    encoding: string,
    fatal: boolean,
    ignoreBOM: boolean,
    stream: boolean
  ): string;
  /**
   * this method will install JSI definitions
   */
  install(): boolean;
}

interface NativeModulesDef {
  FastRsa: FastRSANativeModules;
}

interface Global {
  BigInt: any;
  TextEncoder: any;
  TextDecoder: any;
  // for now we are not going to use this way because of hermes on release mode only
  // FastRSA:FastRSAJSI
  /**
   * this method use `JSI`, but will return a `Promise` in order to use an async way,
   * at this moment is no real Async but in the future will be.
   * TODO: implement real promise here
   */
  FastRSACallPromise(
    name: string,
    payload: ArrayBuffer | SharedArrayBuffer
  ): Promise<ArrayBuffer>;
  /**
   * this method use `JSI`, and will use in a Sync way,
   * be careful if the method that you are using is a complex one like generate a new Key
   */
  FastRSACallSync(
    name: string,
    payload: ArrayBuffer | SharedArrayBuffer
  ): ArrayBuffer;

  FastRSAEncodeText(input: string, encoding: string): Uint8Array;
  FastRSADecodeText(
    input: Uint8Array,
    encoding: string,
    fatal: boolean,
    ignoreBOM: boolean,
    stream: boolean
  ): string;
}

declare const global: Global;
declare const module: any;
declare const atob: any;
