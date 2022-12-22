import {AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {useLoaderData} from "react-router-dom"; // only needs to be imported once

const cache = new CellMeasurerCache({
    defaultHeight: 60,
    fixedWidth: true
});
const list = [];

function isRowLoaded({index}) {
    return !!list[index];
}

function rowRenderer({key, index, parent, style}) {
    if (!isRowLoaded({index})) {
        return <div key={key}>Loading...</div>
    }

    return (
        <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            overscanRowCount={10}
            parent={parent}
            rowIndex={index}
        >
            <div
                key={key}
                style={style}>
                {list[index].text}
            </div>
        </CellMeasurer>
    );
}

export function Reader() {
    const book = useLoaderData();
    return (<div className="reader">
        <Paragraphs book={book}/>
    </div>);
}

function Paragraphs({book}) {

    function loadMoreRows({startIndex, stopIndex}) {
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
        {({onRowsRendered, registerChild}) => (
            <AutoSizer>
                {({width, height}) => (
                    <List
                        height={height}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={book.paragraphCount}
                        rowHeight={cache.rowHeight}
                        rowRenderer={rowRenderer}
                        width={width}
                    />)}
            </AutoSizer>
        )}
    </InfiniteLoader>
}