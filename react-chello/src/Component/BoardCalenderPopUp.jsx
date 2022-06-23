/* This example requires Tailwind CSS v2.0+ */
import { createRef, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import DatePicker from "react-datepicker";
import { insertCard } from "../Script/Card";
import { useParams } from "react-router-dom";
import { onSnapshot, query, where } from "firebase/firestore";
import { listCollectionRef } from "../Library/firebase.collections";
import Select from "react-select";

export default function BoardCalenderPopUp({ open, setOpen }) {
  const [date, setDate] = useState(new Date());
  const name = createRef();
  const { id } = useParams();
  const [list, setList] = useState();
  const [option, setOption] = useState();
  const selectedList = createRef();
  const [error, setError] = useState("");

  useEffect(() => {
    if (list) {
      let optionList = [];
      list.map((li) => {
        const selectedObject = {
          value: li.id,
          label: li.name,
        };
        optionList.push(selectedObject);
      });
      setOption(optionList);
    }
  }, [list]);

  useEffect(() => {
    const q = query(listCollectionRef, where("boardId", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      setList(
        snap.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }))
      );
    });

    return () => {
      unsub();
    };
  }, []);

  function handleClose() {
    setError("");
    setOpen(false);
  }

  function handleCreate() {
    const selectValue = selectedList.current.getValue();
    const nameValue = name.current.value;
    if (selectValue.length == 0) {
      setError("Please select 1 list!");
      return;
    } else if (nameValue == "" || !nameValue) {
      setError("Please select name!");
      return;
    }
    const listId = selectValue[0].value;
    insertCard(nameValue, id, listId, date);
    handleClose();
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Create Card
                  </Dialog.Title>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mt-3 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      ref={name}
                      type="text"
                      name="email"
                      id="email"
                      className="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Input your card name"
                    />
                  </div>
                </div>
              </div>
              <label className="mt-3 block text-sm font-medium text-gray-700">
                List
              </label>
              {/* List */}
              <Select
                className="basic-single"
                classNamePrefix="select"
                ref={selectedList}
                name="color"
                options={option}
              />

              <label
                htmlFor="email"
                className="mt-3 block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <DatePicker
                className="px-2 py-1"
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <p className="text-red-500 ml-2">{error}</p>
              {/* Button */}
              <div className="flex mt-5 sm:mt-6">
                <button
                  type="button"
                  className="mr-3 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
                  onClick={handleCreate}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}