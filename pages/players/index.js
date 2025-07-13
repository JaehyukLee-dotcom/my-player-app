import Link from "next/link";
import { useState } from "react";

const players = [
  {
    id: "1",
    name: "박석민",
    team: "NC",
    position: "3B",
    cardType: "엘리트",
    grade: 74,
    year: 2018,
  },
  {
    id: "2",
    name: "이대호",
    team: "롯데",
    position: "1B",
    cardType: "레전드",
    grade: 85,
    year: 2017,
  },
  // ...더미 데이터 추가 가능
];

export default function PlayerList() {
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [sort, setSort] = useState("name");

  // 필터링
  const filtered = players
    .filter((p) => (team ? p.team === team : true))
    .filter((p) => (position ? p.position === position : true))
    .sort((a, b) => {
      if (sort === "grade") return b.grade - a.grade;
      if (sort === "year") return b.year - a.year;
      return a.name.localeCompare(b.name);
    });

  return (
    <div style={{ padding: 24 }}>
      <h1>선수 리스트</h1>
      <div style={{ marginBottom: 16 }}>
        <select value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="">팀 전체</option>
          <option value="NC">NC</option>
          <option value="롯데">롯데</option>
          {/* 팀 추가 */}
        </select>
        <select value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="">포지션 전체</option>
          <option value="3B">3B</option>
          <option value="1B">1B</option>
          {/* 포지션 추가 */}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="name">이름순</option>
          <option value="grade">등급순</option>
          <option value="year">연도순</option>
        </select>
      </div>
      <ul>
        {filtered.map((player) => (
          <li key={player.id} style={{ marginBottom: 12 }}>
            <Link href={`/players/${player.id}`}>
              <strong>{player.name}</strong> ({player.team}, {player.position}, {player.cardType}, {player.grade}점, {player.year}년)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}