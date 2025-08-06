import Link from 'next/link';
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

interface MenuItemProps {
  label: string;
  active?: boolean;
  href?: string;
}

export default function Home() {
  return (
    <>
      <style>{`
        .menu-item {
          text-decoration: none !important;
        }
        .nav-inner a {
          text-decoration: none !important;
        }
        @media (max-width: 600px) {
          .main-logo {
            width: 70vw !important;
            margin-bottom: 24px !important;
          }
          .login-buttons {
            gap: 16px !important;
          }
          .login-btn {
            width: 40px !important;
            height: 40px !important;
            font-size: 22px !important;
          }
          .footer-inner {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: flex-start !important;
          }
          .footer-logo {
            width: 28px !important;
            height: 28px !important;
            margin-right: -4px !important;
          }
          .footer-divider {
            display: none !important;
          }
          .footer-text {
            font-size: 11px !important;
            text-align: left !important;
          }
          .nav-inner {
            gap: 12px !important;
          }
          .menu-item {
            font-size: 15px !important;
            padding: 0 10px !important;
          }
          .mypage-label {
            font-size: 13px !important;
          }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
        {/* 상단 메뉴바 */}
        <nav style={{ width: '100%', background: '#8f5cff', display: 'flex', alignItems: 'center', height: 56, position: 'relative' }}>
          <div className="nav-inner" style={{ display: 'flex', gap: 32, height: '100%', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
            <MenuItem label="홈" active={true} />
            <MenuItem label="팀 메이커" href="/team-maker" />
            <MenuItem label="팀 평가" />
            <MenuItem label="선수 DB" href="/players" />
          </div>
          <Link href="/mypage" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, paddingRight: 32, textDecoration: 'none' }}>
            <FaUser color="#fff" size={22} style={{ marginRight: 6 }} />
            <span className="mypage-label" style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>My Page</span>
          </Link>
        </nav>

        {/* 메인 컨텐츠 */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {/* 메인 로고 이미지 */}
          <img src="/Logo_COMPGG.png" alt="COMP.GG 메인 로고" className="main-logo" style={{ width: 'min(320px, 60vw)', maxWidth: '90vw', height: 'auto', marginBottom: 32 }} />
          {/* 간편 로그인 */}
          <div style={{ color: '#fff', fontWeight: 500, fontSize: 'min(22px, 5vw)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 18, width: '100%', maxWidth: 400, justifyContent: 'center' }}>
            <span style={{ flex: 1, height: 1, background: '#fff2', minWidth: 30, marginRight: 12 }} />
            간편 로그인
            <span style={{ flex: 1, height: 1, background: '#fff2', minWidth: 30, marginLeft: 12 }} />
          </div>
          {/* 로그인 버튼 */}
          <div className="login-buttons" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 0 }}>
            {/* 구글 */}
            <button className="login-btn" style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#fff', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30
            }} aria-label="구글 로그인">
              <FcGoogle />
            </button>
            {/* 카카오 */}
            <button className="login-btn" style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#fee500', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30
            }} aria-label="카카오 로그인">
              <SiKakaotalk color="#3c1e1e" />
            </button>
            {/* 네이버 */}
            <button className="login-btn" style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#03c75a', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30
            }} aria-label="네이버 로그인">
              <SiNaver color="#fff" />
            </button>
          </div>
        </main>

        {/* 푸터 */}
        <footer style={{ width: '100%', background: '#222', color: '#ccc', fontSize: 13, padding: '16px 0 12px 0', textAlign: 'center', letterSpacing: 0.1 }}>
          <div className="footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 900, margin: '0 auto' }}>
            {/* 푸터 로고 */}
            <img src="/Logo_CPGG.png" alt="CPGG 푸터 로고" className="footer-logo" style={{ width: 36, height: 36, objectFit: 'contain', marginRight: -6, display: 'block' }} />
            {/* 구분선 */}
            <div className="footer-divider" style={{ width: 1, height: 28, background: '#a259ff', opacity: 0.7, margin: '0 12px' }} />
            {/* 푸터 텍스트 */}
            <span className="footer-text" style={{ color: '#ccc', fontSize: 13, textAlign: 'left', lineHeight: 1.6 }}>
              © 2025 COMP.GG. COMP.GG is not endorsed by or affiliated with Com2uS, and does not represent the views of Com2uS or anyone involved in producing or managing 컴투스프로야구v25. All trademarks and copyrights belong to Com2uS Corp.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

function MenuItem({ label, active, href }: MenuItemProps) {
  const content = (
    <div className="menu-item" style={{
      color: '#fff',
      fontWeight: 700,
      fontSize: 18,
      padding: '0 24px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      borderBottom: active ? '4px solid #fff' : '4px solid transparent',
      background: 'none',
      cursor: href ? 'pointer' : 'default',
      letterSpacing: -0.5
    }}>
      {label}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
