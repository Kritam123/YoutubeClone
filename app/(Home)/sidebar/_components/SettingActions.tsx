'use client'
import React from 'react'
import Listitem from "./Listitem";
import { settingActions } from "@/utils/sidebarData";
const SettingActions = () => {
  return (
    <div className="py-3">
      {settingActions &&
        settingActions.map(({icon,name,href}) => (
          <Listitem key={name}  icon= {icon} name={name} href={href as any} />
        ))}
    </div>
  )
}

export default SettingActions