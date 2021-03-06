import { CheckIcon, PencilIcon, XIcon } from "@heroicons/react/solid";
import { onSnapshot, query, where } from "firebase/firestore";
import React, { createRef, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { userCollectionRef } from "../Library/firebase.collections";
import { getBoardById } from "../Model/Board";
import { updateCard } from "../Model/Card";
import { toastError, toastSuccess } from "../Model/Toast";

export default function RenderCardWatcherForm({ setWatcherForm, cardClicked }) {
  const selected = createRef();
  const [member, setMember] = useState([]);
  const [option, setOption] = useState([]);
  const [board, setBoard] = useState([]);

  function checkExists(userId) {
    return new Promise((resolve, reject) => {
      cardClicked.watcher.map((watcher) => {
        if (watcher == userId) {
          resolve(true);
        }
      });
      reject(false);
    });
  }

  function handleClick() {
    if (selected && board) {
      const selectedMember = selected.current.getValue();
      selectedMember.map((member) => {
        checkExists(member.value)
          .then(
            (result) => {
              toastError("User already exists!");
            },
            (error) => {
              cardClicked.watcher = [...cardClicked.watcher, member.value];
              updateCard(cardClicked)
                .then(() => {
                  toastSuccess("Succesfully insert watcher");
                })
                .catch((e) => {
                  toastError("Failed to update card!", e.message);
                });
            }
          )
          .catch((e) => {});
      });
      // if (toBePush.length > 0) {
      //   console.log("tobepush : ", toBePush);
      //   cardClicked.watcher = [...cardClicked.watcher, ...toBePush];
      //   updateCard(cardClicked)
      //     .then(() => {
      //       toastSuccess("Success add watcher!");
      //     })
      //     .catch((e) => {
      //       toastError("Error adding watcher !", e.message);
      //     });
      // }
    } else {
      toastError("Too fast darling!");
    }
  }

  useEffect(() => {
    let unsub;
    let unsub2;
    if (cardClicked) {
      getBoardById(cardClicked.boardId).then((doc) => {
        const board = { ...doc.data(), id: doc.id };
        setBoard(board);

        setMember([]);
        setOption([]);

        board.memberId.map((member) => {
          const q = query(userCollectionRef, where("userId", "==", member));
          unsub = onSnapshot(q, (doc) => {
            doc.docs.map((docs) => {
              const userDoc = { ...docs.data(), id: docs.id };
              setMember((prev) => [...prev, userDoc]);
              // Add Member

              const option = {
                value: userDoc.userId,
                label: userDoc.displayName,
              };
              setOption((prev) => [...prev, option]);
              // Add Option
            });
          });
        });
        board.adminId.map((member) => {
          const q = query(userCollectionRef, where("userId", "==", member));
          unsub2 = onSnapshot(q, (doc) => {
            doc.docs.map((docs) => {
              const userDoc = { ...docs.data(), id: docs.id };
              setMember((prev) => [...prev, userDoc]);
              // Add Member (Admin)

              const option = {
                value: userDoc.userId,
                label: userDoc.displayName,
              };
              setOption((prev) => [...prev, option]);
              // Add Option
            });
          });
        });
      });
    }

    return () => {
      setMember([]);
      if (unsub !== undefined) unsub();
      if (unsub2 !== undefined) unsub2();
    };
  }, [cardClicked]);

  return (
    <div className="absolute w-fit h-fit px-3 -mt-2 -ml-2 bg-white drop-shadow-lg rounded z-30">
      <div className="p-2 rounded-lg first-letter:flex flex-col items-center content-center gap-1">
        <hr className="w-fit" />
        <button
          onClick={() => {
            setWatcherForm();
          }}
        >
          <XIcon className="absolute scale-[.4] -top-[.7rem] left-[13rem] hover:bg-gray-200 rounded-md"></XIcon>
        </button>
        <Select
          className="basic-multi-select"
          ref={selected}
          classNamePrefix="select"
          options={option}
        />
        <button
          onClick={handleClick}
          type="button"
          className="mb-3 mt-3 inline-flex items-center px-1.5 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Watcher
        </button>
      </div>
    </div>
  );
}
