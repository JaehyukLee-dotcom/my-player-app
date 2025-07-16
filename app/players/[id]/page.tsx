'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// 타입 정의
interface Stats {
  power: number;
  accuracy: number;
  defense: number;
  speed: number;
  fielding: number;
  throwing: number;
  plateDiscipline?: number;
  patience?: number;
}

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  cardType: string;
  grade: number;
  year: number;
  overall: number;
  training: number;
  enhancement: number;
  launchAngle: number;
  setDeckScore: number;
  hotZone: string[];
  coldZone: string[];
  stats: Stats;
  star?: number;
}

interface Comment {
  rating: number;
  comment: string;
}

const players: Player[] = [
  {
    id: "1",
    name: "박석민",
    team: "NC",
    position: "3B",
    cardType: "엘리트",
    grade: 74,
    year: 2018,
    overall: 108,
    training: 18,
    enhancement: 9,
    launchAngle: 12,
    setDeckScore: 6,
    hotZone: ["좌상", "중앙"],
    coldZone: ["우하"],
    stats: { power: 113, accuracy: 124, defense: 107, speed: 98, fielding: 96, throwing: 110 },
  },
  {
    id: "2",
    name: "이대호",
    team: "롯데",
    position: "1B",
    cardType: "레전드",
    grade: 85,
    year: 2017,
    overall: 100,
    training: 10,
    enhancement: 5,
    launchAngle: 15,
    setDeckScore: 5,
    hotZone: ["중앙"],
    coldZone: ["하단"],
    stats: { power: 90, accuracy: 85, defense: 80, speed: 60, fielding: 75, throwing: 80 },
  },
];

