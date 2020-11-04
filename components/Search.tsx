import { useState } from 'react';
import { useRouter } from 'next/router';
import Downshift from 'downshift';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const onInputChange = (query: string) => {
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

  const onSelect = (item: any) => {
    router.push(`/posts/${item.id}`);
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
          <input {...getInputProps()} id="spotlight" />
          <ul {...getMenuProps()} className="results">
            {isOpen &&
              results
                .filter(
                  (item: any) => !inputValue || item.title.includes(inputValue),
                )
                .map((item: any, index) => (
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
          </ul>
        </div>
      )}
    </Downshift>
  );
}
