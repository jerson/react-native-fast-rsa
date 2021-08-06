#import <React/RCTBridgeModule.h>

#ifdef __cplusplus

#import "react-native-fast-rsa.h"

#endif

@interface FastRsa : NSObject <RCTBridgeModule>
@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
