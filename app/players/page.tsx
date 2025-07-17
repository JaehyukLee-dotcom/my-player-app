'use client';

import React, { useState } from "react";
import NavBar from '../components/NavBar';

// 예시 클래스(추후 실제 데이터로 교체)
const classes: string[] = [
  "레전드", "엘리트", "KBO", "MLB", "2024", "2023", "2022"
  // ...추후 전달받은 클래스 추가
];

const positions: { [key: string]: string[] } = {
  투수: ["전체", "선발", "구원", "마무리"],
  포수: ["전체"],
  내야수: ["전체", "1루수", "2루수", "3루수", "유격수"],
  외야수: ["전체", "좌익수", "중견수", "우익수"],
};

export default function PlayerList() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [salaryMin, setSalaryMin] = useState<string>("");
  const [salaryMax, setSalaryMax] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  return (
    <>
      <NavBar />
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f6fb 0%, #e9ecf3 100%)",
        padding: "48px 24px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
          padding: "36px",
          border: "1.5px solid #e0e7ef"
        }}>
          {/* 타이틀 */}
          <div style={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            fontWeight: "800",
            fontSize: "24px",
            padding: "16px 24px",
            borderRadius: "12px",
            marginBottom: "32px",
            boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
            textAlign: "center"
          }}>
            선수 리스트
          </div>

          {/* 클래스/카드/연도 버튼 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "12px",
            marginBottom: "32px"
          }}>
            {classes.map((cls) => (
              <button
                key={cls}
                style={{
                  border: selectedClass === cls ? "2px solid #1976d2" : "1.5px solid #e0e7ef",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: "700",
                  background: selectedClass === cls ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" : "#fff",
                  color: selectedClass === cls ? "#1976d2" : "#666",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedClass === cls ? "0 4px 12px rgba(25, 118, 210, 0.15)" : "0 2px 4px rgba(0,0,0,0.05)"
                }}
                onClick={() => setSelectedClass(cls)}
                onMouseOver={(e) => {
                  if (selectedClass !== cls) {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedClass !== cls) {
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* 포지션 필터 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            {Object.entries(positions).map(([group, posArr]) => (
              <div key={group} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: "16px",
                  padding: "12px",
                  borderRadius: "12px 12px 0 0",
                  color: "#fff",
                  background: group === "투수" ? "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)" :
                             group === "포수" ? "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)" :
                             group === "내야수" ? "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)" :
                             "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
                }}>
                  {group}
                </div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  padding: "16px",
                  background: "#f7f9fc",
                  borderRadius: "0 0 12px 12px",
                  border: "1.5px solid #e0e7ef",
                  borderTop: "none",
                  width: "100%",
                  justifyContent: "center"
                }}>
                  {posArr.map((pos) => (
                    <button
                      key={pos}
                      style={{
                        border: selectedPosition === pos ? "2px solid #1976d2" : "1.5px solid #e0e7ef",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background: selectedPosition === pos ? "#1976d2" : "#fff",
                        color: selectedPosition === pos ? "#fff" : "#666",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: selectedPosition === pos ? "0 2px 8px rgba(25, 118, 210, 0.2)" : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                      onClick={() => setSelectedPosition(pos)}
                      onMouseOver={(e) => {
                        if (selectedPosition !== pos) {
                          e.currentTarget.style.background = "#f0f1f5";
                          e.currentTarget.style.borderColor = "#1976d2";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedPosition !== pos) {
                          e.currentTarget.style.background = "#fff";
                          e.currentTarget.style.borderColor = "#e0e7ef";
                        }
                      }}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 상세 검색 입력란 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "24px"
          }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "14px" }}>연봉 범위</label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  placeholder="최소값"
                  style={{
                    border: "1.5px solid #e0e7ef",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    background: "#f7f9fc",
                    flex: "1",
                    transition: "border-color 0.2s"
                  }}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
                />
                <span style={{ color: "#666", fontWeight: "600" }}>~</span>
                <input
                  type="number"
                  placeholder="최대값"
                  style={{
                    border: "1.5px solid #e0e7ef",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    background: "#f7f9fc",
                    flex: "1",
                    transition: "border-color 0.2s"
                  }}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "14px" }}>국적</label>
              <input
                type="text"
                placeholder="국적을 입력하세요"
                style={{
                  border: "1.5px solid #e0e7ef",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  background: "#f7f9fc",
                  transition: "border-color 0.2s"
                }}
                value={nation}
                onChange={(e) => setNation(e.target.value)}
                onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "14px" }}>소속팀</label>
              <input
                type="text"
                placeholder="팀명을 입력하세요"
                style={{
                  border: "1.5px solid #e0e7ef",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  background: "#f7f9fc",
                  transition: "border-color 0.2s"
                }}
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "14px" }}>연도</label>
              <input
                type="text"
                placeholder="연도를 입력하세요"
                style={{
                  border: "1.5px solid #e0e7ef",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  background: "#f7f9fc",
                  transition: "border-color 0.2s"
                }}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
              />
            </div>
          </div>

          {/* 선수 이름 검색 및 버튼 */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "14px" }}>선수 이름</label>
              <input
                type="text"
                placeholder="선수 이름을 입력하세요"
                style={{
                  border: "1.5px solid #e0e7ef",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  background: "#f7f9fc",
                  transition: "border-color 0.2s"
                }}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onFocus={(e) => e.currentTarget.style.borderColor = "#1976d2"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0e7ef"}
              />
            </div>
            
            <div style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              <button style={{
                background: "linear-gradient(135deg, #e53935 0%, #c62828 100%)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(229, 57, 53, 0.15)",
                transition: "all 0.2s ease",
                minWidth: "100px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(229, 57, 53, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(229, 57, 53, 0.15)";
              }}>
                검색
              </button>
              
              <button style={{
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
                transition: "all 0.2s ease",
                minWidth: "100px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(25, 118, 210, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(25, 118, 210, 0.15)";
              }}>
                초기화
              </button>
              
              <button style={{
                background: "linear-gradient(135deg, #43a047 0%, #388e3c 100%)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(67, 160, 71, 0.15)",
                transition: "all 0.2s ease",
                minWidth: "100px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(67, 160, 71, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(67, 160, 71, 0.15)";
              }}>
                관심선수
              </button>
              
              <button style={{
                background: "#fff",
                color: "#666",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                border: "1.5px solid #e0e7ef",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                minWidth: "120px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#f7f9fc";
                e.currentTarget.style.borderColor = "#1976d2";
                e.currentTarget.style.color = "#1976d2";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#e0e7ef";
                e.currentTarget.style.color = "#666";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                상세검색 +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}