"use client";

type Data = {
  id: number,
  name: string,
  full_name: string,
  clone_url: string,
  default_branch: string,
  owner: {
    avatar_url: string
    username: string
  }
}

export default function ListProjects({ data }: { data: [Data] }) {
  return (
    <div className={`flex-2 relative col-span-1 h-96 rounded-xl border border-gray-200 bg-white shadow-md overflow-auto `}>
      <ul role="list" className="divide-y divide-gray-100 p-4">
        {data.map((value: Data) => (
          <li key={value.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={value["owner"].avatar_url} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{value.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{value.clone_url}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end ">
              <button className="duration-300 bg-slate-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                Open
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}