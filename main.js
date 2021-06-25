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

    const adEl = document.getElementById('ad-container');
    let adDisplayContainer = new google.ima.AdDisplayContainer(adEl, video1);
    let adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpreonly&cmsid=496&vid=short_onecue&correlator=';

    adsRequest.linearAdSlotWidth = video1.clientWidth;
    adsRequest.linearAdSlotHeight = video1.clientHeight;
    adsRequest.nonLinearAdSlotWidth = video1.clientWidth;
    adsRequest.nonLinearAdSlotHeight = video1.clientHeight / 3;

    adsLoader.requestAds(adsRequest);

    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false,
    );

    function onAdsManagerLoaded(adsManagerLoadedEvent) {
        adsManager = adsManagerLoadedEvent.getAdsManager(video1);

        adsManager?.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            onContentPauseRequested,
        );
        adsManager?.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            onContentResumeRequested,
        );

        function onContentPauseRequested() {
            video1.pause();
        }
        function onContentResumeRequested() {
            video1.play();
        }
    }

    video1.addEventListener('play', ()=> {
        let frame = document.getElementsByTagName('iframe');
        const doc = frame[0].contentDocument;
        console.log(doc);

        const width = video1.clientWidth;
        const height = video1.clientHeight;
        try {
            adsManager.init(width, height, google.ima.ViewMode.NORMAL);
            adsManager.start();
        } catch (adError) {
            console.log("AdsManager could not be started");
            video1.play();
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
