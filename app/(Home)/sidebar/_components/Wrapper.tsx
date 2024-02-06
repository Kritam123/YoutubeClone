import React from 'react'

const Wrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <aside className="fixed h-[calc(100%-56px)] top-[56px] left-0 sidebar bg-white px-2 py-3  overflow-y-auto flex flex-col w-60 bg-background  z-[999]">
        {children}
    </aside>
  )
}

export default Wrapper