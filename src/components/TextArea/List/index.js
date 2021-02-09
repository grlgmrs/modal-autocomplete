import { Component, createRef } from "react";
import PropTypes from "prop-types";

import { Container, Option } from "./styles";

class List extends Component {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOnPage);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOnPage);
  }

  handleClickOnPage = ({ path }) => {
    const {
      listRef: { current },
      props: { handleClose }
    } = this;

    if (!path.some((target) => target === current)) {
      handleClose();
    }
  };

  render() {
    const {
      props: { position, matches },
      listRef
    } = this;

    return (
      <Container ref={listRef} style={{ left: position.x, top: position.y }}>
        {matches.map((m) => (
          <Option key={m}>{m}</Option>
        ))}
      </Container>
    );
  }
}

List.propTypes = {
  handleClose: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  matches: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default List;
