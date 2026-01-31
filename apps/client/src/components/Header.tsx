import UserAvatar from "./UserAvatar";

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-end border-b bg-white px-6">
      <UserAvatar />
    </header>
  )
}
export default Header;