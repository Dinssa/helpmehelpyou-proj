import './SearchBar.css'
import { Form, FormControl, InputGroup } from 'react-bootstrap';

export default function SearchBar({searchQuery, setSearchQuery, searchPlaceholder="Search"}){

  function handleChanges(e){
    console.log(e.target.value)
    setSearchQuery(e.target.value)
  }

  function handleOnSubmit(e){
    e.preventDefault()
  }

  return (
      <div className="SearchBar">
          <Form className="search d-flex" onSubmit={handleOnSubmit}>
            <InputGroup>
              <InputGroup.Text id="search-icon"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
              <FormControl
                type="search"
                placeholder={searchPlaceholder}
                className="search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handleChanges}
              />
            </InputGroup>
          </Form>
      </div>
    )
}