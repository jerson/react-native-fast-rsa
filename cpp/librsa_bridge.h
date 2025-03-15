#include <stdint.h>
#include <stdlib.h>
typedef struct {
  void* message;
  int size;
  char* error;
} BytesReturn;

#ifdef __cplusplus
extern "C" {
#endif
extern BytesReturn* RSABridgeCall(char* p0, void* p1, int p2);
extern BytesReturn* RSAEncodeText(char* input, char* encoding);
extern char* RSADecodeText(void* input, int size, char* encoding, int fatal, int ignoreBOM, int stream);
#ifdef __cplusplus
}
#endif
