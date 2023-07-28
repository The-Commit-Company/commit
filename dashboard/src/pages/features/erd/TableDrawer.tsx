import { PostgresTable } from "@/types/Table"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ICON_KEY_MAP, ICON_KEY } from "@/components/common/Icons"

export interface Props {
    data: PostgresTable
    isOpen: boolean
    onClose: () => void
}

export const TableDrawer = ({ data, isOpen, onClose }: Props) => {


    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-end">
                                                {/* <h2 id="slide-over-heading" className="text-2xl font-semibold leading-6 text-gray-900">
                                                    {data.name}
                                                </h2> */}
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                                        onClick={onClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Main */}
                                        <div>
                                            <div className="pb-1 sm:pb-6">
                                                <div>
                                                    {/* <div className="relative h-40 sm:h-56 m-2">
                                                        <img
                                                            className="absolute h-full w-full object-cover"
                                                            src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
                                                            alt=""
                                                        />
                                                    </div> */}
                                                    <div className="px-4  sm:flex sm:items-end sm:px-6">
                                                        <div className="sm:flex-1">
                                                            <div>
                                                                <div className="flex items-center">
                                                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{data.name}</h3>
                                                                    {/* <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                                                        <span className="sr-only">Online</span>
                                                                    </span> */}
                                                                </div>
                                                                <p className="text-sm text-gray-500">created on : {data.creation}</p>
                                                            </div>
                                                            {/* <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                                                >
                                                                    Message
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                >
                                                                    Call
                                                                </button>
                                                                <div className="ml-3 inline-flex sm:ml-0">
                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <Menu.Button className="inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                            <span className="sr-only">Open options menu</span>
                                                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </Menu.Button>
                                                                        <Transition
                                                                            as={Fragment}
                                                                            enter="transition ease-out duration-100"
                                                                            enterFrom="transform opacity-0 scale-95"
                                                                            enterTo="transform opacity-100 scale-100"
                                                                            leave="transition ease-in duration-75"
                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                            leaveTo="transform opacity-0 scale-95"
                                                                        >
                                                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                <div className="py-1">
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a
                                                                                                href="#"
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                    'block px-4 py-2 text-sm'
                                                                                                )}
                                                                                            >
                                                                                                View profile
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a
                                                                                                href="#"
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                    'block px-4 py-2 text-sm'
                                                                                                )}
                                                                                            >
                                                                                                Copy profile link
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                            </Menu.Items>
                                                                        </Transition>
                                                                    </Menu>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                                                <dl className="space-y-4 px-4 sm:space-y-2 sm:px-6">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Module : {data.module}</dt>
                                                        {/* <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            <p>
                                                                Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus
                                                                feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum
                                                                aenean arcu.
                                                            </p>
                                                        </dd> */}
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Last Modified: {data.modified}</dt>
                                                        {/* <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">New York, NY, USA</dd> */}
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Modified By: {data.modified_by}</dt>
                                                        {/* <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">ashleyporter.com</dd> */}
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Child Table : {data.istable ? 'Yes' : 'No'}</dt>
                                                        {/* <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                            <time dateTime="1988-06-23">June 23, 1988</time>
                                                        </dd> */}
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Total fields : {data.columns.length}</dt>
                                                    </div>
                                                </dl>
                                            </div>

                                        </div>
                                        <div>
                                            <div className="px-4 py-2 sm:px-6 overflow-auto h-[60vh]">
                                                <ul role="list" className="divide-y divide-gray-100">
                                                    {data.columns.map((column) => {
                                                        const IconComponent = ICON_KEY_MAP[column.format as ICON_KEY]
                                                        return (
                                                            <li key={column.id} className="flex justify-between gap-x-6 py-2">
                                                                <div className="flex gap-x-2 items-center">
                                                                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={column.imageUrl} alt="" /> */}
                                                                    <div className="h-10 w-10 flex-none rounded-full border border-gray-200 flex items-center justify-center">
                                                                        <IconComponent className="h-6 w-6" />
                                                                    </div>

                                                                    <div className="min-w-0 flex-auto">
                                                                        <p className="text-sm font-semibold leading-4 text-gray-900">{column.name}</p>
                                                                        <p className="mt-1 truncate text-xs leading-4 text-gray-500">{column.id}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                                    <p className="text-sm leading-6 text-gray-900">{column.format}</p>
                                                                    {/* {column.lastSeen ? (
                                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                        Last seen <time dateTime={column.lastSeenDateTime}>{column.lastSeen}</time>
                                                                    </p>
                                                                ) : (
                                                                    <div className="mt-1 flex items-center gap-x-1.5">
                                                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                        </div>
                                                                        <p className="text-xs leading-5 text-gray-500">Online</p>
                                                                    </div>
                                                                )} */}
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

}