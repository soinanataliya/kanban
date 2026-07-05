import { Link } from '@tanstack/react-router'

const Sidebar = () => {
  return (
    <aside className="w-60 border-r bg-white px-4 py-6">
      <div className="mb-8 text-xl font-semibold">Kanban</div>
      <nav className="space-y-1">
        <Link
          to="/"
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          activeProps={{
            className: 'bg-gray-100 text-gray-900',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/kanban"
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          activeProps={{
            className: 'bg-gray-100 text-gray-900',
          }}
        >
          Kanban
        </Link>
        <Link
          to="/settings"
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          activeProps={{
            className: 'bg-gray-100 text-gray-900',
          }}
        >
          Settings
        </Link>
      </nav>
    </aside>
  )
}
export default Sidebar
