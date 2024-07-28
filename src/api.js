const baseHost = "https://wedev-api.sky.pro/api/leaderboard";

// Получить список лидеров
export async function getLeaders() {
  const response = await fetch(baseHost, { method: "GET" });

  return await response.json();
}

// Добавить лидера в список
export async function addLeader({ name, time }) {
  const response = await fetch(baseHost, { method: "POST", body: JSON.stringify({ name, time }) });

  if (response.status === 400) {
    throw new Error("Введены неправильные данные");
  }

  return await response.json();
}
