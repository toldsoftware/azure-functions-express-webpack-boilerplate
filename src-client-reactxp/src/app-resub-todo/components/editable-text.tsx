import * as RX from 'reactxp';
import ImageSvg, { SvgPath } from 'reactxp-imagesvg';
import { SimpleComponentBase } from './common/index';
import { Debug } from './debug';
import { ConfirmEdit, ConfirmEditStyle } from './confirm-edit';
import { EditIcon } from './icons/edit';
import { createIconStyle } from './icons/icon-base';
import { AnimView } from './common/index';

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    editIcon: createIconStyle({
        fontSize: 16,
        padding: 0
    })
};

export class EditableText extends SimpleComponentBase<
    {
        text: string,
        placeholder?: string,
        isEditing?: boolean,
        onChange: (v: string) => void,
        style?: RX.Types.TextStyle,
        editStyle?: RX.Types.TextStyle,
        confirmEditStyle: ConfirmEditStyle,
        buttonStyle?: RX.Types.ButtonStyle,
    },
    {
        isEditing: boolean,
        title_editing: string
    }> {

    startEdit = () => {
        console.log('edit');

        this.setState({
            isEditing: true,
            title_editing: this.props.text,
        });
    }

    setTitle_Editing = (v: string) => {
        console.log('setTitle_Edit');

        this.setState({
            isEditing: this.state.isEditing,
            title_editing: v,
        });
    }
    acceptEdit = () => {
        console.log('acceptEdit');

        this.props.onChange(this.state.title_editing);

        this.setState({
            isEditing: false,
            title_editing: this.props.text,
        });
    }

    cancelEdit = () => {
        console.log('cancelEdit');

        this.setState({
            isEditing: false,
            title_editing: this.props.text,
        });
    }

    private _isNew = true;
    render() {

        // HACK
        if (this.props.isEditing && this._isNew) {
            this._isNew = false;
            setTimeout(() => {
                this.startEdit();
            });
        }

        return (
            <AnimView style={styles.row} shouldAnimateKey={this.props.text + '' + this.state.isEditing}>
                <Debug />
                {!this.state.isEditing ?
                    (
                        <AnimView style={styles.row}>
                            <RX.Text style={this.props.style} onPress={this.startEdit}>
                                {this.props.text}
                            </RX.Text>
                            <RX.Button onPress={this.startEdit} style={this.props.buttonStyle}>
                                <EditIcon style={styles.editIcon} />
                            </RX.Button>
                        </AnimView>
                    ) : (
                        <AnimView style={styles.row} >
                            <AutoScrollTextInput
                                style={this.props.editStyle}
                                value={this.state.title_editing} onChangeText={this.setTitle_Editing} onSubmitEditing={this.acceptEdit}
                                placeholder={this.props.placeholder}
                            />
                            <ConfirmEdit onAccept={this.acceptEdit} onCancel={this.cancelEdit}
                                style={this.props.confirmEditStyle} buttonStyle={this.props.buttonStyle} />
                        </AnimView>
                    )}
            </AnimView>
        );
    }
}

class AutoScrollTextInput extends SimpleComponentBase<{
    style?: RX.Types.TextInputStyle,
    value: string,
    placeholder: string,
    onChangeText: (value: string) => void,
    onSubmitEditing: () => void
}> {

    componentDidMount() {
        const el = this.refs['textInput'];
        // console.log('AutoScrollTextInput.componentDidMount', el);
        if ((el as any).focus) {
            setTimeout(() => {
                (el as any).focus();
            });
        }
    }

    render() {
        return (
            <RX.TextInput
                ref='textInput'
                style={this.props.style}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholder={this.props.placeholder}
                autoFocus={true}
            />
        );
    }
}
