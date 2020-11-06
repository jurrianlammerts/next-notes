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
  const [inputRef, setInputFocus] = useFocus();
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    open && setInputFocus();
  }, [open]);

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

  const onSelect = (item) => {
    router.push(`/posts/${item.id}`);
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
