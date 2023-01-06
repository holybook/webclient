import {TopBar} from './TopBar';
import {useLoaderData, useSearchParams} from 'react-router-dom';
import {BookItem} from './BookItem';
import './Overview.scss';

export function Overview() {
  const books = useLoaderData();
  const [params,] = useSearchParams();
  const language = params.get('lang') ?? 'en';

  const bookItems = getBookItemsByLanguage(books, language);

  return (
      <div className="overview">
        <TopBar supportedLanguages={getSupportedLanguages(books)}
                activeLanguage={language}/>
        <div id="content">
          {bookItems.map(
              item =>
                  <BookItem title={item.title} language={item.language}
                            id={item.id} key={item.id}
                  />)}
        </div>
      </div>
  );
}

function getSupportedLanguages(books) {
  const languageSet = new Set();
  for (const book of books) {
    for (const translation of book.translations) {
      languageSet.add(translation.language);
    }
  }
  return Array.from(languageSet).sort();
}

function getBookItemsByLanguage(books, language) {
  return books.map(book => {
    return getBookItemByLanguage(book, language);
  }).sort((a, b) => a.title.localeCompare(b.title))
}

function getBookItemByLanguage(book, language) {
  return {
    id: book.id,
    language: language,
    title: findTitle(book.translations, language)
  };
}

function findTitle(translations, language) {
  return translations.find(t => t.language === language).title;
}