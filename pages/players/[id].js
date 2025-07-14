import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const players = [
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
    stats: { power: 90, accuracy: 85, defense: 80, speed: 60, fielding: 75, throwing: 80 },
  },
];

// getStaticPaths, getStaticProps 추가
export async function getStaticPaths() {
  // 모든 선수 id에 대해 경로 생성
  const paths = players.map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // id에 해당하는 선수 데이터 전달
  const player = players.find((p) => p.id === params.id) || null;
  return { props: { player } };
}

// 기존 컴포넌트에서 player를 props로 받도록 수정
export default function PlayerDetail({ player }) {
  const router = useRouter();
  // const { id } = router.query; // 이 부분은 이제 props로 받음
  // const player = players.find((p) => p.id === id); // 이 부분은 이제 props로 받음

  // 별점/댓글 상태
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 훈련/강화 상태
  const [training, setTraining] = useState(player?.training || 0);
  const [enhancement, setEnhancement] = useState(player?.enhancement || 0);
  const [overall, setOverall] = useState(player?.overall || 0);

  // 오버롤 계산(예시: 훈련, 강화에 따라 단순 가산)
  useEffect(() => {
    if (player) {
      setOverall(player.overall + (training - player.training) + (enhancement - player.enhancement));
    }
  }, [training, enhancement, player]);

  // LocalStorage에서 불러오기
  useEffect(() => {
    if (player?.id) { // player가 null이 아닐 때만 실행
      const saved = localStorage.getItem(`comments_${player.id}`);
      if (saved) setComments(JSON.parse(saved));
    }
  }, [player?.id]); // player.id가 변경될 때만 실행

  // LocalStorage에 저장
  useEffect(() => {
    if (player?.id) { // player가 null이 아닐 때만 실행
      localStorage.setItem(`comments_${player.id}`, JSON.stringify(comments));
    }
  }, [comments, player?.id]); // comments 또는 player.id가 변경될 때만 실행

  if (!player) {
    return <div>선수 정보를 찾을 수 없습니다.</div>;
  }

  // 별점 클릭
  const handleStarClick = (star) => setRating(star);

  // 댓글 등록
  const handleSubmit = (e) => {
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
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px 0"
    }}>
      <div className="player-card" style={{
        maxWidth: 600,
        width: "100%",
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: 32,
        position: 'relative'
      }}>
        {/* 카드 전체 우측 상단에 즐겨찾기(하트) 버튼 - 이쁘게 */}
        <button style={{ position: "absolute", top: 24, right: 24, background: "#fff", border: "1.5px solid #e53935", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", zIndex: 10, transition: 'box-shadow 0.2s, border 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(229,57,53,0.15)'; e.currentTarget.style.border = '2px solid #e53935'; }}
          onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'; e.currentTarget.style.border = '1.5px solid #e53935'; }}
        >
          <span style={{ color: "#e53935", fontSize: 26, fontWeight: 700, transition: 'color 0.2s' }}>♥</span>
        </button>
        {/* 상단 3단 레이아웃: 이미지 | 주요 정보 | 핫/콜드존 */}
        <div style={{ display: "flex", flexDirection: 'row', gap: 24, alignItems: "stretch", marginBottom: 24, position: 'relative' }}>
          {/* 이미지 영역 */}
          <div style={{ width: 120, height: 160, background: "#e0e0e0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#888", flexShrink: 0 }}>
            이미지 영역
          </div>
          {/* 주요 정보 */}
          <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 160 }}>
            {/* 이름, 카드 등급, 성(별) */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginRight: 8 }}>{player.name}</h1>
              <span style={{ background: "#222", color: "#fff", borderRadius: 8, padding: "2px 10px", fontWeight: 600, fontSize: 16 }}>{player.cardType}</span>
              {/* 성(별) */}
              <span style={{ display: 'flex', alignItems: 'center' }}>{Array.from({length: player.star || 3}).map((_,i)=>(<span key={i} style={{color:'#FFD600', fontSize:20}}>★</span>))}{Array.from({length: 5-(player.star||3)}).map((_,i)=>(<span key={i} style={{color:'#ccc', fontSize:20}}>★</span>))}</span>
            </div>
            {/* 포지션, 소속팀 */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>포지션: <b>{player.position}</b></span>
              <span style={{ fontWeight: 500 }}>소속팀: <b>{player.team}</b></span>
            </div>
            {/* 오버롤 숫자만 */}
            <div style={{ fontSize: 32, fontWeight: 800, color: "#e53935", marginBottom: 8 }}>{overall}</div>
            {/* 훈련/강화 셀렉트 */}
            <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
              <div>
                <label>훈련: </label>
                <select value={training} onChange={e => setTraining(Number(e.target.value))}>
                  {trainingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label>강화: </label>
                <select value={enhancement} onChange={e => setEnhancement(Number(e.target.value))}>
                  {enhancementOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            {/* 평균 발사각, 세트덱 스코어 */}
            <div style={{ display: "flex", gap: 32, marginBottom: 0 }}>
              <div>평균 발사각: <b>{player.launchAngle}°</b></div>
              <div>세트덱 스코어: <b>{player.setDeckScore}</b></div>
            </div>
          </div>
          {/* 핫/콜드존 시각화 - 주요 정보와 높이 맞춤, 크기 확대, 버튼과 분리 */}
          <div style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: 160, marginTop: 56 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>핫/콜드존</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 38px)', gridTemplateRows: 'repeat(3, 38px)', gap: 4, width: 122, height: 122 }}>
              {[0,1,2,3,4,5,6,7,8].map(idx => {
                let color = '#fff';
                if (player.hotZone && [0,4].includes(idx)) color = '#e53935';
                if (player.coldZone && [8].includes(idx)) color = '#1976d2';
                return <div key={idx} style={{ width: 38, height: 38, background: color, border: '1.5px solid #bbb', borderRadius: 6 }} />;
              })}
            </div>
          </div>
        </div>
        {/* 주요 스탯 (바 시각화, 요구사항 반영) */}
        <div style={{ marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
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
            return (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 36 }}>{stat.label}:</span>
                <span style={{ fontWeight: 700, width: 32, textAlign: "right" }}>{stat.value}</span>
                <div style={{ position: "relative", width: 90, height: 8, background: "#222", borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
                  {/* 파란색 바 (0~100까지) */}
                  {blueWidth > 0 && (
                    <div style={{ width: `${blueWidth}%`, height: "100%", background: "#3496f4", borderRadius: 4, position: "absolute", left: 0, top: 0, zIndex: 1 }} />
                  )}
                  {/* 빨간색 바 (100 초과분, 왼쪽부터 겹침) */}
                  {redWidth > 0 && (
                    <div style={{ width: `${redWidth}%`, height: "100%", background: "#ff4d4f", borderRadius: 4, position: "absolute", left: 0, top: 0, zIndex: 2, mixBlendMode: 'screen' }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => router.back()} className="styled-btn" style={{ marginBottom: 24, width: "100%" }}>
          뒤로가기
        </button>
        <hr style={{ margin: "32px 0" }} />
        {/* 별점/댓글 기존대로 유지 */}
        <h2 style={{ marginBottom: 12 }}>평가/댓글 남기기</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 8 }}>
            <span>별점: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star${star <= rating ? " selected" : ""}`}
                onClick={() => handleStarClick(star)}
                style={{
                  color: star <= rating ? "#FFD600" : "#ccc",
                  fontSize: 32,
                  cursor: "pointer",
                  marginRight: 2,
                  transition: "color 0.2s"
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div>
            <textarea
              rows={3}
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="styled-textarea"
              style={{ marginBottom: 8 }}
            />
          </div>
          <button type="submit" className="styled-btn" style={{ width: "100%" }}>
            등록
          </button>
        </form>
        <h3 style={{ marginTop: 32 }}>댓글 목록</h3>
        {averageRating && (
          <div style={{ marginBottom: 8 }}>
            평균 별점: {" "}
            <span style={{ color: "#FFD600", fontWeight: 700 }}>
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </span>{" "}
            ({averageRating})
          </div>
        )}
        <ul>
          {comments.length === 0 && <li>아직 댓글이 없습니다.</li>}
          {comments.map((c, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
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