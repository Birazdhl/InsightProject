import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Dropdown } from 'semantic-ui-react'
import { BooksStatus } from '../../app/common/options/BookStatus'
import { RootStoreContext } from '../../app/stores/rootStore'
import BookList from './BookList'
import LibrarianManager from './LibrarianManager'

const BookDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { setStatus, status } = rootStore.bookStore;
    const { user } = rootStore.userStore;

    const onChange = (value: any) => {
        setStatus(value)
    }
    return (
        <div>
            <Dropdown
                selectOnNavigation={false}
                selection
                name='false'
                options={BooksStatus}
                value={status}
                onChange={(e, data) => onChange(data.value)}
            />
            {user!.username === 'admin' ? <LibrarianManager /> : <BookList />}

        </div>

    )
}


export default observer(BookDashboard)
