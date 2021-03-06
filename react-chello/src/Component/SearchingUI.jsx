import {
  AtSymbolIcon,
  ChevronDownIcon,
  SearchIcon,
  SortAscendingIcon,
} from "@heroicons/react/solid";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveIcon,
  ArrowCircleRightIcon,
  DuplicateIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import OptionBoard from "./OptionBoard";
import BoardLabel from "./BoardLabel";

export default function SearchingUI({
  role,
  searchChange,
  options,
  setSelectedOption,
}) {
  // Open close Option modals
  const [open, setOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);

  function handleClick(opt) {
    setSelectedOption(opt);
  }
  function handleClickEveryone() {
    setSelectedOption(null);
  }
  return (
    <>
      <BoardLabel
        open={openLabel}
        setOpen={setOpenLabel}
        role={role}
      ></BoardLabel>
      <OptionBoard role={role} open={open} setOpen={setOpen}></OptionBoard>
      <div className="z-20 flex items-start mb-10">
        <div className="ml-10 relative w-fit mr-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            onChange={searchChange}
            id="search"
            name="search"
            className="block w-96 pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-slate-200 text-gray-300 placeholder-gray-400 focus:outline-none focus:slate-400 focus:border-slate-400 focus:ring-black focus:text-gray-900 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Filter Label
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <>
                        <div
                          onClick={handleClickEveryone}
                          className={
                            (active
                              ? "bg-gray-100 text-gray-900"
                              : " text-gray-700",
                            "group flex items-center px-4 py-2 text-sm cursor-pointer")
                          }
                        >
                          <AtSymbolIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          ></AtSymbolIcon>
                          Everything
                        </div>
                        <div
                          onClick={() => {
                            setSelectedOption({
                              text: "Due Date",
                            });
                          }}
                          className={
                            (active
                              ? "bg-gray-100 text-gray-900"
                              : " text-gray-700",
                            "group flex items-center px-4 py-2 text-sm cursor-pointer")
                          }
                        >
                          <AtSymbolIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          ></AtSymbolIcon>
                          Due Date
                        </div>
                        <div
                          onClick={() => {
                            setSelectedOption({
                              text: "Complete",
                            });
                          }}
                          className={
                            (active
                              ? "bg-gray-100 text-gray-900"
                              : " text-gray-700",
                            "group flex items-center px-4 py-2 text-sm cursor-pointer")
                          }
                        >
                          <AtSymbolIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          ></AtSymbolIcon>
                          Complete
                        </div>
                      </>
                    )}
                  </Menu.Item>

                  <div className="py-1">
                    {options.map((opt, idx) => (
                      <Menu.Item key={idx}>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              handleClick(opt);
                            }}
                            className={
                              (active
                                ? "bg-gray-100 text-gray-900"
                                : " text-gray-700",
                              "group flex items-center px-4 py-2 text-sm cursor-pointer")
                            }
                          >
                            <AtSymbolIcon
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            ></AtSymbolIcon>

                            {opt.text}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
        {role ? (
          <>
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="inline-flex items-center ml-3 px-4 py-1.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Option
            </button>
            <button
              onClick={() => {
                setOpenLabel(true);
              }}
              className="inline-flex items-center ml-3 px-4 py-1.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Label
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
