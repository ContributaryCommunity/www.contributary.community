import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginImportRaw } from '@greenwood/plugin-import-raw';
import { greenwoodPluginPolyfills } from '@greenwood/plugin-polyfills';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';

export default {
  devServer: {
    proxy: {
      '/api': 'https://www.contributary.community'
    }
  },

  plugins: [
    greenwoodPluginPostCss(),
    greenwoodPluginImportRaw(),
    greenwoodPluginPolyfills(),
    greenwoodPluginGoogleAnalytics({
      analyticsId: 'G-0F85VEMETN'
    })
  ]
};