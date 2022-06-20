cmake_minimum_required(VERSION 3.9.0)

set (PACKAGE_NAME "react-native-fast-rsa")
set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 14)
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)

add_library(rsa_bridge SHARED IMPORTED)

file(TO_CMAKE_PATH ${NODE_MODULES_DIR} NODE_MODULES_DIR)

set_target_properties(rsa_bridge
        PROPERTIES
        IMPORTED_LOCATION ${CMAKE_SOURCE_DIR}/src/main/jniLibs/${ANDROID_ABI}/librsa_bridge.so
)

include_directories(
        ../cpp
        "${NODE_MODULES_DIR}/react-native/React"
        "${NODE_MODULES_DIR}/react-native/React/Base"
        "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
)

add_library(fast-rsa
        SHARED 
        ../cpp/react-native-fast-rsa.cpp
        fast-rsa-adapter.cpp
)

set_target_properties(
        fast-rsa PROPERTIES
        CXX_STANDARD 14
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)

file (GLOB LIBRN_DIR "${BUILD_DIR}/react-native-0*/jni/${ANDROID_ABI}")

find_library(
        log-lib
        log
)
find_library(
        JSI_LIB
        jsi
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)
find_library(
        REACT_NATIVE_JNI_LIB
        reactnativejni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

target_link_libraries(
        fast-rsa
        rsa_bridge
        ${log-lib}
        ${JSI_LIB}
        ${REACT_NATIVE_JNI_LIB}
        android
)