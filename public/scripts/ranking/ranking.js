const URLSearch = new URLSearchParams(location.search);
const prev = document.getElementById('prev_page');
const next = document.getElementById('next_page');
const page =  new URLSearchParams(location.search).get('page');

prev.onclick = () => {
    if (page != 1)  location.href = `/ranking?page=${page - 1}`;   
};
next.onclick = () => {
    location.href = `/ranking?page=${page - 0 + 1}`;
};