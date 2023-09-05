import { useState } from "react"

export interface TabProps {
    tabs: { name: string, content: JSX.Element }[],
    variant?: 'button' | 'underlined'
}

export const Tabs = ({ tabs, variant = 'underlined' }: TabProps) => {

    const [activeTabIndex, setActiveTabIndex] = useState(0)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    if (variant === 'button') {
        return (
            <>
                <nav className="hidden lg:flex lg:space-x-4 lg:py-2" aria-label="Global">
                    {tabs.map((item, idx) => (
                        <a
                            key={item.name}
                            onClick={() => setActiveTabIndex(idx)}
                            className={classNames(
                                idx === activeTabIndex ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900 cursor-pointer',
                                'inline-flex items-center rounded-md py-1 px-3 text-sm font-medium cursor-pointer'
                            )}
                            aria-current={idx === activeTabIndex ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
                <div className="">
                    {tabs[activeTabIndex].content}
                </div>
            </>
        )
    }

    if (variant === 'underlined') {
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
                                        ? 'border-blue-500 text-blue-500 cursor-pointer'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer',
                                    'whitespace-nowrap border-b-2 pb-1 px-1 text-sm font-medium cursor-pointer'
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

    return null
}