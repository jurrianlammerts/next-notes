import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Downshift from 'downshift';

const useFocus = () => {
  const htmlElRef = useRef<any>(null);
  const setFocus: any = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default function Search(props: any) {
  const [query, setQuery] = useState('');
  const [inputRef, setInputFocus] = useFocus();
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.open) setInputFocus();
  }, [props.open]);

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
    props.setOpen(false)
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
          <input {...getInputProps()} id="spotlight" ref={inputRef} />
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