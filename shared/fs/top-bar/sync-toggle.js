// @flow
import * as React from 'react'
import * as Styles from '../../styles'
import * as Kb from '../../common-adapters'
import * as Types from '../../constants/types/fs'

export type Props = {|
  ...$Exact<Kb.OverlayParentProps>,
  disableSync: () => void,
  enableSync: () => void,
  syncConfig?: ?Types.TlfSyncConfig,
  waiting: boolean,
|}

class HideFloatingMenuWhenDone extends React.PureComponent<Props, {||}> {
  componentDidUpdate(prevProps: Props) {
    prevProps.waiting && !this.props.waiting && this.props.showingMenu && this.props.toggleShowingMenu()
  }
  render() {
    return null
  }
}

const Confirm = props => (
  <Kb.Box2 direction="vertical" style={styles.popupContainer} centerChildren={true}>
    <Kb.Text type="BodyBig">Unsync this folder now?</Kb.Text>
    <Kb.Text type="BodySmall" center={true} style={styles.explainText}>
      This will delete your local copies of all the files in this folder.
    </Kb.Text>
    {!Styles.isMobile && (
      <Kb.Box2
        direction="horizontal"
        style={styles.popupButtonContainer}
        fullWidth={true}
        gap="xtiny"
        centerChildren={true}
      >
        <Kb.Button
          small={true}
          type="Secondary"
          label="Cancel"
          onClick={props.toggleShowingMenu}
          disabled={props.waiting}
        />
        <Kb.Button
          small={true}
          type="Danger"
          label="Yes, unsync"
          onClick={props.disableSync}
          disabled={props.waiting}
          waiting={props.waiting}
        />
      </Kb.Box2>
    )}
    <HideFloatingMenuWhenDone {...props} />
  </Kb.Box2>
)

const SyncToggle = (props: Props) =>
  !!props.syncConfig && (
    <>
      <Kb.Switch
        align={Styles.isMobile ? 'right' : 'left'}
        onClick={props.syncConfig.mode === 'enabled' ? props.toggleShowingMenu : props.enableSync}
        on={props.syncConfig.mode === 'enabled'}
        color="green"
        label={'Sync on this device'}
        ref={props.setAttachmentRef}
        disabled={props.waiting}
      />
      {props.showingMenu && (
        <Kb.FloatingMenu
          attachTo={props.getAttachmentRef}
          visible={props.showingMenu}
          onHidden={props.toggleShowingMenu}
          position="bottom left"
          closeOnSelect={false}
          containerStyle={styles.floating}
          header={{
            title: '-_-',
            view: <Confirm {...props} />,
          }}
          items={
            Styles.isMobile
              ? [
                  {
                    danger: true,
                    disabled: props.waiting,
                    onClick: props.disableSync,
                    style: props.waiting ? {opacity: 0.3} : null,
                    title: props.waiting ? 'Unsyncing' : 'Yes, unsync',
                  },
                ]
              : []
          }
        />
      )}
    </>
  )

const styles = Styles.styleSheetCreate({
  explainText: Styles.platformStyles({
    isElectron: {
      marginTop: Styles.globalMargins.xxtiny,
    },
    isMobile: {
      marginTop: Styles.globalMargins.tiny,
    },
  }),
  floating: Styles.platformStyles({
    isElectron: {
      marginTop: -38,
    },
  }),
  popupButtonContainer: {
    marginTop: Styles.globalMargins.xsmall,
  },
  popupContainer: Styles.platformStyles({
    common: {
      paddingBottom: Styles.globalMargins.small,
      paddingLeft: Styles.globalMargins.medium,
      paddingRight: Styles.globalMargins.medium,
    },
    isElectron: {
      paddingTop: Styles.globalMargins.small,
      width: 235,
    },
    isMobile: {
      paddingTop: Styles.globalMargins.large,
    },
  }),
})

export default Kb.OverlayParentHOC(SyncToggle)
