import { useState } from "react"

export interface TabProps {
    tabs: { name: string, content: JSX.Element }[],
}

export const Tabs = ({ tabs }: TabProps) => {

    const [activeTabIndex, setActiveTabIndex] = useState(0)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200 space-x-8">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTabIndex(idx)}
                            className={classNames(
                                idx === activeTabIndex
                                    ? 'border-blue-500 text-blue-500'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 pb-1 px-1 text-sm font-medium'
                            )}
                            aria-current={idx === activeTabIndex ? 'page' : undefined}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-2">
                {tabs[activeTabIndex].content}
            </div>
        </div>
    )
}