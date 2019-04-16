// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'
import * as Styles from '../../../styles'

export type BannerType = 'warning' | 'failure' | 'none'
type Props = {
  onHide: () => void,
  onRetry: () => void,
  bannerType: BannerType,
}

const Banner = (props: Props) =>
  props.bannerType !== 'none' && (
    <Kb.Box2
      direction="vertical"
      fullWidth={true}
      centerChildren={true}
      style={props.bannerType === 'warning' ? styles.warning : styles.failure}
    >
      {props.bannerType === 'warning' ? (
        <>
          <Kb.Text type="BodySemibold" style={styles.text}>
            You have less than 1 GB of storage space. Make some space, or unsync some folders.
          </Kb.Text>
          <Kb.Text type="BodySemibold" style={styles.text} underline={true} onClick={props.onHide}>
            Hide this
          </Kb.Text>
        </>
      ) : (
        <Kb.Text type="BodySemibold" style={styles.text}>
          You are out of storage space. Make some space then{' '}
          <Kb.Text onClick={props.onRetry} underline={true} type="BodySemibold" style={styles.text}>
            retry the sync
          </Kb.Text>{' '}
          or unsync some folders.
        </Kb.Text>
      )}
    </Kb.Box2>
  )

const styles = Styles.styleSheetCreate({
  failure: {
    backgroundColor: Styles.globalColors.red,
    padding: Styles.globalMargins.medium,
    textAlign: 'center',
  },
  text: {
    color: Styles.globalColors.white,
  },
  warning: {
    backgroundColor: Styles.globalColors.blue,
    padding: Styles.globalMargins.medium,
    textAlign: 'center',
  },
})

export default Banner
