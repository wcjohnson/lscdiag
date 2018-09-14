import React, { Component } from 'react'
import PropTypes from 'prop-types'

import debounce from 'debounce-fn'

class RunkitEmbed extends Component {
	updateNotebook = debounce(() => {
		this.notebook.setSource(this.props.source)
		this.notebook.evaluate()
	}, {wait: 800})

	componentDidUpdate() {
		if (!this.props.source) return
		this.updateNotebook()
	}

	componentDidMount() {
		this.notebook = RunKit.createNotebook({
      element: this.embedContainer,
			...this.props,
    })
	}

	componentWillUnmount() {
		this.notebook.destroy()
		this.notebook = null
	}

	render() {
		return (
			<div ref={(el) => this.embedContainer = el} />
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
