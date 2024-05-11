import { html, css, LitElement } from 'lit';

export class AiWriter extends LitElement {
  static styles = css`
    h3 {
      color: #333;
    }

    div {
      padding: 1rem;
    }
  `

  static properties = {
    prompt: { type: String, reflect: true },
    insertContent: { type: Function },
    removeNode: { type: Function },
  }

  constructor() {
    super();

    this.prompt = '';
    this.removeNode = () => {};
    this.insertContent = () => {};
  }

  generateResponse() {
    const response = 'This is a response from the AI model';
    this.shadowRoot.getElementById('ai-response').textContent = response;
  }

  acceptResponse() {
    const response = this.shadowRoot.getElementById('ai-response').innerHTML;
    this.prompt = response
    this.insertContent(response);

    this.remove();
  }

  updatedProperties(changedProperties) {
    if (changedProperties.has('prompt')) {
      this.requestUpdate();
    }
  }

  // remove() {
  //   // this.removeNode();

  //   super.remove();
  // }

  render() {
    return html`
      <div>
        <h3>AI Writer</h3>
        <textarea id="ai-prompt" placeholder="Enter your text here"></textarea>
        <button @click=${this.generateResponse}>Generate Response</button>
        <button @click=${this.removeNode}>Cancel</button>

        <div id="ai-response"></div>
        <button @click=${this.acceptResponse}>Accept</button>
      </div>
    `
  }
}

customElements.define('richer-ai-writer', AiWriter);
