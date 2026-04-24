const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const sdkRoot  = path.resolve(__dirname, '../tooltip-tour-react-native')
const appRoot  = __dirname

const config = getDefaultConfig(appRoot)

// Watch the local SDK folder so Metro picks up changes immediately
config.watchFolders = [sdkRoot]

// When the SDK imports react / react-native / its peer deps, resolve them
// from the demo app's node_modules (not the SDK folder, which has none)
const sdkPeerModules = ['react', 'react-native', '@react-native-async-storage/async-storage', 'react-native-svg']

config.resolver.extraNodeModules = {
  ...sdkPeerModules.reduce((acc, pkg) => {
    acc[pkg] = path.resolve(appRoot, 'node_modules', pkg)
    return acc
  }, {}),
}

// Allow Metro to bundle TypeScript source from the SDK
config.resolver.sourceExts = [...(config.resolver.sourceExts ?? []), 'ts', 'tsx']

module.exports = config