export default function PlayerDetail() {
  const { id } = useParams();
  const router = useRouter();

  // 선수 데이터 찾기
  const player = players.find((p) => p.id === id) || null;

  // 별점/댓글 상태
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  // 훈련/강화 상태
  const [training, setTraining] = useState<number>(player?.training || 0);
  const [enhancement, setEnhancement] = useState<number>(player?.enhancement || 0);
  const [overall, setOverall] = useState<number>(player?.overall || 0);

  // 오버롤 계산(예시: 훈련, 강화에 따라 단순 가산)
  useEffect(() => {
    if (player) {
      setOverall(player.overall + (training - player.training) + (enhancement - player.enhancement));
    }
  }, [training, enhancement, player]);

  // LocalStorage에서 불러오기
  useEffect(() => {
    if (player?.id) {
      const saved = localStorage.getItem(`comments_${player.id}`);
      if (saved) setComments(JSON.parse(saved));
    }
  }, [player?.id]);

  // LocalStorage에 저장
  useEffect(() => {
    if (player?.id) {
      localStorage.setItem(`comments_${player.id}`, JSON.stringify(comments));
    }
  }, [comments, player?.id]);

  if (!player) {
    return <div>선수 정보를 찾을 수 없습니다.</div>;
  }

  // 별점 클릭
  const handleStarClick = (star: number) => setRating(star);

  // 댓글 등록
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    setComments([...comments, { rating, comment }]);
    setComment("");
    setRating(0);
  };

  // 평균 별점 계산
  const averageRating =
    comments.length > 0
      ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(2)
      : null;

  // 훈련/강화 옵션 생성
  const trainingOptions = Array.from({ length: 19 }, (_, i) => i); // 0~18
  const enhancementOptions = Array.from({ length: 11 }, (_, i) => i); // 0~10

  // 오버롤 바 스타일
  const overallPercent = Math.min(100, Math.round((overall / 130) * 100));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f4f6fb 0%, #e9ecf3 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "48px 0"
    }}>
      <div className="player-card" style={{
        maxWidth: 540,
        width: "100%",
        margin: "0 auto",
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
        padding: 36,
        position: 'relative',
        border: '1.5px solid #e0e7ef',
        transition: 'box-shadow 0.2s',
      }}>
        {/* 즐겨찾기(하트) 버튼 */}
        <button style={{ position: "absolute", top: 28, right: 28, background: "#fff", border: "1.5px solid #e53935", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", zIndex: 10, transition: 'box-shadow 0.2s, border 0.2s' }}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(229,57,53,0.15)'; (e.currentTarget as HTMLButtonElement).style.border = '2px solid #e53935'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLButtonElement).style.border = '1.5px solid #e53935'; }}
        >
          <span style={{ color: "#e53935", fontSize: 26, fontWeight: 700, transition: 'color 0.2s' }}>♥</span>
        </button>
        {/* 상단: 이미지 | 주요 정보 | 핫/콜드존 */}
        <div style={{ display: "flex", flexDirection: 'row', gap: 28, alignItems: "stretch", marginBottom: 28, position: 'relative' }}>
          {/* 이미지 영역 */}
          <div style={{ width: 110, height: 150, background: "#f0f1f5", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#bbb", flexShrink: 0, border: '1px solid #e0e7ef' }}>
            이미지
          </div>
          {/* 주요 정보 */}
          <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 150 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10, gap: 10 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, marginRight: 8, color: '#222' }}>{player.name}</h1>
              <span style={{ background: "#222", color: "#fff", borderRadius: 8, padding: "2px 12px", fontWeight: 600, fontSize: 15 }}>{player.cardType}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>{Array.from({length: player.star || 3}).map((_,i)=>(<span key={i} style={{color:'#FFD600', fontSize:20}}>★</span>))}{Array.from({length: 5-(player.star||3)}).map((_,i)=>(<span key={i} style={{color:'#eee', fontSize:20}}>★</span>))}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 10 }}>
              <span style={{ fontWeight: 500, color: '#555' }}>포지션: <b style={{color:'#1976d2'}}>{player.position}</b></span>
              <span style={{ fontWeight: 500, color: '#555' }}>소속팀: <b style={{color:'#43a047'}}>{player.team}</b></span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#e53935", marginBottom: 10 }}>{overall}</div>
            <div style={{ display: "flex", gap: 24, alignItems:'center', marginBottom: 0, flexWrap:'wrap' }}>
              <div style={{display:'flex', alignItems:'center', gap:4}}>
                <label style={{fontWeight:500, marginRight:2}}>훈련:</label>
                <select value={training} onChange={e => setTraining(Number(e.target.value))} style={{border:'1px solid #e0e7ef', borderRadius:6, padding:'2px 8px', minWidth:48}}>
                  {trainingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:4}}>
                <label style={{fontWeight:500, marginRight:2}}>강화:</label>
                <select value={enhancement} onChange={e => setEnhancement(Number(e.target.value))} style={{border:'1px solid #e0e7ef', borderRadius:6, padding:'2px 8px', minWidth:48}}>
                  {enhancementOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:4, color:'#888', fontSize:15}}>
                <span>평균 발사각:</span>
                <b style={{color:'#1976d2'}}>{player.launchAngle}°</b>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:4, color:'#888', fontSize:15}}>
                <span>세트덱 스코어:</span>
                <b style={{color:'#e53935'}}>{player.setDeckScore}</b>
              </div>
            </div>
          </div>
          {/* 핫/콜드존 */}
          <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: 150, marginTop: 40 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color:'#222' }}>핫/콜드존</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 32px)', gridTemplateRows: 'repeat(3, 32px)', gap: 3, width: 101, height: 101 }}>
              {[0,1,2,3,4,5,6,7,8].map(idx => {
                let color = '#fff';
                if (player.hotZone && player.hotZone.includes("좌상") && idx === 0) color = '#ffb4b4';
                if (player.hotZone && player.hotZone.includes("중앙") && idx === 4) color = '#ffb4b4';
                if (player.coldZone && player.coldZone.includes("우하") && idx === 8) color = '#b4c6ff';
                return <div key={idx} style={{ width: 32, height: 32, background: color, border: '1.2px solid #bbb', borderRadius: 5 }} />;
              })}
            </div>
          </div>
        </div>
        <hr style={{ margin: "18px 0 24px 0", border:0, borderTop:'1.5px solid #e0e7ef' }} />
        {/* 주요 스탯 */}
        <div style={{ marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "파워", value: player.stats.power },
            { label: "정확", value: player.stats.accuracy },
            { label: "선구", value: player.stats.plateDiscipline || 0 },
            { label: "인내", value: player.stats.patience || 0 },
            { label: "주루", value: player.stats.speed },
            { label: "수비", value: player.stats.defense },
          ].map((stat) => {
            const blueWidth = Math.max(0, Math.min(100, stat.value));
            const redWidth = stat.value > 100 ? Math.min(100, stat.value - 100) : 0;
            const statColorSteps = [
              '#bdbdbd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#1e88e5', '#1976d2',
              '#1565c0', '#0d47a1', '#00bcd4', '#26a69a', '#43a047', '#fbc02d', '#ff9800',
              '#e53935', '#b71c1c',
            ];
            let statColor = statColorSteps[0];
            if (stat.value >= 50) {
                const index = Math.min(Math.floor((stat.value - 50) / 10), statColorSteps.length - 1);
                statColor = statColorSteps[index];
            }
            return (
              <div key={stat.label} style={{ display: "flex", flexDirection:'column', alignItems: "flex-start", gap: 6, background:'#f7f9fc', borderRadius:6, padding:'14px 14px', border:'1px solid #e0e7ef', minWidth:0 }}>
                <span style={{ fontWeight: 600, color:'#1976d2', fontSize:14, marginBottom:4, width:'100%', textAlign:'left', display:'block' }}>{stat.label}</span>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', width:'100%', gap:10 }}>
                  <span style={{ fontWeight: 700, color:statColor, fontSize:18, width:'100%', textAlign:'left', display:'block' }}>{stat.value}</span>
                  <div style={{ position: "relative", width: 100, height: 8, background: "#e3eaf6", borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
                    {blueWidth > 0 && (
                      <div style={{ width: `${blueWidth}%`, height: "100%", background: "#3496f4", borderRadius: 4, position: "absolute", left: 0, top: 0, zIndex: 1 }} />
                    )}
                    {redWidth > 0 && (
                      <div style={{ width: `${redWidth}%`, height: "100%", background: "#ff4d4f", borderRadius: 4, position: "absolute", left: 0, top: 0, zIndex: 2, mixBlendMode: 'screen' }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => router.back()} className="styled-btn" style={{ marginBottom: 24, width: "100%", background:'#1976d2', color:'#fff', fontWeight:700, fontSize:16, borderRadius:8, padding:'10px 0', border:'none', boxShadow:'0 2px 8px rgba(25,118,210,0.08)', cursor:'pointer', transition:'background 0.2s' }}>
          뒤로가기
        </button>
        <hr style={{ margin: "24px 0 28px 0", border:0, borderTop:'1.5px solid #e0e7ef' }} />
        <h2 style={{ marginBottom: 14, fontSize:20, fontWeight:700, color:'#222' }}>평가/댓글 남기기</h2>
        <form onSubmit={handleSubmit} style={{marginBottom:18}}>
          <div style={{ marginBottom: 8, display:'flex', alignItems:'center' }}>
            <span style={{fontWeight:600, marginRight:8}}>별점: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star${star <= rating ? " selected" : ""}`}
                onClick={() => handleStarClick(star)}
                style={{
                  color: star <= rating ? "#FFD600" : "#eee",
                  fontSize: 28,
                  cursor: "pointer",
                  marginRight: 2,
                  transition: "color 0.2s"
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{width:'100%'}}>
            <textarea
              rows={3}
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="styled-textarea"
              style={{ marginBottom: 8, width:'100%', border:'1px solid #e0e7ef', borderRadius:8, padding:10, fontSize:15, resize:'vertical', background:'#f7f9fc', boxSizing:'border-box' }}
            />
          </div>
          <button type="submit" className="styled-btn" style={{ width: "100%", background:'#43a047', color:'#fff', fontWeight:700, fontSize:15, borderRadius:8, padding:'12px 0', border:'none', boxShadow:'0 2px 8px rgba(67,160,71,0.08)', cursor:'pointer', transition:'background 0.2s', marginTop:4 }}>
            등록
          </button>
        </form>
        <h3 style={{ marginTop: 24, marginBottom:8, fontWeight:600, color:'#1976d2', fontSize:17 }}>댓글 목록</h3>
        {averageRating && (
          <div style={{ marginBottom: 8, fontWeight:600, color:'#FFD600' }}>
            평균 별점: {" "}
            <span style={{ color: "#FFD600", fontWeight: 700 }}>
              {"★".repeat(Math.round(Number(averageRating)))}
              {"☆".repeat(5 - Math.round(Number(averageRating)))}
            </span>{" "}
            ({averageRating})
          </div>
        )}
        <ul style={{paddingLeft:0, listStyle:'none'}}>
          {comments.length === 0 && <li style={{color:'#aaa'}}>아직 댓글이 없습니다.</li>}
          {comments.map((c, idx) => (
            <li key={idx} style={{ marginBottom: 10, background:'#f7f9fc', borderRadius:7, padding:'8px 12px', border:'1px solid #e0e7ef', color:'#333', fontSize:15 }}>
              <span style={{ color: "#FFD600" }}>
                {"★".repeat(c.rating)}
                {"☆".repeat(5 - c.rating)}
              </span>{" "}
              {c.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}