import {useLoaderData, useNavigate, useSearchParams} from "react-router-dom";
import {Paragraphs} from "./Paragraphs";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {TopBar} from "./TopBar";
import {getScrollPosition, parsePosition} from "./ScrollPosition";

export function Reader() {
  const book = useLoaderData();
  const [params,] = useSearchParams();
  const navigate = useNavigate();
  const encodedPosition = params.get('pos');
  const position = (encodedPosition !== null) ? parsePosition(encodedPosition)
      : null;
  const language = params.get('lang') ?? 'en';

  function setLanguage(language) {
    console.log(`/books/${book.id}?lang=${language}`)
    navigate(`/books/${book.id}?lang=${language}&pos=${getScrollPosition()}`)
  }

  return (
      <div className="reader">
        <TopBar
            supportedLanguages={book.translations.map((translation) => translation.language)}
            activeLanguage={language}
            onLanguageChanged={setLanguage}
        />
        <div id="content">
          <Paragraphs
              book={book}
              language={language}
              scrollPosition={position}/>
        </div>
      </div>
  );
}