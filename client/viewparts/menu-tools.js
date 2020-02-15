import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import '@material/mwc-icon'

import { store } from '@things-factory/shell'

export class MenuTools extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      width: {
        type: String,
        reflect: true
      },
      context: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--menu-tools-background-color);

          /* for narrow mode */
          flex-direction: column;
          width: 100%;
        }

        :host([width='WIDE']) {
          /* for wide mode */
          flex-direction: row;
          width: initial;
          height: 100%;
        }

        ul {
          display: flex;
          flex-direction: row;

          margin: auto;
          padding: 0;
          list-style: none;
          height: 100%;
          overflow: none;
        }

        :host([width='WIDE']) ul {
          flex-direction: column;
        }

        :host([width='WIDE']) li {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
          display: block;
          padding: 5px 0px;
          text-align: center;
          text-decoration: none;
          color: var(--menu-tools-color);
        }

        a[active] {
          color: var(--menu-tools-active-color);
          background-color: rgba(0, 0, 0, 0.2);
        }

        mwc-icon {
          padding: 5px 15px 0px 15px;
          vertical-align: bottom;
        }

        div {
          font-size: 0.6em;
        }
      `
    ]
  }

  render() {
    return this.context && this.context['process_topmenu']
      ? html`
          <ul>
            <li>
              <a href="process-list" ?active=${this.page == 'process-list'}>
                <mwc-icon>dvr</mwc-icon>
                <div>process</div>
              </a>
            </li>
            <li>
              <a href="service-list" ?active=${this.page == 'service-list'}>
                <mwc-icon>airplay</mwc-icon>
                <div>service</div>
              </a>
            </li>
            <li>
              <a href="work-list" ?active=${this.page == 'work-list'}>
                <mwc-icon>font_download</mwc-icon>
                <div>worklist</div>
              </a>
            </li>
            <li>
              <a href="start-list" ?active=${this.page == 'start-list'}>
                <mwc-icon>cloud_download</mwc-icon>
                <div>starter</div>
              </a>
            </li>
            <li>
              <a href="report-list" ?active=${this.page == 'report-list'}>
                <mwc-icon>attachment</mwc-icon>
                <div>report</div>
              </a>
            </li>
          </ul>
        `
      : html``
  }

  stateChanged(state) {
    this.page = state.route.page
    this.width = state.layout.width
    this.context = state.route.context
  }
}

window.customElements.define('menu-tools', MenuTools)
