import { html, LitElement } from 'lit';
import { connectRouter } from 'lit-redux-router';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import thunk from 'redux-thunk';

import './components/footer/footer.js';
import './components/header/header.js';

const store = createStore((state) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

connectRouter(store);

class App extends LitElement {

  render() {
    return html`
      <div>
        <section>
          <cc-header></cc-header>
        </section>
        
        <section class="cc-page app-content">
          <lit-route 
            path="/" 
            component="cc-home-page"
            .resolve="${() => import('./routes/home/home.js')}"
          ></lit-route>
        </section>

        <section>
          <cc-footer></cc-footer>
        </section>
      </div>
    `;
  }
}

customElements.define('cc-app', App); 