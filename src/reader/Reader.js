import {useLoaderData, useSearchParams} from "react-router-dom";
import {ParagraphsVirtualized} from "./ParagraphsVirtualized";
import {Paragraphs} from "./Paragraphs";

export function Reader() {
    const book = useLoaderData();
    const [params,] = useSearchParams();
    return (<div className="reader">
        <Paragraphs book={book} language={params.get('lang') ?? 'en'}/>
    </div>);
}