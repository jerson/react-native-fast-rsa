#ifdef __cplusplus
#import "react-native-fast-rsa.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNFastRsaSpec.h"

@interface FastRsa : NSObject <NativeFastRsaSpec>
#else
#import <React/RCTBridgeModule.h>

@interface FastRsa : NSObject <RCTBridgeModule>
@property (nonatomic, assign) BOOL setBridgeOnMainQueue;
#endif

@end
