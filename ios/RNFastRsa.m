
#import "RNFastRsa.h"

#if __has_include(<Rsa/Rsa.h>)
#import <Rsa/Rsa.h>
#else
@import Rsa;
#endif

@implementation RNFastRsa{
    RsaFastRSA *_instance;
}

- (RsaFastRSA *) instance {
    if ( _instance == nil ) {
        _instance = RsaNewFastRSA();
    }
    return _instance;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("fast-rsa", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(encryptPKCS1v15,
                 encryptPKCS1v15With: (NSString *)message
                 publicKey: (NSString *)publicKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
    
         NSError *error;
         NSString * output = [[self instance] encryptPKCS1v15:message publicKey:publicKey error:&error];
         
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
                 publicKey: (NSString *)publicKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        
         NSError *error;
         NSString * output = [[self instance] encryptOAEP:message label:label hashName:hashName publicKey:publicKey error:&error];
         
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
                 privateKey: (NSString *)privateKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [[self instance] decryptOAEP:message label:label hashName:hashName privateKey:privateKey error:&error];
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
                 privateKey: (NSString *)privateKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [[self instance] decryptPKCS1v15:message privateKey:privateKey error:&error];
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
                 privateKey: (NSString *)privateKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [[self instance] signPKCS1v15:message hashName:hashName privateKey:privateKey error:&error];
        
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
                 saltLengthName: (NSString *)saltLengthName
                 privateKey: (NSString *)privateKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        NSString * output = [[self instance] signPSS:message hashName:hashName saltLengthName:saltLengthName privateKey:privateKey error:&error];
        
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
                 publicKey: (NSString *)publicKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        BOOL ret0_;
        BOOL output = [[self instance] verifyPKCS1v15:signature message:message hashName:hashName publicKey:publicKey ret0_:&ret0_ error:&error];
        
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
                 saltLengthName: (NSString *)saltLengthName
                 publicKey: (NSString *)publicKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSError *error;
        BOOL ret0_;
        BOOL output = [[self instance] verifyPSS:signature message:message hashName:hashName saltLengthName:saltLengthName publicKey:publicKey ret0_:&ret0_ error:&error];
        
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
        NSString * output = [[self instance] hash:message name:name error:&error];
        
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
        NSString * output = [[self instance] base64:message error:&error];
        
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
        RsaKeyPair * output = [[self instance] generate:[bits floatValue] error:&error];
        
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
