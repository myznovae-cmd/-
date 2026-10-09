const campaigns = [
  {
    name: "Летняя распродажа",
    channel: "Социальные сети",
    budget: 85000,
    conversions: 1240,
    status: "Активна"
  },
  {
    name: "Поисковая реклама",
    channel: "Поиск",
    budget: 62000,
    conversions: 986,
    status: "Активна"
  },
  {
    name: "Email-рассылка",
    channel: "Email",
    budget: 24000,
    conversions: 654,
    status: "Активна"
  },
  {
    name: "Осенняя кампания",
    channel: "Социальные сети",
    budget: 48000,
    conversions: 762,
    status: "Пауза"
  }
];

const campaignTable = document.getElementById("campaignTable");
const searchInput = document.getElementById("searchInput");
const campaignCount = document.getElementById("campaignCount");
const addCampaignButton = document.getElementById("addCampaign");
const chart = document.getElementById("chart");
const chartType = document.getElementById("chartType");

const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0
});

function renderCampaigns(filter = "") {
  const query = filter.trim().toLowerCase();

  const filtered = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(query) ||
    campaign.channel.toLowerCase().includes(query) ||
    campaign.status.toLowerCase().includes(query)
  );

  campaignTable.innerHTML = "";

  if (filtered.length === 0) {
    campaignTable.innerHTML = `
      <tr>
        <td colspan="5">Кампании не найдены.</td>
      </tr>
    `;
  } else {
    filtered.forEach(campaign => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.className = "campaign-name";
      nameCell.textContent = campaign.name;

      const channelCell = document.createElement("td");
      channelCell.textContent = campaign.channel;

      const budgetCell = document.createElement("td");
      budgetCell.textContent = money.format(campaign.budget);

      const conversionsCell = document.createElement("td");
      conversionsCell.textContent =
        campaign.conversions.toLocaleString("ru-RU");

      const statusCell = document.createElement("td");
      const statusBadge = document.createElement("span");
      statusBadge.className =
        "badge " + (campaign.status === "Активна" ? "active" : "paused");
      statusBadge.textContent = campaign.status;
      statusCell.appendChild(statusBadge);

      row.append(
        nameCell,
        channelCell,
        budgetCell,
        conversionsCell,
        statusCell
      );

      campaignTable.appendChild(row);
    });
  }

  campaignCount.textContent =
    `Показано кампаний: ${filtered.length} из ${campaigns.length}`;
}

function renderChart(type = "month") {
  const monthData = [
    { label: "1 нед.", value: 38 },
    { label: "2 нед.", value: 56 },
    { label: "3 нед.", value: 47 },
    { label: "4 нед.", value: 73 },
    { label: "5 нед.", value: 65 },
    { label: "6 нед.", value: 88 },
    { label: "7 нед.", value: 76 }
  ];

  const weekData = [
    { label: "Пн", value: 42 },
    { label: "Вт", value: 58 },
    { label: "Ср", value: 49 },
    { label: "Чт", value: 78 },
    { label: "Пт", value: 68 },
    { label: "Сб", value: 92 },
    { label: "Вс", value: 74 }
  ];

  const data = type === "week" ? weekData : monthData;

  chart.innerHTML = "";

  data.forEach(item => {
    const column = document.createElement("div");
    column.className = "bar-column";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${item.value}%`;
    bar.title = `${item.label}: условный показатель ${item.value}`;

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = item.label;

    column.append(bar, label);
    chart.appendChild(column);
  });
}

searchInput.addEventListener("input", event => {
  renderCampaigns(event.target.value);
});

addCampaignButton.addEventListener("click", () => {
  const name = prompt("Введите название новой кампании:");

  if (!name || !name.trim()) {
    return;
  }


campaigns.unshift({
    name: name.trim(),
    channel: "Новый канал",
    budget: 0,
    conversions: 0,
    status: "Активна"
  });

  renderCampaigns(searchInput.value);

  alert(`Кампания «${name.trim()}» добавлена.`);
});

chartType.addEventListener("change", event => {
  renderChart(event.target.value);
});

document.getElementById("dateButton").addEventListener("click", () => {
  const button = document.getElementById("dateButton");

  button.textContent =
    button.textContent.includes("30 дней")
      ? "Последние 7 дней ▾"
      : "Последние 30 дней ▾";

  renderChart(
    button.textContent.includes("7 дней") ? "week" : "month"
  );
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// Первоначальная загрузка
renderCampaigns();
renderChart();





