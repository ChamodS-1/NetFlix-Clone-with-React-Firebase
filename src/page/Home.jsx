import React from 'react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import endpoints from '../services/moveiApi'

const Home = () => {
  return (
    <>
    <Hero />
    <MovieRow title='upcoming'  url={endpoints.upcoming}/>
    <MovieRow title='tranding'  url={endpoints.trending} />
    <MovieRow title='top rated'  url={endpoints.topRated}/>
    <MovieRow title='comedy'  url={endpoints.comedy}/>
    <MovieRow title='popular'  url={endpoints.popular}/>
    </>
  )
}

export default Home