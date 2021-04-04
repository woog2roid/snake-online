 window.onload = () => {
    if (new URL(location.href).searchParams.get('error')) {
        alert('이미 존재하는 ID입니다.');
    }
}