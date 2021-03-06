import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../Model/Workspace";
import DeleteWorkspace from "./DeleteWorkspace";
import InviteWorkspaceMember from "./InviteWorkspaceMember";
import LeaveWorkspace from "./LeaveWorkspace";
import UpdateWorkspaceForm from "./UpdateWorkspaceForm";

function deleteWorkspace() {}

export default function ManageWorkspaceForm(props) {
  const [tabIndex, setTabIndex] = useState(2);
  const role = props.role;
  const [ws, setWs] = useState();
  const { id } = useParams();

  useEffect(() => {
    getWorkspaceById(id).then((ws) => {
      const temp = { ...ws, id: id };
      setWs(temp);
    });
    return () => {};
  }, []);

  function handleInviteIdx() {
    setTabIndex(2);
  }
  function handleUpdateIdx() {
    setTabIndex(1);
  }
  function handleDeleteIdx() {
    setTabIndex(3);
  }
  function handleLeaveIndex() {
    setTabIndex(4);
  }

  function getClass(idx) {
    if (idx != tabIndex) {
      return "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm";
    } else {
      return "border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm";
    }
  }

  return (
    <>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="z-100 fixed overflow-y-auto overflow-x-hidden w-full md:inset-0 md:h-full bg-gray-500 bg-opacity-30 h-full flex justify-center items-center"
      >
        <div className="z-100  fixed p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="z-100 bg-white rounded-lg shadow border-2 relative">
            <button
              onClick={() => props.setTrigger(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div className="border-b border-gray-200">
              <div className="sm:flex sm:items-baseline">
                <nav className="mt-4 ml-4 -mb-px flex space-x-8">
                  {role == "Admin" ? (
                    <button onClick={handleUpdateIdx} className={getClass(1)}>
                      Update Wokspace
                    </button>
                  ) : (
                    ""
                  )}

                  <button onClick={handleInviteIdx} className={getClass(2)}>
                    Invite Member
                  </button>
                  {role == "Admin" ? (
                    <button onClick={handleDeleteIdx} className={getClass(3)}>
                      Delete Workspace
                    </button>
                  ) : (
                    ""
                  )}

                  <button onClick={handleLeaveIndex} className={getClass(4)}>
                    Leave Workspace
                  </button>
                </nav>
              </div>
            </div>

            <div className="py-6 px-6 lg:px-8">
              {tabIndex == 1 ? <UpdateWorkspaceForm></UpdateWorkspaceForm> : ""}
              {tabIndex == 2 ? (
                <InviteWorkspaceMember></InviteWorkspaceMember>
              ) : (
                ""
              )}
              {tabIndex == 3 ? (
                <DeleteWorkspace ws={ws} role={role}></DeleteWorkspace>
              ) : (
                ""
              )}
              {tabIndex == 4 ? (
                <LeaveWorkspace
                  setTabIndex={setTabIndex}
                  ws={ws}
                  role={role}
                ></LeaveWorkspace>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
