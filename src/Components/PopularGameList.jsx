import React from 'react'
import GlobalApi from '../Servies.js/GlobalApi.jsx'
import { useCart } from '../Context/CartContext'

function PopularGameList({gameList}) {
    const { addToCart } = useCart();
    const getMovieDetails=(id)=>{
        GlobalApi.getMovieDetails(id).then(resp=>{
            console.log(resp);
        })
    }   
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-[30px] dark:text-white mb-4'>Popular Games</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7'>
            {gameList.map((item)=>(
                <div className='pb-8 bg-slate-100 dark:bg-gray-800 p-4 rounded-lg h-full flex flex-col justify-between shadow hover:scale-105 transition-all duration-300 cursor-pointer' 
                onClick={()=>getMovieDetails(item.id)}
                key={item.id}>
                    <img src={item.background_image} width={1080} 
                    className='w-full h-48 rounded-xl object-cover mb-3'/>
                    <div className='flex-1 flex flex-col justify-between'>
                      <h2 className='text-[20px] font-bold text-gray-900 dark:text-white mb-1'>{item.name}</h2>
                      <div className='flex items-center text-gray-500 text-sm mb-2'>
                        <span className='mr-2'>⭐{item.rating}</span>
                        <span className='mr-2'>💬{item.reviews_count}</span>
                        <span className='mr-2'>🔥{item.suggestions_count}</span>
                        {item.metacritic && <span className='ml-auto px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold'>{item.metacritic}</span>}
                      </div>
                      <div className='flex justify-between items-center mt-2'>
                        <span className='text-xl font-bold text-blue-700'>${item.price}</span>
                        <button className='bg-emerald-600 text-black font-bold text-base px-4 py-2 rounded shadow border border-emerald-800 hover:bg-emerald-800 transition' onClick={e => { e.stopPropagation(); addToCart(item); }}>Add to Cart</button>
                      </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PopularGameList