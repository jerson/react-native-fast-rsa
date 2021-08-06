#import <React/RCTBridgeModule.h>

#ifdef __cplusplus

#import "react-native-fast-rsa.h"

#endif

@interface FastRSA : NSObject <RCTBridgeModule>
@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
