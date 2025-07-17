import Link from 'next/link';
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav style={{ width: '100%', background: '#8f5cff', display: 'flex', alignItems: 'center', height: 56, position: 'relative' }}>
      <div className="nav-inner" style={{ display: 'flex', gap: 32, height: '100%', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <MenuItem label="홈" href="/" />
        <MenuItem label="팀 메이커" href="/team-maker" />
        <MenuItem label="팀 평가" href="/team-rating" />
        <MenuItem label="선수 DB" href="/players" />
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, paddingRight: 32 }}>
        <Link href="/mypage" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <FaUser color="#fff" size={22} style={{ marginRight: 6 }} />
          <span className="mypage-label" style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>My Page</span>
        </Link>
      </div>
      <style>{`
        .menu-item { text-decoration: none !important; }
        .nav-inner a { text-decoration: none !important; }
        @media (max-width: 600px) {
          .nav-inner { gap: 12px !important; }
          .menu-item { font-size: 15px !important; padding: 0 10px !important; }
          .mypage-label { font-size: 13px !important; }
        }
      `}</style>
    </nav>
  );
}

interface MenuItemProps {
  label: string;
  href?: string;
}

function MenuItem({ label, href }: MenuItemProps) {
  const content = (
    <div className="menu-item" style={{
      color: '#fff',
      fontWeight: 700,
      fontSize: 18,
      padding: '0 24px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '4px solid transparent',
      background: 'none',
      cursor: href ? 'pointer' : 'default',
      letterSpacing: -0.5
    }}>
      {label}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
} 