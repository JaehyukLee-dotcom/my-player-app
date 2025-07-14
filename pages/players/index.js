import React, { useState } from "react";

// 예시 클래스(추후 실제 데이터로 교체)
const classes = [
  "레전드", "엘리트", "KBO", "MLB", "2024", "2023", "2022"
  // ...추후 전달받은 클래스 추가
];

const positions = {
  투수: ["전체", "선발", "구원", "마무리"],
  포수: ["전체"],
  내야수: ["전체", "1루수", "2루수", "3루수", "유격수"],
  외야수: ["전체", "좌익수", "중견수", "우익수"],
};

export default function PlayerList() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [nation, setNation] = useState("");
  const [team, setTeam] = useState("");
  const [year, setYear] = useState("");
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="bg-white border rounded-lg p-4 max-w-5xl mx-auto mt-8 shadow">
      {/* 타이틀 */}
      <div className="bg-green-900 text-white font-bold text-lg px-4 py-2 rounded mb-4">
        선수 리스트
      </div>

      {/* 클래스/카드/연도 버튼 */}
      <div className="grid grid-cols-8 gap-2 mb-4">
        {classes.map((cls) => (
          <button
            key={cls}
            className={`border rounded px-2 py-1 text-xs font-bold ${selectedClass === cls ? "bg-green-200 border-green-600" : "bg-gray-100"}`}
            onClick={() => setSelectedClass(cls)}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* 포지션 필터 */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {Object.entries(positions).map(([group, posArr]) => (
          <div key={group} className="flex flex-col items-center">
            <div
              className={`w-full text-center font-bold py-1 rounded
                ${group === "투수" ? "bg-blue-100" :
                  group === "포수" ? "bg-yellow-100" :
                  group === "내야수" ? "bg-green-100" :
                  "bg-red-100"}`}
            >
              {group}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {posArr.map((pos) => (
                <button
                  key={pos}
                  className={`border rounded px-2 py-1 text-xs ${selectedPosition === pos ? "bg-blue-300 border-blue-600" : "bg-white"}`}
                  onClick={() => setSelectedPosition(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 상세 검색 입력란 */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="col-span-1 flex items-center">
          <span className="mr-2">연봉</span>
          <input
            type="number"
            placeholder="이상"
            className="border rounded px-2 py-1 w-16"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
          />
          <span className="mx-1">~</span>
          <input
            type="number"
            placeholder="이하"
            className="border rounded px-2 py-1 w-16"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            placeholder="국적 입력"
            className="border rounded px-2 py-1 w-full"
            value={nation}
            onChange={(e) => setNation(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            placeholder="소속팀 입력"
            className="border rounded px-2 py-1 w-full"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            placeholder="연도 입력"
            className="border rounded px-2 py-1 w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>

      {/* 선수 이름 검색 및 버튼 */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          placeholder="선수 이름"
          className="border rounded px-2 py-1 flex-1"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button className="bg-red-700 text-white px-4 py-1 rounded font-bold">검색</button>
        <button className="bg-blue-700 text-white px-4 py-1 rounded font-bold">초기화</button>
        <button className="bg-green-700 text-white px-4 py-1 rounded font-bold">관심선수</button>
        <button className="bg-gray-300 text-black px-4 py-1 rounded font-bold">상세검색 +</button>
      </div>
    </div>
  );
}