
#import "RNFastRsa.h"
#import "Rsa/Rsa.h"

@implementation RNFastRsa

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(encrypt,
                 encryptWith: (NSString *)message
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
   
    NSError *error;
    NSString * output = [RsaNewFastRSA() encrypt:message pkcs12:pkcs12 passphrase:passphrase error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
    }else{
        resolve(output);
    }
    
}

RCT_REMAP_METHOD(decrypt,
                 decryptWith: (NSString *)message
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    NSString * output = [RsaNewFastRSA() decrypt:message pkcs12:pkcs12 passphrase:passphrase error:&error];
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
    }else{
        resolve(output);
    }
    
}

RCT_REMAP_METHOD(sign,
                 signWith: (NSString *)hash
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    NSString * output = [RsaNewFastRSA() sign:hash hashName:hashName pkcs12:pkcs12 passphrase:passphrase error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
    }else{
        resolve(output);
    }
    
}

RCT_REMAP_METHOD(verify,
                 signWith: (NSString *)signature
                 hash: (NSString *)hash
                 hashName: (NSString *)hashName
                 pkcs12: (NSString *)pkcs12
                 passphrase: (NSString *)passphrase
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    BOOL ret0_;
    BOOL output = [RsaNewFastRSA() verify:signature hash:hash hashName:hashName pkcs12:pkcs12 passphrase:passphrase ret0_:&ret0_ error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",[error code]], [error description],error);
    }else{
        if(output){
            resolve(@"1");
        }else{
            resolve(NULL);
        }
    }
    
}

RCT_REMAP_METHOD(hash,
                 hashWith: (NSString *)message
                 name: (NSString *)name
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    NSString * output = [RsaNewFastRSA() hash:message name:name error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
    }else{
        resolve(output);
    }
    
}

RCT_REMAP_METHOD(base64,
                 base64With: (NSString *)message
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    NSString * output = [RsaNewFastRSA() base64:message error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
    }else{
        resolve(output);
    }
    
}

RCT_REMAP_METHOD(generate,
                 generateWith: (NSNumber *)bits
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSError *error;
    RsaKeyPair * output = [RsaNewFastRSA() generate:bits error:&error];
    
    if(error!=nil){
        reject([NSString stringWithFormat:@"%ld",(long)[error code]], [error description],error);
    }else{
        resolve(@{
                  @"publicKey":output.publicKey,
                  @"privateKey":output.privateKey,
                });
    }
    
}

@end
