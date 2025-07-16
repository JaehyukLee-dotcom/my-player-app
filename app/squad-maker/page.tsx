'use client';

import React, { useState, CSSProperties } from "react";

// 선수 데이터 타입 정의
interface Player {
  id: number;
  name: string;
  pos: string;
  ovr: number;
  team: string;
  cardType: string;
}

// 포지션 데이터 타입 정의
interface Position {
  key: string;
  label: string;
  style: CSSProperties;
}

// 스쿼드 데이터 타입 정의
interface Squad {
  [key: string]: Player | (Player | null)[] | null;
  BENCH: (Player | null)[];
}


// 샘플 선수 카드 데이터
const samplePlayers: Player[] = [
  { id: 1, name: "김선수", pos: "CF", ovr: 101, team: "T", cardType: "레전드" },
  { id: 2, name: "이선수", pos: "1B", ovr: 104, team: "T", cardType: "엘리트" },
  { id: 3, name: "박선수", pos: "LF", ovr: 96, team: "T", cardType: "KBO" },
  { id: 4, name: "최선수", pos: "RF", ovr: 108, team: "T", cardType: "MLB" },
  { id: 5, name: "정선수", pos: "SS", ovr: 98, team: "T", cardType: "2024" },
  { id: 6, name: "오선수", pos: "2B", ovr: 89, team: "T", cardType: "2023" },
  { id: 7, name: "유선수", pos: "3B", ovr: 102, team: "T", cardType: "2022" },
  { id: 8, name: "임선수", pos: "DH", ovr: 88, team: "T", cardType: "KBO" },
  { id: 9, name: "벤치1", pos: "BENCH", ovr: 77, team: "T", cardType: "KBO" },
  { id: 10, name: "벤치2", pos: "BENCH", ovr: 84, team: "T", cardType: "KBO" },
  { id: 11, name: "장포수", pos: "C", ovr: 93, team: "T", cardType: "KBO" }, // 포수 추가
];

const positions: Position[] = [
  { key: "LF", label: "좌익수", style: { left: '18%', top: '30%' } },
  { key: "CF", label: "중견수", style: { left: '50%', top: '13%' } },
  { key: "RF", label: "우익수", style: { left: '82%', top: '30%' } },
  { key: "3B", label: "3루수", style: { left: '28%', top: '60%' } },
  { key: "SS", label: "유격수", style: { left: '38%', top: '45%' } },
  { key: "2B", label: "2루수", style: { left: '62%', top: '45%' } },
  { key: "1B", label: "1루수", style: { left: '72%', top: '60%' } },
  { key: "C", label: "포수", style: { left: '45%', top: '88%' } },
  { key: "DH", label: "지명타자", style: { left: '65%', top: '95%' } },
];
const benchCount = 4;

