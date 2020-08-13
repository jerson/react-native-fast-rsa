package dev.jerson;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import rsa.FastRSA;
import rsa.KeyPair;
import rsa.PKCS12KeyPair;
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
    private void convertJWKToPrivateKey(final String data, final String keyId, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertJWKToPrivateKey(data, keyId);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertJWKToPublicKey(final String data, final String keyId, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertJWKToPublicKey(data, keyId);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertKeyPairToPKCS12(final String privateKey, final String certificate, final String password, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertKeyPairToPKCS12(privateKey, certificate, password);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPKCS12ToKeyPair(final String pkcs12, final String password, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    PKCS12KeyPair keyPair = instance.convertPKCS12ToKeyPair(pkcs12, password);
                    WritableMap result = Arguments.createMap();
                    result.putString("privateKey", keyPair.getPrivateKey());
                    result.putString("publicKey", keyPair.getPublicKey());
                    result.putString("certificate", keyPair.getCertificate());
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPrivateKeyToPKCS8(final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPrivateKeyToPKCS8(privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPrivateKeyToPKCS1(final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPrivateKeyToPKCS1(privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPrivateKeyToJWK(final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPrivateKeyToJWK(privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPrivateKeyToPublicKey(final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPrivateKeyToPublicKey(privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPublicKeyToPKIX(final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPublicKeyToPKIX(publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPublicKeyToPKCS1(final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPublicKeyToPKCS1(publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void convertPublicKeyToJWK(final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.convertPublicKeyToJWK(publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void decryptPrivateKey(final String privateKeyEncrypted, final String password, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.decryptPrivateKey(privateKeyEncrypted, password);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    private void encryptPrivateKey(final String privateKey, final String password, final String cipherName, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.encryptPrivateKey(privateKey, password, cipherName);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void decryptOAEP(final String message, final String label, final String hashName, final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.decryptOAEP(message, label, hashName, privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void decryptPKCS1v15(final String message, final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.decryptPKCS1v15(message, privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void encryptOAEP(final String message, final String label, final String hashName, final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.encryptOAEP(message, label, hashName, publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void encryptPKCS1v15(final String message, final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.encryptPKCS1v15(message, publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void signPSS(final String message, final String hashName, final String saltLengthName, final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.signPSS(message, hashName, saltLengthName, privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void signPKCS1v15(final String message, final String hashName, final String privateKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String result = instance.signPKCS1v15(message, hashName, privateKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void verifyPSS(final String signature, final String message, final String hashName, final String saltLengthName, final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Boolean result = instance.verifyPSS(signature, message, hashName, saltLengthName, publicKey);
                    promise.resolve(result);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    @ReactMethod
    public void verifyPKCS1v15(final String signature, final String message, final String hashName, final String publicKey, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Boolean result = instance.verifyPKCS1v15(signature, message, hashName, publicKey);
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
