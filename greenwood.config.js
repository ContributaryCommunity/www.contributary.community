import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css';
import { greenwoodPluginPolyfills } from '@greenwood/plugin-polyfills';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';

export default {
  title: 'Contributary Community',
  
  devServer: {
    proxy: {
      '/api': 'https://www.contributary.community'
    }
  },

  plugins: [
    greenwoodPluginPostCss(),
    ...greenwoodPluginImportCss(),
    ...greenwoodPluginPolyfills(),
    greenwoodPluginGoogleAnalytics({
      analyticsId: 'G-0F85VEMETN'
    })
  ]
};