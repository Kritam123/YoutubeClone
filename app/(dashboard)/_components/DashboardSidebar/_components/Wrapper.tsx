import React from 'react'

const Wrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <aside className="fixed h-[calc(100%-56px)] top-[56px] left-0 pr-1 sidebar bg-white  py-3 border-r shadow-sm  overflow-y-auto flex flex-col w-[16rem] bg-background  z-50">
        {children}
    </aside>
  )
}

export default Wrapper