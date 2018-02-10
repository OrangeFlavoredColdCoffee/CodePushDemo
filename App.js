/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, } from 'react-native';
import CodePush from 'react-native-code-push';

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      syncMessage: '有更新',
    };
  }

  componentWillMount() {
    this.CodePushUpdate();
  }

  CodePushUpdate = () => {
    CodePush.sync({
        // 有弹窗模式
        // updateDialog: {
        //   appendReleaseDescription: true,
        //   descriptionPrefix: '更新内容：\n',
        //   title: '更新',
        //   mandatoryUpdateMessage: 'XXXXX',
        //   mandatoryContinueButtonLabel: '更新',
        // },
        // mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,

        // 无弹窗
        updateDialog: false,
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
      this.codePushOnBinaryVersionMismatch.bind(this),
    );
  };

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: '正在检查更新' });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: '正在下载更新包 ' });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: '等待用户动作' });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: '正在安装更新.' });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: '应用已更新.', progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: '用户取消了更新.', progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: '应用已下载，将在下次启动时应用更新',
          progress: false,
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: '发生未知错误.', progress: false });
        break;
    }
  }

  codePushOnBinaryVersionMismatch(binary) {
    console.log('handleBinaryVersionMismatchCallback');
    //console.log(binary);
    Alert.alert(JSON.stringify(binary) + 'native apk？');
  }

  codePushDownloadDidProgress(progress) {
    //alert(JSON.stringify(progress)+"dowload byte")
    this.setState({ progress });
    //Toast.loading(`${progress.receivedBytes} of ${progress.totalBytes} bytes received`)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.syncMessage}
        </Text>
        <Text style={styles.welcome}>
          我是要更新的文字：下午3：37
          修改安装方式为下次启动安装
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
