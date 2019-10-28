Pod::Spec.new do |s|  
    s.name              = 'FastRsa'
    s.version           = '0.2.0'
    s.summary           = 'Rsa native'
    s.homepage          = 'https://github.com/jerson/rsa-mobile'

    s.author            = { 'Name' => 'jeral17@gmail.com' }
    s.license           = { :type => 'MIT' }

    s.platform          = :ios
    s.source            = { :http => 'https://github.com/jerson/rsa-mobile' }

    s.ios.deployment_target = '8.0'
    s.ios.vendored_frameworks = 'Rsa.framework'
end  
