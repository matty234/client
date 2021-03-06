// @flow
import * as Container from '../../util/container'
import type {StylesCrossPlatform} from '../../styles'
import {createSearchSuggestions} from '../../actions/search-gen'
import Bar from './bar'

type OwnProps = {|style?: StylesCrossPlatform, whiteText?: boolean|}

const mapDispatchToProps = dispatch => ({
  onSearch: () => {
    dispatch(createSearchSuggestions({searchKey: 'profileSearch'}))
  },
})

const mergeProps = (_, dispatchProps, ownProps) => ({...ownProps, ...dispatchProps})

export default Container.namedConnect<OwnProps, _, _, _, _>(
  () => ({}),
  mapDispatchToProps,
  mergeProps,
  'PeopleTabSearch'
)(Bar)
