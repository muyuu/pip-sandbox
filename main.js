(() => {
    const [, video1] = createVideo({
        wrapperId: 'videoWrapper1',
        id: 'video1',
        src: './assets/progressiveMP4sample01.mp4',
    });

    const [, video2] = createVideo({
        wrapperId: 'videoWrapper2',
        id: 'video2',
        src: './assets/sample-video-for-testing.mp4',
    });

    const b1 = document.getElementById('btn1');
    const b2 = document.getElementById('btn2');
    const btnToExitPIP = document.getElementById('btnToExitPIP');

    [{v: video1, b: b1}, {v: video2, b: b2}].forEach(({ v, b}) => {
        b.addEventListener("click", async () => {
            try {
                await v.requestPictureInPicture();
            } catch (err) {
                throw new Error(err);
            }
        });
    });

    btnToExitPIP.addEventListener('click', async () => {
        console.log(document.pictureInPictureElement.volume);
        if (document.pictureInPictureElement) {
            try {
                await document.exitPictureInPicture();
            } catch (err) {
                throw new Error(err);
            }
        }
    });
})();

function createVideo({ wrapperId, id, src}) {
    const div = document.getElementById(wrapperId);
    const v = document.createElement('video');
    v.id = id;
    v.className = `video ${id}`;
    v.src = src;
    v.controls = true;
    div.prepend(v);
    return [div, v];
}