// @flow
import * as React from 'react'
import Banner, {height} from './index'
import * as FsGen from '../../../actions/fs-gen'
import * as RowTypes from '../../row/types'
import {namedConnect} from '../../../util/container'
import {isMobile} from '../../../constants/platform'

type OwnProps = {||}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  // TODO: set this to a "retry sync" action
  onRetry: () => dispatch(FsGen.createDriverEnable({})),
})

const ConnectedBanner = namedConnect<OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  (s, d, o) => ({...o, ...s, ...d}),
  'OutOfSpaceBanner'
)(Banner)

export default ConnectedBanner

// TODO do we actually need this?
export const asRows = isMobile
  ? () => []
  : (): Array<RowTypes.RowItemWithKey> => [
      {
        height,
        key: 'out-of-space-banner',
        node: <ConnectedBanner />,
        rowType: 'header',
      },
    ]
