// @flow
import * as React from 'react'
import * as Constants from '../../constants/fs'
import {Box, ConfirmModal, HeaderOnMobile, Icon, MaybePopup, ProgressIndicator} from '../../common-adapters'
import {globalStyles, globalMargins} from '../../styles'
import * as Types from '../../constants/types/fs'

export type Props = {
  onBack: () => void,
  onDelete: () => void,
  path: Types.Path,
  title: string,
}

const _Spinner = (props: Props) => (
  <MaybePopup onClose={props.onBack}>
    <Box
      style={{...globalStyles.flexBoxColumn, alignItems: 'center', flex: 1, padding: globalMargins.xlarge}}
    >
      <ProgressIndicator style={{width: globalMargins.medium}} />
    </Box>
  </MaybePopup>
)
const Spinner = HeaderOnMobile(_Spinner)

const Header = (props: Props) => <Icon type="iconfont-trash" sizeType="Big" />

const _ReallyDeleteFile = (props: Props) =>
  !!props.path && (
    <ConfirmModal
      confirmText={`Yes, delete it.`}
      description={`There's no trash can - "${Types.pathToString(props.path)}" will be gone forever.`}
      header={<Header {...props} />}
      onCancel={props.onBack}
      onConfirm={props.onDelete}
      prompt={`Are you sure you want to delete "${Types.pathToString(props.path)}"?`}
      waitingKey={Constants.deleteFolderWaitingKey(props.path)}
    />
  )

export default HeaderOnMobile(_ReallyDeleteFile)
export {Spinner}
