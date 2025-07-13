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
    stats: { power: 82, accuracy: 79, defense: 79, speed: 64, fielding: 70, throwing: 70 },
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

export default function PlayerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const player = players.find((p) => p.id === id);

  // 평가/댓글 상태
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // LocalStorage에서 불러오기
  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem(`comments_${id}`);
      if (saved) setComments(JSON.parse(saved));
    }
  }, [id]);

  // LocalStorage에 저장
  useEffect(() => {
    if (id) {
      localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
    }
  }, [comments, id]);

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

  // 스타일 객체
  const buttonStyle = {
    marginTop: 8,
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "8px 16px",
    cursor: "pointer",
  };
  const textareaStyle = {
    width: "100%",
    marginTop: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    padding: 8,
    fontSize: 16,
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>{player.name} 상세 정보</h1>
      <ul>
        <li>팀: {player.team}</li>
        <li>포지션: {player.position}</li>
        <li>카드 종류: {player.cardType}</li>
        <li>등급: {player.grade}</li>
        <li>연도: {player.year}</li>
        <li>파워: {player.stats.power}</li>
        <li>정확: {player.stats.accuracy}</li>
        <li>수비: {player.stats.defense}</li>
        <li>주루: {player.stats.speed}</li>
        <li>포구: {player.stats.fielding}</li>
        <li>송구: {player.stats.throwing}</li>
      </ul>
      <button onClick={() => router.back()} style={buttonStyle}>뒤로가기</button>

      <hr style={{ margin: "32px 0" }} />

      <h2>평가/댓글 남기기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <span>별점: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "#ccc",
                fontSize: 28,
                marginRight: 2,
                transition: "color 0.2s",
              }}
              onClick={() => handleStarClick(star)}
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
            style={textareaStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          등록
        </button>
      </form>

      <h3 style={{ marginTop: 32 }}>댓글 목록</h3>
      {averageRating && (
        <div style={{ marginBottom: 8 }}>
          평균 별점: <span style={{ color: "gold" }}>{"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}</span> ({averageRating})
        </div>
      )}
      <ul>
        {comments.length === 0 && <li>아직 댓글이 없습니다.</li>}
        {comments.map((c, idx) => (
          <li key={idx} style={{ marginBottom: 8 }}>
            <span style={{ color: "gold" }}>
              {"★".repeat(c.rating)}
              {"☆".repeat(5 - c.rating)}
            </span>{" "}
            {c.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}