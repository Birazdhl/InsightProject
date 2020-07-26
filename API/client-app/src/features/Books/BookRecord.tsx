import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Dropdown, Button } from 'semantic-ui-react';

const BookRecord: React.FC<RouteComponentProps> = ({ history }) => {

    const rootStore = useContext(RootStoreContext);
    const { bookRecords, bookRecordList, setBookRecordStatus, recordBookStatus, loadingInitial } = rootStore.bookStore;

    useEffect(() => {
        bookRecords()
    }, [bookRecords])

    const onChange = (status: any) => {
        setBookRecordStatus(status);
    }

    if (loadingInitial)
        return <LoadingComponent content='Loading books records' />;

    return (
        <div>
            <Dropdown
                className='record'
                selectOnNavigation={false}
                selection
                name='false'
                options={[{ key: "all", text: "All", value: "all" }, { key: "delayed", text: "Delayed", value: "delayed" }, { key: "onTime", text: "On Time", value: "onTime" }]}
                // value={status}
                defaultValue={recordBookStatus}
                onChange={(e, data) => onChange(data.value)}
            />

            <table className="ui celled table">
                <thead>
                    <tr>
                        <th className='recordHeader'>Book Name</th>
                        <th className='recordHeader'>Taken By</th>
                        <th className='recordHeader'>Taken On</th>
                        <th className='recordHeader'>Return Date</th>
                        <th className='recordHeader'>Delayed Time</th>
                        <th className='recordHeader'>Deadline</th>

                    </tr>
                </thead>
                <tbody>
                    {bookRecordList.map(bookRecord => (
                        <tr key={bookRecord.id} className={bookRecord.daysDelayed <= 0 ? 'returnedOnTime' : 'returnedLately'}>
                            {console.log(bookRecord)}
                            <td data-label="bookName">{bookRecord.bookName}</td>
                            <td data-label="takenBy">{bookRecord.takenBy}</td>
                            <td data-label="takenOn">{format(bookRecord.takenOn, 'eeee do MMMM')}</td>
                            <td data-label="dealine">{format(bookRecord.deadline, 'eeee do MMMM')}</td>
                            <td data-label="returnDate">{format(bookRecord.returnDate, 'eeee do MMMM')}</td>
                            {/* <td>{Date()}</td>
                            <td></td>
                            <td></td> */}
                            <td>{bookRecord.daysDelayed <= 0 ? 'Reutrned On Time' : bookRecord.daysDelayed}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

            <Button
                onClick={() => history.push(`/booklist`)}
                floated='right'
                type='button'
                content='Back'
                color='red'
            />

        </div>
    )
}

export default observer(BookRecord);
