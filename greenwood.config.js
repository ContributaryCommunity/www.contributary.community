import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginImportRaw } from '@greenwood/plugin-import-raw';
import { greenwoodPluginPolyfills } from '@greenwood/plugin-polyfills';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';

class ProcessEnvReplaceResource extends ResourceInterface {
  constructor(compilation) {
    super();

    this.compilation = compilation;
  }

  async shouldIntercept(url) {
    return url.pathname.endsWith('redux.mjs');
  }

  async intercept(url, request, response) {
    const body = await response.text();
    const env = process.env.__GWD_COMMAND__ === 'develop' ? 'development' : 'production'; // eslint-disable-line no-underscore-dangle
    const contents = body.replace(/process.env.NODE_ENV/g, `"${env}"`);

    return new Response(contents, {
      headers: new Headers({
        'Content-Type': 'text/javascript'
      })
    });
  }
}

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
    }),
    {
      type: 'resource',
      name: 'process-env-replace',
      provider: (compilation) => new ProcessEnvReplaceResource(compilation)
    }
  ]
};