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
    public void decryptOAEP(String message, String label, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.decryptOAEP(message, label, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void decryptPKCS1v15(String message, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.decryptPKCS1v15(message, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void encryptOAEP(String message, String label, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.encryptOAEP(message, label, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void encryptPKCS1v15(String message, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.encryptPKCS1v15(message, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void signPSS(String message, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.signPSS(message, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void signPKCS1v15(String message, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.signPKCS1v15(message, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void verifyPSS(String signature, String message, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            Boolean result = instance.verifyPSS(signature, message, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void verifyPKCS1v15(String signature, String message, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            Boolean result = instance.verifyPKCS1v15(signature, message, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void hash(String message, String name, Promise promise) {
        try {
            String result = instance.hash(message, name);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void base64(String message, Promise promise) {
        try {
            String result = instance.base64(message);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void generate(Integer bits, Promise promise) {
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
}
