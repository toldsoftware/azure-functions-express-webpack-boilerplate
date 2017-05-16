import * as RX from 'reactxp';
import { ComponentBase } from 'resub';
import ImageSvg, { SvgPath } from 'reactxp-imagesvg';
import { Debug } from './debug';
import { ConfirmEdit, ConfirmEditStyle } from './confirm-edit';
import { EditIcon } from './icons/edit';
import { createIconStyle } from './icons/icon-base';

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
    }),
    editIcon: createIconStyle({
        fontSize: 16,
        padding: 0
    })
};

export class EditableText extends ComponentBase<
    {
        text: string,
        onChange: (v: string) => void,
        style?: RX.Types.TextStyle,
        editStyle?: RX.Types.TextStyle,
        confirmEditStyle: ConfirmEditStyle,
    },
    {
        isEditing: boolean,
        title_edit: string
    }> {

    protected _buildState() {
        return {
            isEditing: false,
            title_edit: '',
        };
    }

    startEdit = () => {
        console.log('edit');

        this.setState({
            isEditing: true,
            title_edit: this.props.text,
        });
    }

    setTitle_Edit = (v: string) => {
        console.log('setTitle_Edit');

        this.setState({
            isEditing: this.state.isEditing,
            title_edit: v,
        });
    }
    acceptEdit = () => {
        console.log('acceptEdit');

        this.props.onChange(this.state.title_edit);

        this.setState({
            isEditing: false,
            title_edit: this.props.text,
        });
    }

    cancelEdit = () => {
        console.log('cancelEdit');

        this.setState({
            isEditing: false,
            title_edit: this.props.text,
        });
    }

    render() {
        return (
            <RX.View style={styles.row}>
                <Debug />
                {!this.state.isEditing ?
                    (
                        <RX.View style={styles.row}>
                            <RX.Text style={this.props.style} onPress={this.startEdit}>
                                {this.props.text}
                            </RX.Text>
                            <RX.Button onPress={this.startEdit}>
                                <EditIcon style={styles.editIcon} />
                            </RX.Button>
                        </RX.View>
                    ) : (
                        <RX.View style={styles.row}>
                            <RX.TextInput
                                style={this.props.editStyle} autoFocus={true}
                                value={this.state.title_edit} onChangeText={this.setTitle_Edit} onSubmitEditing={this.acceptEdit} />
                            <ConfirmEdit onAccept={this.acceptEdit} onCancel={this.cancelEdit} style={this.props.confirmEditStyle} />
                        </RX.View>
                    )}
            </RX.View>
        );
    }
}
