import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {useLoaderData} from "react-router-dom"; // only needs to be imported once

const list = [];

function isRowLoaded ({ index }) {
    return !!list[index];
}

function rowRenderer({ key, index, style }) {
    if (!isRowLoaded({ index })) {
        return <div key={key}>Loading...</div>
    }

    return (
        <div
            key={key}
            style={style}>
            {list[index].text}
        </div>
    );
}

export function Reader() {
    const book = useLoaderData();
    return <Paragraphs book={book}/>
}

function Paragraphs({ book }) {

    function loadMoreRows ({ startIndex, stopIndex }) {
        return fetch(`http://0.0.0.0:8080/books/${book.id}/paragraphs?start=${startIndex}&end=${stopIndex}`)
            .then(response => {
                return response.json()
            })
            .then(paragraphs => {
                paragraphs.forEach((paragraph) => {
                    list[paragraph.index] = paragraph
                })
            })
    }

    return <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={book.paragraphCount}
    >
        {({ onRowsRendered, registerChild }) => (
            <List
                height={200}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowCount={book.paragraphCount}
                rowHeight={200}
                rowRenderer={rowRenderer}
                width={300}
            />
        )}
    </InfiniteLoader>
}