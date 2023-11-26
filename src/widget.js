const returnItem = ((item) => { return `<p>${item.name}</p>` });

window.addEventListener('onWidgetLoad', function (obj) {
    const recentSubs = obj.detail.session.data["subscriber-recent"];
    const recentFollows = obj.detail.session.data["follower-recent"];

    $('.followers div').append(recentFollows.map(returnItem));
    $('.subs div').append(recentSubs.map(returnItem));
});

window.addEventListener('onEventReceived', function (obj) {
    if (typeof obj.detail.event.itemId !== "undefined") {
        obj.detail.listener = "redemption-latest"
    }
    const [listener] = obj.detail.listener.split("-");
    const event = obj.detail.event;
    event.type = listener;


    // "tip-latest"
    // "subscriber-latest"
    // "follower-latest"
    // "cheer-latest"
    // "host-latest"
    // "raid-latest"
    // "redemption-latest"

    if (event.type === 'subscriber') {
        console.log(`sub`, event)
        $('.subs div').prepend(returnItem(event));
    }

    if (event.type === 'follower') {
        console.log(`follow`, event)

        $('.followers div').prepend(returnItem(event));

    }
});