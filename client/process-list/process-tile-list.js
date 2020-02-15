import { css, html, LitElement } from 'lit-element'

import '@material/mwc-icon'

import '@things-factory/process-ui'

export default class ProcessTileList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          overflow: auto;
          padding: var(--popup-content-padding);
          display: grid;

          grid-template-columns: var(--card-list-template);
          grid-auto-rows: var(--card-list-rows-height);
          grid-gap: 20px;
        }

        [card] {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          border-radius: var(--card-list-border-radius);
          background-color: var(--card-list-background-color);
        }

        [card][create] {
          overflow: visible;
          background-color: initial;
        }

        [card]:hover {
          cursor: pointer;
        }

        [name] {
          background-color: rgba(1, 126, 127, 0.8);
          margin-top: -35px;
          width: 100%;
          color: #fff;
          font-weight: bolder;
          font-size: 13px;
          text-indent: 7px;
        }

        [description] {
          background-color: rgba(0, 0, 0, 0.7);
          width: 100%;
          min-height: 15px;
          font-size: 0.6rem;
          color: #fff;
          text-indent: 7px;
        }

        img {
          display: block;

          margin: auto;
          max-width: 100%;
          max-height: 100%;
        }

        [thumbnail] {
          width: 100%;
          height: 100%;
        }

        mwc-icon[star] {
          position: absolute;
          right: 10px;
          top: 8px;

          color: var(--process-list-star-color);
          font-size: 1.4em;
        }

        mwc-icon[star][favored] {
          color: var(--process-list-star-active-color);
        }

        a {
          display: block;
          text-decoration: none;
          word-wrap: break-word;
          word-break: keep-all;

          margin: 0px;
        }

        [info] {
          opacity: 0.5;

          position: absolute;
          bottom: 35px;
          right: 3px;
        }

        [info] mwc-icon {
          color: var(--process-list-tile-icon-color);
          font-size: 1.5em;
          vertical-align: middle;
        }

        :host > *:hover [info] {
          opacity: 1;
          -webkit-transition: opacity 0.8s;
          -moz-transition: opacity 0.8s;
          -o-transition: opacity 0.8s;
          transition: opacity 0.8s;
        }
      `
    ]
  }

  static get properties() {
    return {
      processes: Array,
      favorites: Array,
      processGroups: Array,
      processGroup: String
    }
  }

  render() {
    var processes = this.processes || []

    return html`
      ${this.creatable
        ? html`
            <process-creation-card
              .processGroups=${this.processGroups}
              .defaultProcessGroup=${this.processGroup}
              @create-process=${e => this.onCreateProcess(e)}
              card
              create
            ></process-creation-card>
          `
        : html``}
      ${processes.map(
        process =>
          html`
            <div card>
              <a href="process-viewer/${process.id}" thumbnail> <img src=${process.thumbnail} /> </a>

              <div name>${process.name}</div>
              <div description>${process.description}</div>

              ${(this.favorites || []).includes(process.id)
                ? html`
                    <mwc-icon star favored>star</mwc-icon>
                  `
                : html`
                    <mwc-icon star>star_border</mwc-icon>
                  `}

              <a
                href="#"
                @click=${e => {
                  this.infoProcess(process.id)
                  e.preventDefault()
                }}
                info
              >
                <mwc-icon>info</mwc-icon>
              </a>
            </div>
          `
      )}
    `
  }

  updated(changes) {
    var creationCard = this.shadowRoot.querySelector('process-creation-card')
    if (creationCard) {
      creationCard.reset()
    }
  }

  onCreateProcess(e) {
    this.dispatchEvent(
      new CustomEvent('create-process', {
        detail: e.detail
      })
    )
  }

  infoProcess(processId) {
    this.dispatchEvent(
      new CustomEvent('info-process', {
        detail: processId
      })
    )
  }
}

window.customElements.define('process-tile-list', ProcessTileList)
