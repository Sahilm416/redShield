import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full h-[60px] m-0 p-2 bg-black fixed top-0 right-0">
        <nav className="flex justify-between items-center">
            <p className="text-xl text-white font-sans font-semibold ml-5 p-1"><span className="text-red-500">Red</span>Shield</p>
            <ul className="text-slate-300 flex gap-4 mr-6 justify-center items-center">
                <li>
                    <Link href={'/'}>About</Link>
                </li>
                <li>
                    <Link href={'/'}>Docs</Link>
                </li>
                <li>
                    <Link href={'/'}>Contact</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar