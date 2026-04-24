const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Allow Metro to bundle TypeScript source from the SDK (installed via GitHub)
config.resolver.sourceExts = [...(config.resolver.sourceExts ?? []), 'ts', 'tsx']

module.exports = config
