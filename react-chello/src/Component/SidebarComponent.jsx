

function SidebarComponent(props)   {

  

    return (
         <li>
          <a href={props.link} className="flex items-center p-2 text-base font-normal text-grey-500 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200">
               <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">{props.text}</span>
            </a>
         </li>
    )
}

export default SidebarComponent