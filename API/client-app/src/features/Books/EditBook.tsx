import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import {
    combineValidators, isRequired,
} from 'revalidate';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
    bookName: isRequired({ message: 'The Book Name is required' }),
});

interface IdParams {
    id: string;
}

const EditBook: React.FC<RouteComponentProps<IdParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        editBook,
        submitting,
        getBook,
        loadBooks,
        loadBook
    } = rootStore.bookStore;

    const [book, setBook] = useState(getBook(parseInt(match.params.id)));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadBook(parseInt(match.params.id))
                .then(book => {
                    setBook(book);
                })
                .finally(() => setLoading(false));
        }
    }, [loadBooks, match.params.id]);

    const handleFinalFormSubmit = (values: any) => {

        let activityIdandBook = {
            id: parseInt(match.params.id),
            bookname: values.bookName
        }

        editBook(activityIdandBook);
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={book}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='bookName'
                                    placeholder='bookname'
                                    value={book.bookName}
                                    component={TextInput}
                                />
                                <Button
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content='Submit'
                                />
                                <Button
                                    onClick={
                                        () => history.push(`/booklist`)
                                    }
                                    disabled={loading}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(EditBook);
