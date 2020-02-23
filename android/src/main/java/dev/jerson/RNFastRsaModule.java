package dev.jerson;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import rsa.FastRSA;
import rsa.KeyPair;
import rsa.Rsa;

public class RNFastRsaModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final FastRSA instance;

    public RNFastRsaModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        instance = Rsa.newFastRSA();
    }

    @Override
    public String getName() {
        return "RNFastRsa";
    }

    @ReactMethod
    public void decryptOAEP(final String message, final String label, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.decryptOAEP(message, label, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void decryptPKCS1v15(final String message, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.decryptPKCS1v15(message, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void encryptOAEP(final String message, final String label, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.encryptOAEP(message, label, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void encryptPKCS1v15(final String message, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.encryptPKCS1v15(message, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void signPSS(final String message, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.signPSS(message, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void signPKCS1v15(final String message, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.signPKCS1v15(message, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void verifyPSS(final String signature, final String message, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Boolean result = instance.verifyPSS(signature, message, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void verifyPKCS1v15(final String signature, final String message, final String hashName, final String pkcs12, final String passphrase, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Boolean result = instance.verifyPKCS1v15(signature, message, hashName, pkcs12, passphrase);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void hash(final String message, final String name, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.hash(message, name);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void base64(final String message, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.base64(message);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void generate(final Integer bits, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    KeyPair keyPair = instance.generate(bits);
                    WritableMap result = Arguments.createMap();
                    result.putString("publicKey", keyPair.getPublicKey());
                    result.putString("privateKey", keyPair.getPrivateKey());
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }
}
