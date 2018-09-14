import React, { Component } from 'react'
import PropTypes from 'prop-types'

import debounce from 'just-debounce'

class RunkitEmbed extends Component {
	updateNotebook = debounce(() => {
		this.notebook.setSource(this.props.source)
		this.notebook.evaluate()
	}, 800)

	componentDidUpdate(prevProps) {
		if (!this.props.source) return
		this.updateNotebook()
	}

	componentDidMount() {
		this.notebook = RunKit.createNotebook({
      element: this.refs.notebook,
			...this.props,
    })
	}

	render() {
		return (
			<div ref='notebook' />
		)
	}
}

RunkitEmbed.propTypes = {
	source: PropTypes.string,
	readOnly: PropTypes.bool,
	mode: PropTypes.string,
	nodeVersion: PropTypes.string,
	env: PropTypes.array,
	title: PropTypes.string,
	minHeight: PropTypes.string,
	packageTimestamp: PropTypes.string,
	preamble: PropTypes.string,
	onLoad: PropTypes.func,
	onURLChanged: PropTypes.func,
	onEvaluate: PropTypes.func
}

RunkitEmbed.defaultProps = {
  title: 'LightScript Compiler Output',
	onLoad: notebook => notebook.evaluate(),
}

export default RunkitEmbed
