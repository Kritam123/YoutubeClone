"use client"
import React from 'react'
import SuggestedVideoBox, { SuggestedVideoBoxSkeleton } from './SuggestedVideoBox'

const SuggestedList = ({recommendeds}:any) => {
  return (
    <div className='flex space-y-2 flex-col'>
      {
        recommendeds && recommendeds?.map((item:any)=>(
          <SuggestedVideoBox key={item?.id} item={item}/>
        ))
      }
    </div>
  )
}

export default SuggestedList

export const SuggestedListSkeleton = ()=>{
  return (
    <div className='flex space-y-2 flex-col'>
      {[0,1,2,3,4].map((_i)=>(
        <SuggestedVideoBoxSkeleton key={_i}/>
      ))}
    </div>
  )
}