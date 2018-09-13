import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RunkitEmbed extends Component {
	componentDidUpdate() {
		if (!this.props.source) return
		this.notebook.setSource(this.props.source)
		this.notebook.evaluate()
	}
	componentDidMount() {
		this.notebook = RunKit.createNotebook({
      element: this.refs.notebook,
			...this.props,
      onLoad: notebook => notebook.evaluate(),
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
}

export default RunkitEmbed
