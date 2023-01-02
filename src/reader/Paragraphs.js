import React, {useLayoutEffect, useRef, useState} from 'react';
import {setTopPosition} from "./ScrollPosition";

export function Paragraphs({book, language, scrollIndex, scrollOffset}) {

    const [state, setState] = useState({
        language: null,
        paragraphs: []
    });

    function fetchParagraphs(language) {
        fetch(`http://0.0.0.0:8080/books/${book.id}/paragraphs?lang=${language}`)
            .then(response => {
                return response.json()
            })
            .then(paragraphs => {
                setState({
                    language: language,
                    paragraphs: paragraphs
                })
            })
    }

    if (state.language !== language) {
        // refetch
        fetchParagraphs(language)
    }

    if (state.language === null) {
        return <div>
            Loading...
        </div>
    }

    return state.paragraphs.map((paragraph) =>
        <Paragraph
            paragraph={paragraph}
            key={paragraph.index}
            scrollIndex={scrollIndex}
            scrollOffset={scrollOffset}/>
    )
}

function Paragraph({paragraph, scrollIndex, scrollOffset}) {

    const ref = useRef(null);
    useLayoutEffect(() => {
        const topPosition = ref.current.offsetTop;
        setTopPosition(paragraph.index, topPosition);
        if (paragraph.index === scrollIndex) {
            document.getElementById('content').scrollTo({
                top: topPosition - scrollOffset
            });
        }
    });

    return (<p ref={ref} className={`par ${paragraph.type}`}>
        <span className="index">{paragraph.index}</span> {paragraph.text}
    </p>);
}