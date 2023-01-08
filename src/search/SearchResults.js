import {TopBar} from "./TopBar";
import {useLoaderData, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import {getSupportedLanguages} from "../common/Utils";

export function SearchResultsPage() {
    const books = useLoaderData();
    const [params,] = useSearchParams();
    const query = params.get('q');
    const language = params.get('lang') ?? 'en';

    return (<div className="search-results">
        <TopBar
            supportedLanguages={getSupportedLanguages(books)}
            activeLanguage={language}/>
        <div id="content">
            <SearchResults
                query={query}
                language={language}/>
        </div>
    </div>);
}

function SearchResults({query, language}) {
    const [state, setState] = useState(null);

    function fetchSearchResults(query, language) {
        fetch(
            `http://0.0.0.0:8080/search?q=${query}&lang=${language}`)
            .then(response => {
                return response.json();
            })
            .then(results => {
                setState({
                    results: results,
                    language: language,
                    query: query
                });
            });
    }

    if (state === null || query !== state.query || language !== state.language) {
        fetchSearchResults(query, language)
    }

    if (state === null) {
        return <div>
            Loading...
        </div>
    }

    return state.results.map((result) =>
        <SearchResult
            data={result}
            key={`${result.bookId}:${result.paragraph.index}`}
        />
    )
}

function SearchResult({data}) {
    return (
        <p className="par">
            {data.paragraph.text}
        </p>
    )
}