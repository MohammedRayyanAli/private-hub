function getData() {
  return JSON.parse(localStorage.getItem('privateHubData')) || {
    topics: [
      { name: 'Quran & Islam', pages: [] },
      { name: 'Finance', pages: [] },
      { name: 'Learning', pages: [] },
      { name: 'Personal Notes', pages: [] }
    ]
  };
}

function saveData(data) {
  localStorage.setItem('privateHubData', JSON.stringify(data));
}

function loadTopics() {
  let data = getData();
  let list = document.getElementById('topicList');
  if (!list) return;
  list.innerHTML = '';
  data.topics.forEach((topic, index) => {
    let li = document.createElement('li');
    li.innerHTML = `<a href="topic.html?topic=${index}">${topic.name}</a>`;
    list.appendChild(li);
  });
}

function addTopic() {
  let name = document.getElementById('newTopic').value.trim();
  if (!name) return alert('Please enter a topic name');
  let data = getData();
  data.topics.push({ name, pages: [] });
  saveData(data);
  document.getElementById('newTopic').value = '';
  loadTopics();
}

function loadPages() {
  let params = new URLSearchParams(location.search);
  let topicIndex = params.get('topic');
  let data = getData();
  if (!topicIndex || !data.topics[topicIndex]) return alert('Invalid topic');
  document.getElementById('topicTitle').innerText = data.topics[topicIndex].name;
  let list = document.getElementById('pageList');
  if (!list) return;
  list.innerHTML = '';
  data.topics[topicIndex].pages.forEach((page, index) => {
    let li = document.createElement('li');
    li.innerHTML = `<a href="page.html?topic=${topicIndex}&page=${index}">${page.name}</a>`;
    list.appendChild(li);
  });
}

function addPage() {
  let params = new URLSearchParams(location.search);
  let topicIndex = params.get('topic');
  let name = document.getElementById('newPage').value.trim();
  if (!name) return alert('Please enter a page name');
  let data = getData();
  if (!topicIndex || !data.topics[topicIndex]) return alert('Invalid topic');
  data.topics[topicIndex].pages.push({ name, content: '' });
  saveData(data);
  document.getElementById('newPage').value = '';
  loadPages();
}

function loadPageContent() {
  let params = new URLSearchParams(location.search);
  let topicIndex = params.get('topic');
  let pageIndex = params.get('page');
  let data = getData();
  if (!topicIndex || !pageIndex || !data.topics[topicIndex] || !data.topics[topicIndex].pages[pageIndex]) return alert('Invalid page');
  document.getElementById('pageTitle').innerText = data.topics[topicIndex].pages[pageIndex].name;
  document.getElementById('backToTopic').href = `topic.html?topic=${topicIndex}`;
  document.getElementById('pageContent').value = data.topics[topicIndex].pages[pageIndex].content;
}

function savePageContent() {
  let params = new URLSearchParams(location.search);
  let topicIndex = params.get('topic');
  let pageIndex = params.get('page');
  let data = getData();
  if (!topicIndex || !pageIndex || !data.topics[topicIndex] || !data.topics[topicIndex].pages[pageIndex]) return alert('Invalid page');
  data.topics[topicIndex].pages[pageIndex].content = document.getElementById('pageContent').value;
  saveData(data);
  // Show saved alert
  let alertBox = document.getElementById('saveAlert');
  alertBox.classList.remove('hidden');
  setTimeout(() => alertBox.classList.add('hidden'), 2000);
}
