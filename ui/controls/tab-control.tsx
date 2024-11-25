'use client'

import React, { useState, useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { LucideIcon } from 'lucide-react'

interface TabItem {
  icon: LucideIcon
  title: string
  onRender: () => React.ReactNode
}

interface TabControlProps {
  items: TabItem[]
  defaultTab?: string
}

const TabControl: React.FC<TabControlProps> = ({ items, defaultTab }) => {
  
  const [activeTab, setActiveTab] = useState(defaultTab || items[0].title)


  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <Tabs.List className="flex border-b border-gray-200">
        {items.map((item) => (
          <Tabs.Trigger
            key={item.title}
            value={item.title}
            className={`flex items-center px-4 text-sm font-medium transition-colors ${
              activeTab === item.title
                ? 'text-[#017269] border-b-2 border-[#017269]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-2" />
            {item.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content key={item.title} value={item.title} className="py-4">
          {item.onRender()}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export default TabControl
