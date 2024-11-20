import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white' }}>
      <Link href="/"><a style={{ margin: '0 15px', color: 'white' }}>Home</a></Link>
      <Link href="/login"><a style={{ margin: '0 15px', color: 'white' }}>Login</a></Link>
      <Link href="/register"><a style={{ margin: '0 15px', color: 'white' }}>Register</a></Link>
      <Link href="/dashboard"><a style={{ margin: '0 15px', color: 'white' }}>Dashboard</a></Link>
    </nav>
  );
}
