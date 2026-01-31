const Sidebar = () => {
  return (
    <aside className="w-60 border-r bg-white px-4 py-6">
      <div className="mb-8 text-xl font-semibold">Kanban</div>
      <nav className="space-y-1">
        <button className="flex w-full items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium">
          Kanban
        </button>
          <button className="flex w-full items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium">
          Settings
        </button>
      </nav>
    </aside>
  )
}
export default Sidebar
