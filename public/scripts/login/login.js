 window.onload = () => {
    if (new URL(location.href).searchParams.get('error')) {
        alert('로그인에 실패하였습니다.');
    }
}