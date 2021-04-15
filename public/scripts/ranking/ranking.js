const prev = document.getElementById('prev_page');
const next = document.getElementById('next_page');
const page =  new URLSearchParams(location.search).get('page');
if (prev) {
    prev.onclick = () => {
        location.href = `/ranking?page=${page - 1}`;   
    };
}
if (next) {
    next.onclick = () => {
        location.href = `/ranking?page=${page - 0 + 1}`;
    };
}