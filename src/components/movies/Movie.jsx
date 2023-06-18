const Movie = ({item, config}) => {
  return (
    <div className="mb-3 rounded-lg border-slate-200 border-2">
        {config?.images?.base_url && <div>
                <img className="w-full max-w-full shadow-md shadow-slate-600 mb-4" 
                    src={config.images.base_url + "w500" + item.poster_path} 
                    alt={item.title + " poster"}/>
            </div>}
        <h2 className="text-2xl px-3">{item.title}</h2>
    </div>
  )
}

export default Movie