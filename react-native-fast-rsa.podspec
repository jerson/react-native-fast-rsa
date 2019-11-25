
require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/jerson/react-native-fast-rsa.git", :tag => "v#{s.version}" }
  s.source_files  = 'ios/*.{h,m}'
  s.requires_arc = true

  s.dependency "React"
  s.dependency "FastRsa"

  #s.subspec "FastRsa" do |o|
  #o.name              = 'FastRsa'
  #o.platform          = :ios
  #o.ios.deployment_target = '8.0'
  #o.ios.vendored_frameworks = 'ios/native/rsa.framework'
  #end
  
end