export default function SquadMaker() {
  // 각 포지션별로 선수 배치 (초기값은 샘플)
  const [squad, setSquad] = useState<Squad>({
    LF: samplePlayers[2],
    CF: samplePlayers[0],
    RF: samplePlayers[3],
    "3B": samplePlayers[6],
    SS: samplePlayers[4],
    "2B": samplePlayers[5],
    "1B": samplePlayers[1],
    DH: samplePlayers[7],
    C: samplePlayers[10], // 포수 추가
    BENCH: [samplePlayers[8], samplePlayers[9], null, null],
  });

  // 평균 오버롤, 세트덱 스코어 샘플 계산
  const ovrList = positions.map(pos => (squad[pos.key] as Player)?.ovr || 0);
  const avgOvr = (ovrList.reduce((a, b) => a + b, 0) / ovrList.length).toFixed(1);
  const setDeckScore = 125; // 샘플 값

  return (
    <div style={{ minHeight: "100vh", width: '100vw', overflow: 'hidden', position: 'relative', background: '#222' }}>
      {/* 후보선수(벤치) - 야구장 바깥 왼쪽 고정 */}
      <div style={{ position: 'absolute', left: '2vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 30, maxHeight: '80%', overflowY: 'auto' }}>
        {Array.from({length: benchCount}).map((_,i) => (
          <PlayerCard key={i} player={squad.BENCH[i]} pos={'BENCH'} small />
        ))}
      </div>
      {/* 반응형 야구장+카드 영역 */}
      <div style={{
        position: 'relative',
        width: 'min(80vw, 80vh)',
        aspectRatio: '1/1',
        margin: '0 auto',
        background: 'transparent',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* 배경 이미지 */}
        <img src="/stadium-bg.png" alt="야구장" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.95 }} />
        {/* 포지션별 카드 배치 */}
        {positions.map(pos => (
          <div key={pos.key} style={{
            position: 'absolute',
            ...pos.style,
            transform: 'translate(-50%, -50%)',
            width: '7%',
            minWidth: 32,
            zIndex: pos.key === 'C' ? 2 : (pos.key === 'DH' ? 1 : 2)
          }}>
            <PlayerCard player={squad[pos.key] as Player} pos={pos.key} />
          </div>
        ))}
      </div>
      {/* 우측 상단 요약 정보 */}
      <div style={{ position: 'fixed', top: 32, right: 48, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '18px 32px', zIndex: 20, border: '1.5px solid #e0e7ef', minWidth: 220 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>팀 요약</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 16 }}>
          <span>평균 OVR: <b style={{ color: '#1976d2', fontSize: 20 }}>{avgOvr}</b></span>
          <span>세트덱: <b style={{ color: '#e53935', fontSize: 20 }}>{setDeckScore}</b></span>
        </div>
      </div>
      {/* 좌/우 후보/옵션 영역은 생략(반응형 우선) */}
    </div>
  );
}

// 선수 카드 컴포넌트 (예시 스타일 반영)
interface PlayerCardProps {
    player: Player | null;
    pos: string;
    small?: boolean;
}

function PlayerCard({ player, pos, small }: PlayerCardProps) {
  if (!player) {
    return (
      <div style={{ width: small ? 70 : 110, height: small ? 90 : 140, background: 'rgba(255,255,255,0.12)', border: '2px dashed #bbb', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontWeight: 600, fontSize: small ? 13 : 16 }}>
        + 선수 선택
      </div>
    );
  }
  return (
    <div style={{ width: small ? 70 : 110, height: small ? 90 : 140, background: 'linear-gradient(135deg,#fff 80%,#ffe082 100%)', border: '3px solid #ffe082', borderRadius: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 0 }}>
      {/* 포지션/별/오버롤 */}
      <div style={{ position: 'absolute', top: 6, left: 8, fontWeight: 700, fontSize: small ? 12 : 15, color: '#1976d2', textShadow: '0 1px 2px #fff' }}>{pos}</div>
      <div style={{ position: 'absolute', top: 6, right: 8, display: 'flex', gap: 1 }}>
        {[...Array(5)].map((_,i)=>(<span key={i} style={{ color: '#ffd600', fontSize: small ? 13 : 16, textShadow: '0 1px 2px #333' }}>★</span>))}
      </div>
      <div style={{ position: 'absolute', top: 28, left: 8, fontWeight: 900, fontSize: small ? 18 : 26, color: '#222', textShadow: '0 2px 4px #fff' }}>{player.ovr}</div>
      {/* 팀로고/강화수치(샘플) */}
      <div style={{ position: 'absolute', top: 28, right: 8, fontWeight: 900, fontSize: small ? 15 : 22, color: '#ffd600', textShadow: '0 1px 2px #333' }}>5</div>
      {/* 선수 이미지(샘플) */}
      <div style={{ width: '100%', height: small ? 38 : 60, background: '#eee', borderRadius: 8, marginTop: small ? 18 : 32, marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ color: '#bbb', fontSize: small ? 13 : 18 }}>IMG</span>
      </div>
      {/* 카드 클래스/한글포지션 */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px', marginBottom: 2 }}>
        <span style={{ background: '#d32f2f', color: '#fff', borderRadius: 6, fontSize: small ? 9 : 12, fontWeight: 700, padding: '1px 5px' }}>{player.cardType}</span>
        <span style={{ background: '#1976d2', color: '#fff', borderRadius: 6, fontSize: small ? 9 : 12, fontWeight: 700, padding: '1px 5px' }}>{getKoreanPos(pos)}</span>
      </div>
      {/* 선수이름+년도 */}
      <div style={{ width: '100%', textAlign: 'center', fontWeight: 900, fontSize: small ? 13 : 16, color: '#222', textShadow: '0 1px 2px #fff', background: 'rgba(255,255,255,0.7)', borderRadius: '0 0 12px 12px', padding: '2px 0 3px 0' }}>{player.name + "'24"}</div>
    </div>
  );
}

function getKoreanPos(pos: string): string {
  switch(pos) {
    case 'LF': return '좌익수';
    case 'CF': return '중견수';
    case 'RF': return '우익수';
    case '3B': return '3루수';
    case 'SS': return '유격수';
    case '2B': return '2루수';
    case '1B': return '1루수';
    case 'C': return '포수';
    case 'DH': return '지명타자';
    case 'BENCH': return '벤치';
    default: return pos;
  }
} 