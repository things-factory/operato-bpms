import { LitElement, html, css } from 'lit-element'
import gql from 'graphql-tag'
import { client } from '@things-factory/shell'
import { i18next } from '@things-factory/i18n-base'
import '@material/mwc-icon'

export class ProcessInfo extends LitElement {
  static get properties() {
    return {
      processId: String,
      process: Object,
      groupId: String,
      processGroupList: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: white;
          height: 100%;
          min-width: 50vw;
          overflow: auto;
          padding: 10px;

          position: relative;
        }

        h2 {
          text-align: center;
          text-transform: capitalize;
        }

        [edit] {
          position: absolute;
          top: 25px;
          right: 25px;
          color: var(--process-info-icon-color, black);
          font-size: 1.5em;
        }

        img {
          display: block;

          margin: auto;
          max-width: 100%;
          max-height: 100%;
        }

        form {
          width: 100%;

          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: var(--form-grid-gap);
          grid-auto-rows: minmax(24px, auto);
          max-width: var(--form-max-width);
          margin: var(--form-margin);

          align-items: center;
        }

        [buttons] {
          grid-column: span 12;

          display: flex;
          margin: var(--form-margin);
        }

        [buttons] * {
          margin: 10px;
        }

        fieldset {
          display: contents;
        }

        legend {
          grid-column: span 12;
          text-transform: capitalize;

          padding: var(--legend-padding);
          font: var(--legend-font);
          color: var(--legend-text-color);
          border-bottom: var(--legend-border-bottom);
        }

        label {
          grid-column: span 3;
          text-align: right;
          text-transform: capitalize;

          color: var(--label-color);
          font: var(--label-font);
        }

        span {
          grid-column: span 8;
          padding: var(--input-field-padding);
          font: var(--input-field-font);
        }

        input,
        table,
        select,
        textarea,
        [custom-input] {
          grid-column: span 8;

          border: var(--input-field-border);
          border-radius: var(--input-field-border-radius);
          padding: var(--input-field-padding);
          font: var(--input-field-font);
        }

        input[type='checkbox'],
        input[type='radio'] {
          justify-self: end;
          align-self: center;
          grid-column: span 3 / auto;
        }

        input[type='checkbox'] + label,
        input[type='radio'] + label {
          text-align: left;
          grid-column: span 9 / auto;

          font: var(--form-sublabel-font);
          color: var(--form-sublabel-color);
        }

        input:focus {
          outline: none;
          border: 1px solid var(--focus-background-color);
        }
        input[type='checkbox'] {
          margin: 0;
        }

        @media screen and (max-width: 460px) {
          :host {
            width: 100vw;
          }

          form {
            max-width: 90%;
            grid-gap: 5px;
          }

          label {
            grid-column: span 12;
            text-align: left;
            align-self: end;
          }

          span,
          input,
          table,
          select,
          textarea,
          [custom-input] {
            grid-column: span 12;
          }
          input[type='checkbox'],
          input[type='radio'] {
            justify-self: start;
            align-self: center;
            grid-column: span 1 / auto;
          }

          input[type='checkbox'] + label,
          input[type='radio'] + label {
            grid-column: span 11 / auto;
            align-self: center;
          }
        }
      `
    ]
  }

  render() {
    var process = this.process || { name: '', description: '' }
    var processGroupList = this.processGroupList || []

    return html`
      <h2>
        process information
      </h2>

      <a .href=${'process-modeller/' + this.processId} edit>
        <mwc-icon>edit</mwc-icon>
      </a>

      ${process.thumbnail
        ? html`
            <img src=${process.thumbnail} />
          `
        : html``}

      <form>
        <fieldset>
          <legend>${i18next.t('label.information')}</legend>
          <label>${i18next.t('label.name')}</label>
          <input type="text" .value=${process.name} @change=${e => (this.process.name = e.target.value)} />

          <label>${i18next.t('label.description')}</label>
          <input
            type="text"
            .value=${process.description}
            @change=${e => (this.process.description = e.target.value)}
          />

          <label>${i18next.t('label.group')}</label>
          <select @change=${e => (this.process.groupId = e.target.value)} .value=${this.groupId}>
            <option value="" ?selected=${'' == this.groupId}></option>
            ${processGroupList.map(
              item => html`
                <option .value=${item.id} ?selected=${item.id == this.groupId}>${item.name}</option>
              `
            )}
          </select>
          <label>${i18next.t('label.creator')}</label>
          <span>${process.creator && process.creator.name}</span>

          <label>${i18next.t('label.created-at')}</label>
          <span>${new Date(Number(process.createdAt)).toLocaleString()}</span>

          <label>${i18next.t('label.updater')}</label>
          <span>${process.updater && process.updater.name}</span>

          <label>${i18next.t('label.updated-at')}</label>
          <span>${new Date(Number(process.updatedAt)).toLocaleString()}</span>

          <div buttons>
            <input
              type="button"
              name="save"
              value=${i18next.t('button.save')}
              @click=${this.updateProcess.bind(this)}
            /><input
              type="button"
              name="delete"
              value=${i18next.t('button.delete')}
              @click=${this.deleteProcess.bind(this)}
            />
          </div>
        </fieldset>
      </form>
    `
  }

  firstUpdated() {
    this.refresh()
  }

  async refresh() {
    var response = (
      await client.query({
        query: gql`
          query FetchProcessById($id: String!) {
            process(id: $id) {
              id
              name
              description
              group {
                id
                name
              }
              thumbnail
              createdAt
              creator {
                id
                name
              }
              updatedAt
              updater {
                id
                name
              }
            }
          }
        `,
        variables: { id: this.processId }
      })
    ).data

    var process = response.process

    this.processGroupList = (
      await client.query({
        query: gql`
          {
            processGroups {
              items {
                id
                name
                description
              }
            }
          }
        `
      })
    ).data.processGroups.items
    if (process.group) {
      this.groupId = process.group.id
    }

    this.process = process
  }

  async updateProcess() {
    this.dispatchEvent(
      new CustomEvent('update-process', {
        detail: this.process
      })
    )

    this.close()
  }

  async deleteProcess() {
    this.dispatchEvent(
      new CustomEvent('delete-process', {
        detail: this.processId
      })
    )

    this.close()
  }

  close() {
    history.back()
  }
}

customElements.define('process-info', ProcessInfo)
