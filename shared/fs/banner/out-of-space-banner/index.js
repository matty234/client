// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'
import * as Styles from '../../../styles'

/*
 * This banner is used as part of a List2 in fs/row/rows.js, so it's important
 * to keep height stable, thus all the height/minHeight/maxHeight in styles.
 * Please make sure the height is still calculated in getHeight when layout
 * changes.
 *
 */
export const height = 52

type Props = {
  onRetry: () => void,
}

const Banner = (props: Props) => (
  <Kb.Box2 direction="vertical" fullWidth={true} centerChildren={true} style={styles.banner}>
    <Kb.Text type="BodySemibold" style={styles.text}>
      You are out of storage space and some folders could not be properly synced. Make some space and &nbsp;
      <Kb.Text onClick={props.onRetry} underline={true} type="BodySemibold" style={styles.text}>
        retry the sync
      </Kb.Text>
      .
    </Kb.Text>
  </Kb.Box2>
)

const styles = Styles.styleSheetCreate({
  banner: {
    backgroundColor: Styles.globalColors.red,
    height: height,
    padding: Styles.globalMargins.medium,
    textAlign: 'center',
  },
  text: {
    color: Styles.globalColors.white,
  },
})

export default Banner
