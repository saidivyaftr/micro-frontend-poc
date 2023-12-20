const path = require('path')

module.exports = {
  aliases: (rootPath) => ({
    '@/shared-ui/layouts/main': path.resolve(
      rootPath,
      'src/layouts/MainLayout.tsx',
    ),
    '@/shared-ui/components$': path.resolve(rootPath, 'src/blitz/index.ts'),
    '@/shared-ui/components': path.resolve(rootPath, 'src/blitz/components'),
    '@/shared-ui/react-icons$': path.resolve(
      rootPath,
      'src/blitz/assets/react-icons/index',
    ),
    '@/shared-ui/react-icons': path.resolve(
      rootPath,
      'src/blitz/assets/react-icons',
    ),
    '@/shared-ui/theme/colors.types': path.resolve(
      rootPath,
      'src/blitz/theme/colors/colors.types',
    ),
    '@/shared-ui/theme/colors.helper': path.resolve(
      rootPath,
      'src/blitz/theme/colors/colors.helper',
    ),
    '@/shared-ui/colors': path.resolve(rootPath, 'src/styles/theme/colors.ts'),
    '@/shared-ui/hooks$': path.resolve(rootPath, 'src/hooks/index'),
    '@/shared-ui/hooks': path.resolve(rootPath, 'src/hooks'),
  }),
}
