cmake_minimum_required(VERSION 3.9.0)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 14)
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)

add_library(rsa_bridge SHARED IMPORTED)


file(TO_CMAKE_PATH ${NODE_MODULES_DIR} NODE_MODULES_DIR)


set_target_properties(rsa_bridge
        PROPERTIES
        IMPORTED_LOCATION ${CMAKE_SOURCE_DIR}/src/main/jniLibs/${ANDROID_ABI}/librsa_bridge.so
        )

add_library(fast-rsa
        SHARED
        "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi/jsi/jsi.cpp"
        ../cpp/react-native-fast-rsa.cpp
        ../cpp/react-native-fast-rsa.h
        fast-rsa-adapter.cpp
)

include_directories(
        fast-rsa
        PRIVATE
        "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
        ../cpp
)

target_link_libraries(fast-rsa
        rsa_bridge
        android
        log)
