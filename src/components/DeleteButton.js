import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react';
import DeleteButtonConfirmation from './DeleteConfirmation';

function DeleteButton(props) {
    const [open,setOpen] = useState(false)
    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setOpen(true)}
                style={{
                    height: "2.5rem"
                }}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <DeleteButtonConfirmation trigger={open} setTrigger={setOpen} cardId={props.cardId} cardOp={props.cardOp} />
        </>
    )
}

export default DeleteButton;