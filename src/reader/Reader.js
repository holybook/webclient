import {useLoaderData, useSearchParams} from "react-router-dom";
import {Paragraphs} from "./Paragraphs";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {TopBar} from "./TopBar";
import {parsePosition} from "./ScrollPosition";

export function Reader() {
    const book = useLoaderData();
    const [params,] = useSearchParams();
    console.log('params: ', params.get('lang'));
    const position = parsePosition(params.get('pos'));
    const language = params.get('lang') ?? 'en';

    return (
        <div className="reader">
            <TopBar book={book} language={language} />
            <div id="content">
                <Paragraphs
                    book={book}
                    language={language}
                    scrollIndex={position.index}
                    scrollOffset={position.offset}/>
            </div>
        </div>
    );
}