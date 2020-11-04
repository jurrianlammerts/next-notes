
import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import Downshift from 'downshift'

import {menuStyles, comboboxStyles} from '../shared'

export default function Search() {

  const searchRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query: string) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]


  return (
    <Downshift
    onChange={(selection) =>
      alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
    }
    itemToString={(item) => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      getLabelProps,
      getToggleButtonProps,
      inputValue,
      highlightedIndex,
      selectedItem,
      isOpen,
    }) => (
      <div style={comboboxStyles}>
        <label {...getLabelProps()}>Enter a fruit:</label>
        <input {...getInputProps()} />
        <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
          &#8595;
        </button>
        <ul {...getMenuProps()} style={menuStyles}>
          {isOpen &&
            items
              .filter((item) => !inputValue || item.value.includes(inputValue))
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: `${item.value}${index}`,
                    item,
                    index,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.value}
                </li>
              ))}
        </ul>
      </div>
    )}
  </Downshift>
  )
}

//   return (
//     <div
//       ref={searchRef}
//     >
//       <input
//         onChange={onChange}
//         onFocus={onFocus}
//         placeholder='Search posts'
//         type='text'
//         value={query}
//       />
//       { active && results.length > 0 && (
//         <ul>
//           {results.map(({ id, title }) => (
//             <li key={id}>
//               <Link href="/posts/[id]" as={`/posts/${id}`}>
//                 <a>{title}</a>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) }
//     </div>
//   )
// }

