import React from "react";

export default function Page() {
  return (
    <div id="webcrumbs">
      <div className="w-[1200px] bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Мои работники</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Добавить работника
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="material-symbols-outlined">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-gray-500">
                          john.smith@company.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Senior Developer</td>
                  <td className="px-6 py-4 text-sm">Engineering</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <details className="relative">
                      <summary className="list-none cursor-pointer">
                        <span className="material-symbols-outlined hover:bg-gray-100 p-1 rounded-full transition-colors">
                          more_vert
                        </span>
                      </summary>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            edit
                          </span>
                          Edit Profile
                        </a>
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            assessment
                          </span>
                          View Performance
                        </a>
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-500"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            delete
                          </span>
                          Remove
                        </a>
                      </div>
                    </details>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="material-symbols-outlined">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">
                          sarah.j@company.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">UX Designer</td>
                  <td className="px-6 py-4 text-sm">Design</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <details className="relative">
                      <summary className="list-none cursor-pointer">
                        <span className="material-symbols-outlined hover:bg-gray-100 p-1 rounded-full transition-colors">
                          more_vert
                        </span>
                      </summary>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            edit
                          </span>
                          Edit Profile
                        </a>
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            assessment
                          </span>
                          View Performance
                        </a>
                        <a
                          href="#"
                          className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-500"
                        >
                          <span className="material-symbols-outlined mr-2 text-sm">
                            delete
                          </span>
                          Remove
                        </a>
                      </div>
                    </details>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
