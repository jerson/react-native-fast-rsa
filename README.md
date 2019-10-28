# react-native-fast-rsa

## Getting started

`$ npm install react-native-fast-rsa --save`

## Mostly automatic installation

`$ react-native link react-native-fast-rsa`

on `iOS` is required to add this line to `Podfile`

```ruby
pod 'FastRsa', :path => '../node_modules/react-native-fast-rsa/ios/native'
```

and then Run `pod install`

## Manual installation

### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-fast-rsa` and add `RNFastRsa.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNFastRsa.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. In `Podfile` add

```ruby
pod 'FastRsa', :path => '../node_modules/react-native-fast-rsa/ios/native'
```

5. Run `pod install`
6. Run your project (`Cmd+R`)<

### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import dev.jerson.RNFastRsaPackage;` to the imports at the top of the file
- Add `new RNFastRsaPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-fast-rsa'
   project(':react-native-fast-rsa').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-fast-rsa/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     implementation project(':react-native-fast-rsa')
   ```

## Usage

```javascript
interface KeyPair {
  publicKey: string;
  privateKey: string;
}

type RSAHash = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';
type RSABits = 512 | 1024 | 2048 | 4096;
class RSA {
    static decryptOAEP(message: string, label: string, hashName: string, pkcs12: string, passphrase: string): Promise<string>;
    static decryptPKCS1v15(message: string, pkcs12: string, passphrase: string): Promise<string>;
    static encryptOAEP(message: string, label: string, hashName: string, pkcs12: string, passphrase: string): Promise<string>;
    static encryptPKCS1v15(message: string, pkcs12: string, passphrase: string): Promise<string>;
    static signPSS(message: string, hashName: RSAHash, pkcs12: string, passphrase: string): Promise<string>;
    static signPKCS1v15(message: string, hashName: RSAHash, pkcs12: string, passphrase: string): Promise<string>;
    static verifyPSS(signature: string, message: string, hashName: RSAHash, pkcs12: string, passphrase: string): Promise<boolean>;
    static verifyPKCS1v15(signature: string, message: string, hashName: RSAHash, pkcs12: string, passphrase: string): Promise<boolean>;
    static hash(message: string, name: RSAHash): Promise<string>;
    static base64(message: string): Promise<string>;
    static generate(bits: RSABits): Promise<KeyPair>;
}

```
## ProGuard

Add this lines to `proguard-rules.pro` for proguard support 

```proguard
-keep class go.** { *; }
-keep class rsa.** { *; }
```


## Native Code

the native library is made in Golang and build with gomobile for faster performance

https://github.com/jerson/rsa-mobile
