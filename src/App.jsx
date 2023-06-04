import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { useGlobalContext } from './context'
import { useQuery } from '@tanstack/react-query'
import unsplashFetch from './utils'

const App = () => {
  return (
    <main>
      <ThemeToggle />
      <Form />
      <Gallery />
    </main>
  )
}

const ThemeToggle = () => {
  const { toggleTheme, isDarkTheme } = useGlobalContext()
  return (
    <div className="theme-container">
      <button onClick={toggleTheme} type="button">
        {isDarkTheme ? (
          <BsFillMoonFill className="toggle-icon" />
        ) : (
          <BsFillSunFill className="toggle-icon" />
        )}
      </button>
    </div>
  )
}

const Form = () => {
  const { setSearchImages } = useGlobalContext()
  function handleSubmit(e) {
    e.preventDefault()
    const inputSearch = e.target.search.value
    if (!inputSearch) return
    setSearchImages(inputSearch)
    e.target.search.value = ''
  }
  return (
    <div className="form-container">
      <h1>Unsplash images</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" id="name" placeholder="cat" />
        <button type="submit">search</button>
      </form>
    </div>
  )
}

const Gallery = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const { searchImages } = useGlobalContext()
  const results = useQuery({
    queryKey: ['images', searchImages],
    queryFn: async () =>
      await unsplashFetch.get(
        `/search/photos?client_id=${apiKey}&query=${searchImages}`
      ),
  })
  if (results.isLoading) {
    return (
      <section>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>{' '}
      </section>
    )
  }
  if (results.isError) {
    return (
      <section>
        <h1>An error occurred</h1>
      </section>
    )
  }
  const { data } = results.data

  if (data.results.length < 1) {
    return (
      <section>
        <h1>No results found...</h1>
      </section>
    )
  }
  return (
    <section>
      {data.results.map((image) => {
        const { id, alt_description, urls } = image
        return (
          <article key={id}>
            <img src={urls.regular} alt={alt_description} />
          </article>
        )
      })}
    </section>
  )
}

export default App
