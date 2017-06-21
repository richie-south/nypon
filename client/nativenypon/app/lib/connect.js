
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from './action-creators/index'

const mapStateToProps = (keys) => (state) =>
  keys.reduce((object, key) => {
    object[key] = state[key]
    return object
  }, {})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default (stateProps, Component) =>
  connect(
    mapStateToProps(stateProps),
    mapDispatchToProps
  )(Component)