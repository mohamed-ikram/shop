import React, {Component} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions,
  defaultActions,
} from 'react-native-pell-rich-editor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class TextEditor extends Component {
  constructor() {
    super();
    this.state = {
      editorHeight: 0,
    };
    // this.richText = React.createRef();
  }
  editorInitializedCallback() {
    this.richText.registerToolbar(function (items) {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }
  onEditorChange = (html) => {
    console.log(html);
  };
  async save() {
    // Get the data here and call the interface to save the data
    console.log(this.richText);
    let html = await this.richText.getContentHtml();
    // console.log(html);
    alert(html);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardDismissMode={'none'}>
          <RichEditor
            ref={(x) => (this.richText = x)}
            placeholder={'please input content'}
            style={{flex: 1}}
            initialContentHTML={
              'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
            }
            editorInitializedCallback={() => this.editorInitializedCallback()}
            onChange={(val) => this.onEditorChange(val)}
            onHeightChange={(e) => {
              console.log('change height');
              console.log(e);
              this.setState({
                editorHeight: e,
              });
            }}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            getEditor={() => this.richText}
            style={{backgroundColor: '#F5FCFF'}}
            iconTint={'green'}
            selectedIconTint={'yellow'}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            iconMap={{
              [actions.setBold]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-bold"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
              [actions.setItalic]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-italic"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
              [actions.setUnderline]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-underline"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
              [actions.setStrikethrough]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-strikethrough-variant"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
              [actions.insertBulletsList]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
              [actions.insertOrderedList]: ({tintColor}) => (
                <MaterialCommunityIcons
                  name="format-list-numbered"
                  color={tintColor}
                  style={styles.toolbarButton}
                />
              ),
            }}
            // customAction={this.handleCustomAction}
          />
        </KeyboardAvoidingView>
      </View>      
    );
  }
}

const styles = {
  toolbarButton: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TextEditor;
