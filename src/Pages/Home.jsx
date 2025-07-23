import React, { useEffect, useState } from 'react'
import SideNavGenreList from '../Components/SideNavGenreList'
import GlobalApi from '../Servies.js/GlobalApi.jsx'
import Slider from '../Components/Slider'
import PopularGameList from '../Components/PopularGameList'
import TrendingGameList from '../Components/TrendingGameList'

function Home() {
    const [gameList,setGameList]=useState([])
    const [gameListByGenre,setGameListByGenre]=useState([])

    

    useEffect(()=>{
      
      GlobalApi.getPopularGame().then(resp=>{
        const gamesWithPrice = resp.data.results.map(game => ({
          ...game,
          price: (Math.random() * 50 + 10).toFixed(2) // $10 - $60
        }));
        setGameList(gamesWithPrice);
       
    })
    getGameList(4)
    },[])
    const getGameList=(genreId)=>{
      console.log(genreId)
      if(genreId!=0)
      {
        GlobalApi.getGameListByGenreId(genreId).then(resp=>{
          const gamesWithPrice = resp.data.results.map(game => ({
            ...game,
            price: (Math.random() * 50 + 10).toFixed(2)
          }));
          setGameListByGenre(gamesWithPrice)
      })
      }
     
        
      
      
    }
  return (
    <div className='grid grid-cols-4 p-8'>
        <div className='hidden md:flex'><SideNavGenreList 
        selectedGenreId={(genreId)=>getGameList(genreId)} /></div>
       {gameList?.length&&gameListByGenre?.length>0    ? 
       <div className='md:col-span-3 col-span-4 px-3'>
            <Slider game={gameListByGenre[0]} />
            <TrendingGameList gameList={gameList}/>
            <PopularGameList gameList={gameListByGenre} />
        </div>
        :null}
    </div>
  )
}

export default Home