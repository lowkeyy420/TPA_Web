import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-top">
        <Link href="/login">LOGIN</Link>
      </div>
      <div className="nav-bottom">
        <Link href="/register">REGISTER</Link>
      </div>
    </nav>
  );
}
