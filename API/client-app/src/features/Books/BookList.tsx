import React, { useContext, useEffect, SyntheticEvent } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';


const BookList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadBooks,
        submitting,
        requestCancelBook,
        loadingInitial,
        filterValues,
        target,
        returnSubmittedBook } = rootStore.bookStore;

    const { user } = rootStore.userStore;

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const onRequestClick = (e: SyntheticEvent<HTMLButtonElement>, requestType: string, id: number) => {
        requestCancelBook(e, requestType, id)
    }

    const returnBook = (e: SyntheticEvent<HTMLButtonElement>, id: number) => {
        returnSubmittedBook(e, id)
    }

    // const onChange = (value: any) => {
    //     setUserBookListValue(value)
    // }

    if (loadingInitial)
        return <LoadingComponent content='Loading books' />;

    return (
        <div>
            {/* <Select
                value={userBookListValue}
                onChange={(e, data) => onChange(data.value)}
                options={BooksStatus}
            /> */}

            <h1>List of Books</h1>
            {filterValues.map(books => (



                <div key={books.id}>
                    {((books.name === user!.username || books.name === null) && (books.requestedBy === user!.username || books.requestedBy === null)) ?

                        <Segment>
                            <Item.Group>
                                <Item>
                                    {console.log(books)}
                                    <Item.Image size='tiny' circular src='/assets/books.jpg' />
                                    <Item.Content>
                                        <Item.Header as='a'>{books.bookName}</Item.Header>
                                        <Item.Description>
                                            {books.isRequested ?
                                                <Button
                                                    name={books.bookName}
                                                    loading={target === books.bookName && submitting}
                                                    onClick={(e) => onRequestClick(e, 'cancel', books.id)}
                                                    color='red'
                                                    type='button'
                                                    content='Cancel Request' />
                                                :
                                                books.isTaken
                                                    ? <div>
                                                        <Label basic color='red' >This book is taken By you</Label>
                                                        <Button
                                                            name={`return${books.bookName}`}
                                                            loading={target === ('return' + books.bookName) && submitting}
                                                            color='brown'
                                                            onClick={(e) => returnBook(e, books.id)}
                                                            type='button'
                                                            content='Return this Book'
                                                        />
                                                    </div>
                                                    :
                                                    <Button
                                                        name={books.bookName}
                                                        loading={target === books.bookName && submitting}
                                                        onClick={(e) => onRequestClick(e, 'request', books.id)}
                                                        color='green'
                                                        type='button'
                                                        content='Request For Book' />}



                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>

                        : ''

                    }
                </div>


            ))}

        </div>
    )
}

export default observer(BookList);