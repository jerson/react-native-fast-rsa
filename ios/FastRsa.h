#ifdef __cplusplus
#import "react-native-fast-rsa.h"
#endif

#import <React/RCTBridgeModule.h>

@interface FastRsa : NSObject <RCTBridgeModule>
@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
