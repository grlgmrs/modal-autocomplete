import { Component } from "react";

import List from "./List";

class TextArea extends Component {
  constructor() {
    super();

    this.state = {
      list: [
        "seila",
        "seleiro",
        "semana",
        "sabado0",
        "sabado1",
        "sabado2",
        "sabado3",
        "sabado4",
        "sabao",
        "sabonete",
        "segunda",
        "terça",
        "quarta",
        "quainta",
        "sexta",
        "domingo"
      ],
      matches: [],
      modalOpen: false
    };
  }

  renderModalComplete() {
    const { matches } = this.state;
    const ref = document.querySelector("#spanRef");

    if (!ref) return;

    const position = ref.getBoundingClientRect();

    return (
      <List
        position={{ x: position.x, y: position.y }}
        matches={matches}
        handleClose={() => this.setState({ modalOpen: false })}
      />
    );
  }

  getCaretPosition(target) {
    const txContainer = document.querySelector("#txContainer");
    let created = false;

    const div =
      document.querySelector("#txVirtual") ||
      (created = true && document.createElement("div"));

    if (created) {
      div.id = "txVirtual";
      txContainer.appendChild(div);

      const targetBounding = target.getBoundingClientRect();
      div.style.zIndex = -1;
      div.style.position = "absolute";
      div.style.top = `${targetBounding.top + 21}px`;
      div.style.left = `${targetBounding.left + 1}px`;
      div.style.height = `${target.clientHeight}px`;
      div.style.width = `${target.clientWidth}px`;
      div.style.visibility = "hidden";
      div.style.backgroundColor = "purple";
      div.style.font = "400 13.3333px Arial";
      target.style.font = "400 13.3333px Arial";
    }

    /**
     * A ideía é pegar em modo texto e depois transforma-lo em modo HTML, entao
     * precisamos converter as < > para não ser inserido como HTML ao invés de texto
     * outra coisa importante é substituir o \n por </br>, mas isso tem que ser feito
     * depois da contagem do selectionStart
     */
    const refValue = target.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

    /**
     * O motivo do replace do br estar aqui em baixo, é pra não interferir na contagem
     * do selectionStart
     */
    const beforeCursorText = refValue
      .substr(0, target.selectionStart)
      .replaceAll("\n", "</br>");
    const afterCursorText = refValue
      .substr(target.selectionStart)
      .replaceAll("\n", "</br>");

    document.querySelector("#spanRef") &&
      document.querySelector("#spanRef").remove();

    div.innerHTML =
      beforeCursorText +
      "<span id='spanRef' style='position: relative;'></span>" +
      afterCursorText;
  }

  lastWord(text) {
    const textArray = text.split(" ");

    return textArray[textArray.length - 1];
  }

  handleTextareaChange = (e) => {
    const { list } = this.state;
    const text = e.target.value;
    const lastWord = this.lastWord(text);

    if (lastWord.length < 3) {
      this.setState({ matches: [], modalOpen: false });
      return;
    }

    const reg = new RegExp(`^${lastWord}`);
    const matches = list.filter((l) => l.match(reg));

    this.setState(
      {
        matches,
        modalOpen: matches.length > 0
      },
      () => this.getCaretPosition(e.target)
    );
  };

  render() {
    const { matches, modalOpen } = this.state;

    return (
      <div id="txContainer">
        <textarea
          style={{ width: 300, height: 120, resize: "none" }}
          id="textAreaChange"
          onChange={this.handleTextareaChange}
        />
        <ul>
          {matches.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        <div id="autoCompleteModal">
          {modalOpen && this.renderModalComplete()}
        </div>
      </div>
    );
  }
}

export default TextArea;
