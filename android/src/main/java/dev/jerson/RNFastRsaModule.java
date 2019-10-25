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
    public void decrypt(String message, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.decrypt(message, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void encrypt(String message, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.encrypt(message, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void sign(String hash, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            String result = instance.sign(hash, hashName, pkcs12, passphrase);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void verify(String signature, String hash, String hashName, String pkcs12, String passphrase, Promise promise) {
        try {
            Boolean result = instance.verify(signature, hash, hashName, pkcs12, passphrase);
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
