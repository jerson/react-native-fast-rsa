#ifndef FASTRSA_H
#define FASTRSA_H
#include <jsi/jsilib.h>
#include <jsi/jsi.h>

using namespace facebook;

namespace fastRSA {
    void install(facebook::jsi::Runtime &jsiRuntime);

    void cleanup();

    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                             const jsi::Object &payloadObject);
}

#endif /* FASTRSA_H */
