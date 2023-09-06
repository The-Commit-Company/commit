import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = ({ navigation }: { navigation: { name: string, content: JSX.Element }[] }) => {
    return (
        <Disclosure as="header" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-4">
                        <div className="relative flex h-16 justify-between">
                            <div className="relative z-10 flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center space-x-2">
                                    {/* <img
                                        className="h-8 w-auto"
                                        src="https://avatars.githubusercontent.com/u/125638080?s=200&v=4"
                                        alt="The Commit Company"
                                    /> */}
                                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-zinc-500">commit
                                        <span className="text-green-500">.</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                {/* <div className="w-full sm:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                <Button variant='outline' color='primary' size={'sm'}>
                                    <GitHubLogoIcon className='w-4 h-4 mr-2' /> Github
                                </Button>
                                <div className="hidden lg:relative lg:z-10 lg:ml-2 lg:flex lg:items-center">
                                    <a href="#_" className="relative px-5 py-1 font-medium text-white transition duration-300 bg-blue-400 rounded-md hover:bg-blue-500 ease">
                                        <span className="absolute bottom-0 left-0 h-full -ml-2">
                                            <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                                        </span>
                                        <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                                            <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                                        </span>
                                        <span className="relative">Share Feedback</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* FIXME: Enable Tabs Only after other tabs are ready */}
                        {/* <Tabs tabs={navigation} variant='button' /> */}
                    </div>
                </>
            )
            }
        </Disclosure >
    )
}
