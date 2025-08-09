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
  let
