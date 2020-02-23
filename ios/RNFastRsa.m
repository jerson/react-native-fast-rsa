
#import "RNFastRsa.h"

#if __has_include(<Rsa/Rsa.h>)
#import <Rsa/Rsa.h>
#else
@import Rsa;
#endif

@implementation RNFastRsa

- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("fast-rsa", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(encryptPKCS1v15,
                 encryptPKCS1v15With: (NSString *)message
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
    
         NSError *error;
         NSString * output = [RsaNewFastRSA() encryptPKCS1v15:message pkcs12:pkcs12 passphrase:passphrase error:&error];
         
         if(error!=nil){
             reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
         }else{
             resolve(output);
         }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
}

RCT_REMAP_METHOD(encryptOAEP,
                 encryptOAEPWith: (NSString *)message
                 label: (NSString *)label
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        
         NSError *error;
         NSString * output = [RsaNewFastRSA() encryptOAEP:message label:label hashName:hashName pkcs12:pkcs12 passphrase:passphrase error:&error];
         
         if(error!=nil){
             reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
         }else{
             resolve(output);
         }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
}

RCT_REMAP_METHOD(decryptOAEP,
                 decryptOAEPWith: (NSString *)message
                 label: (NSString *)label
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() decryptOAEP:message label:label hashName:hashName pkcs12:pkcs12 passphrase:passphrase error:&error];
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
}
RCT_REMAP_METHOD(decryptPKCS1v15,
                 decrypPKCS1v15With: (NSString *)message
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() decryptPKCS1v15:message pkcs12:pkcs12 passphrase:passphrase error:&error];
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
}

RCT_REMAP_METHOD(signPKCS1v15,
                 signPKCS1v15With: (NSString *)message
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() signPKCS1v15:message hashName:hashName pkcs12:pkcs12 passphrase:passphrase error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
}


RCT_REMAP_METHOD(signPSS,
                 signPSSWith: (NSString *)message
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() signPSS:message hashName:hashName pkcs12:pkcs12 passphrase:passphrase error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
}

RCT_REMAP_METHOD(verifyPKCS1v15,
                 verifyPKCS1v15With: (NSString *)signature
                 message: (NSString *)message
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        BOOL ret0_;
        BOOL output = [RsaNewFastRSA() verifyPKCS1v15:signature message:message hashName:hashName pkcs12:pkcs12 passphrase:passphrase ret0_:&ret0_ error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
        }else{
            resolve([NSNumber numberWithBool:output]);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
}

RCT_REMAP_METHOD(verifyPSS,
                 verifyPSSWith: (NSString *)signature
                 message: (NSString *)message
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        BOOL ret0_;
        BOOL output = [RsaNewFastRSA() verifyPSS:signature message:message hashName:hashName pkcs12:pkcs12 passphrase:passphrase ret0_:&ret0_ error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
        }else{
            resolve([NSNumber numberWithBool:output]);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
    
}

RCT_REMAP_METHOD(hash,
                 hashWith: (NSString *)message
                 name: (NSString *)name
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() hash:message name:name error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
}

RCT_REMAP_METHOD(base64,
                 base64With: (NSString *)message
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [RsaNewFastRSA() base64:message error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(output);
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }

}

RCT_REMAP_METHOD(generate,
                 generateWith: (nonnull NSNumber *)bits
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        RsaKeyPair * output = [RsaNewFastRSA() generate:[bits floatValue] error:&error];
        
        if(error!=nil){
            reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
        }else{
            resolve(@{
                      @"publicKey":output.publicKey,
                      @"privateKey":output.privateKey,
                    });
        }
    }
    @catch (NSException * e) {
        reject(@"exception", e.reason, nil);
    }
    
    
}

@end
