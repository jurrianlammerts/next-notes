import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Downshift from 'downshift';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default function Search({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [inputRef, setInputFocus] = useFocus();
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    open && setInputFocus();
  }, [open]);

  useEffect(() => {
    const recentSearch = getRecentSearch();
    if (recentSearch) setRecent(recentSearch);
  }, []);

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onInputChange = (query) => {
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  };

  const clearRecentSearch = () => {
    setRecent([]);
    localStorage.clear();
    setOpen(true);
  };

  const saveRecentSearch = (item) => {
    const current = localStorage.getItem('recent-pages');

    if (!current) localStorage.setItem('recent-pages', JSON.stringify([item]));

    if (current) {
      const array = JSON.parse(current);

      // Only push unique values to array
      const index = array.findIndex((x) => x.id == item.id);
      if (index === -1) {
        array.push(item);

        // Store max 3 pages in localstorage
        const newArray = array.slice(Math.max(array.length - 3, 0));
        localStorage.setItem('recent-pages', JSON.stringify(newArray));
      }
    }
  };

  const getRecentSearch = () => {
    const recentSearch = localStorage.getItem('recent-pages');
    const array = JSON.parse(recentSearch);
    return array;
  };

  const onSelect = (item) => {
    router.push(`/posts/${item.id}`);

    saveRecentSearch(item);
    setOpen(false);
  };

  return (
    <Downshift
      onInputValueChange={(e) => onInputChange(e)}
      onChange={(item) => onSelect(item)}
      itemToString={(item) => (item ? item.title : '')}
      initialInputValue={query}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        inputValue,
        highlightedIndex,
        selectedItem,
        isOpen,
      }) => (
        <div>
          <input
            {...getInputProps()}
            id="spotlight"
            placeholder="Search your notes..."
            ref={inputRef}
          />
          <ul {...getMenuProps()} className="results">
            {isOpen &&
              results
                .filter(
                  (item) => !inputValue || item.title.includes(inputValue),
                )
                .map((item, index) => (
                  <li
                    className="result"
                    {...getItemProps({
                      key: `${item.title}${index}`,
                      item,
                      index,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.title}
                  </li>
                ))}
            {recent.length > 0 && !query && (
              <div className="results-recent">
                <div
                  className="results-header"
                  onMouseOver={() => setShowButton(true)}
                >
                  <span>RECENT PAGES</span>
                  {showButton && (
                    <button
                      className="results-clear-btn"
                      onClick={() => clearRecentSearch()}
                    >
                      Clear
                    </button>
                  )}
                </div>
                {recent.map((item, index) => (
                  <li
                    className="result"
                    {...getItemProps({
                      key: `${item.title}${index}`,
                      item,
                      index,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.title}
                  </li>
                ))}
              </div>
            )}
            <div className="results-footer">
              <p>
                <span>↑↓</span>
                Select
              </p>
              <p>
                <span>ENTER</span> Open
              </p>
              <p>
                <span>⌘ + ENTER</span> Open in a new tab
              </p>
            </div>
          </ul>
        </div>
      )}
    </Downshift>
  );
}
