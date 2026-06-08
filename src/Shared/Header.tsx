const Header = () => {

    return (
        <header className='w-full bg-background broder-1 border-b border-slate-light  p-4'>
            <div className='flex items-center justify-end me-auto gap-4'>
                <div className='text-center'>
                    <h3 className='title-md'>Hossam Ahmed</h3>
                    <p className='text-primary font-bold'>Front end developer</p>
                </div>
                <div className='bg-primary-container font-semibold w-10 h-10 rounded-sm text-2xl flex items-center justify-center'>
                    HA
                </div>
            </div>
        </header>
    )
}

export default Header